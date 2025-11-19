export const executeInstructions = (position, instructions) => {
  const pos = parsePosition(position);
  for(const char of instructions) {
    pos.dir = findRelavtiveDirectionsToMove(pos.dir, char)
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

export const findRelavtiveDirectionsToMove = (dir, instruction) => {
  if (!"LR".includes(instruction)){
    return dir
  }
  let nextDirection = ""
  switch (dir) {
    case "N": nextDirection = instruction === "R" ? "E" : "W"; break;
    case "S": nextDirection = instruction === "R" ? "W" : "E"; break;
    case "E": nextDirection = instruction === "R" ? "S" : "N"; break;
    case "W": nextDirection = instruction === "R" ? "N" : "S"; break;
  }
  return nextDirection
}

export const moveRover = (pos) => {
  switch (pos.dir) {
    case "N": pos.col += 1; break;
    case "S": pos.col -= 1; break;
    case "E": pos.row += 1; break;
    case "W": pos.row -=  1; break;
  }
  return pos;
}