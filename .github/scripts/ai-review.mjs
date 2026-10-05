import fs from "node:fs";
import { OpenRouter } from "@openrouter/sdk";

const diff = fs.readFileSync("pr_diff.txt", "utf-8");

// Truncate diff if it exceeds prompt context thresholds
const maxChars = 20000;
const truncatedDiff = diff.length > maxChars
  ? diff.substring(0, maxChars) + "\n\n...[Diff truncated due to size]..."
  : diff;

const systemPrompt =
  `You are a senior code reviewer. Analyze the provided Git diff for this pull request.
Focus on:
1. Logical errors, edge cases, and potential bugs
2. Best practices, code readability, and design patterns
3. Meaningful naming conventions
4. Performance optimizations and clean alternatives

Format your response strictly using clean GitHub-flavored Markdown. Group comments logically by file, and provide code blocks with language annotations. Keep feedback concise, actionable, and constructive.`;

const openRouterApiKey = process.env.OPENAI_API_KEY;
if (!openRouterApiKey) {
  throw new Error(
    "GITHUB token missing is missing. Configure it as a GitHub Actions secret.",
  );
}

const openrouter = new OpenRouter({
  apiKey: openRouterApiKey,
});

async function getReview() {
  const stream = await openrouter.chat.send({
    chatRequest: {
      model: process.env.OPENROUTER_MODEL ||
        "nvidia/nemotron-3-ultra-550b-a55b:free",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content:
            `Here is the pull request diff:\n\`\`\`diff\n${truncatedDiff}\n\`\`\``,
        },
      ],
      stream: true,
    },
  });

  let reviewContent = "";
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      reviewContent += content;
      process.stdout.write(content);
    }

    if (chunk.usage?.completionTokensDetails?.reasoningTokens) {
      console.log(
        "\nReasoning tokens:",
        chunk.usage.completionTokensDetails.reasoningTokens,
      );
    }
  }

  return reviewContent;
}

async function postComment(reviewBody) {
  const { PR_COMMENT_TOKEN, REPO_NAME, PR_NUMBER } = process.env;
  console.log({ REPO_NAME, PR_NUMBER });
  const url =
    `https://api.github.com/repos/${REPO_NAME}/issues/${PR_NUMBER}/comments`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PR_COMMENT_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      body: `## 🤖 AI Code Review (via OpenRouter)\n\n${reviewBody}`,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to post comment to GitHub: ${err}`);
  }
}

async function main() {
  try {
    console.log("Analyzing PR diff with OpenRouter...");
    const review = await getReview();

    if (!review.trim()) {
      console.log("Empty review generated; skipping comment.");
      return;
    }

    console.log("\nPosting review comment to PR...");
    await postComment(review);
    console.log("Comment successfully posted!");
  } catch (err) {
    console.error("Error during AI review:", err);
    process.exit(1);
  }
}

main();
