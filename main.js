import {executeInstructions} from "./src/rover.js"

const main = () => {
  const position = Deno.readTextFileSync('./roverPosition.txt')
  // console.log("Results ------")
  Deno.writeTextFileSync('./output.txt', (executeInstructions(position)))
}

main();