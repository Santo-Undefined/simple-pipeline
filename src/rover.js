export const executeInstructions = (position, instructions) => {
  if (instructions === "M") {

  }
};

export const parsePosition = (position) => {
  const row = parseInt(position.slice(0,position.indexOf(" ")))
  const col = parseInt(position.slice(position.indexOf(" ") + 1, position.lastIndexOf(" ")));
  const dir = position.slice(position.lastIndexOf(" ") + 1);
  return {row, col, dir}
}