export const executeInstructions = (position, instructions) => {
  const pos = parsePosition(position);
  for(const char of instructions) {
    pos.dir = findRelavtiveDirectionsToMove(pos, char)
  }
  return `${pos.row} ${pos.col} ${pos.dir}`
};

export const parsePosition = (position) => {
  const pos = position;
  const row = parseInt(pos.slice(0, pos.indexOf(" ")));
  const col = parseInt(
    pos.slice(pos.indexOf(" ") + 1, pos.lastIndexOf(" ")),
  );
  const dir = pos.slice(pos.lastIndexOf(" ") + 1);
  return { row, col, dir };
};

export const findRelavtiveDirectionsToMove = (pos, instruction) => {
  if (!"LR".includes(instruction)){
    return pos
  }

  switch (pos.dir) {
    case "N": pos.dir = instruction === "R" ? "E" : "W"; break;
    case "S": pos.dir = instruction === "R" ? "W" : "E"; break;
    case "E": pos.dir = instruction === "R" ? "S" : "N"; break;
    case "W": pos.dir = instruction === "R" ? "N" : "S"; break;
  }
  return pos
}