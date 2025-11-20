export const parsePosition = (position) => {
  const pos = position.split(" ");
  const row = parseInt(pos[0]);
  const col = parseInt(pos[1]);
  const dir = pos[2];
  return { row, col, dir };
};

export const parsePlateauPosition = (position = "") => {
  if (position.length === 0) {
    return {maxX: Infinity , maxY: Infinity};
  }
  const pos = position.split(" ");
  const maxX = parseInt(pos[0]);
  const maxY = parseInt(pos[1]);
  return { maxX, maxY };
};

const turnR = function (pos) {
  const directions = ["N", "E", "S", "W", "N"];
  pos.dir = directions[directions.indexOf(pos.dir) + 1];
  return pos;
};

const turnL = function (pos) {
  const directions = ["N", "W", "S", "E", "N"];
  pos.dir = directions[directions.indexOf(pos.dir) + 1];
  return pos;
};

const move = {
  N: (row, col) => ({ row, col: col + 1 }),
  S: (row, col) => ({ row, col: col - 1 }),
  E: (row, col) => ({ row: row + 1, col }),
  W: (row, col) => ({ row: row - 1, col }),
};

const moveRover = function ({ row, col, dir }) {
  const nextPosition = move[dir](row, col);

  return { ...nextPosition, dir };
};

const executeInstruction = {
  M: moveRover,
  L: turnL,
  R: turnR,
};

const parseFinalPosition = (pos, status = "") => {
  return `${pos.row} ${pos.col} ${pos.dir}${status}`;
};

const isWithInBounds = (minVal, maxVal, val) => val <= maxVal && val >= minVal;

export const isSafe = (plateau, presentPosition) => {
  const xAxis = isWithInBounds(0, plateau.maxX, presentPosition.row);
  const yAxis = isWithInBounds(0, plateau.maxY, presentPosition.col);
  return xAxis && yAxis;
};

export const executeInstructions = (position, instructions, plateau) => {
  const plateauBounds = parsePlateauPosition(plateau);
  let roverPosition = parsePosition(position);

  for (const instruction of [...instructions]) {
    const lastPosition = roverPosition;
    roverPosition = executeInstruction[instruction](roverPosition);
    
    if (!isSafe(plateauBounds, roverPosition)) {
      return parseFinalPosition(lastPosition, " RIP");
    }
  }

  return parseFinalPosition(roverPosition);
};