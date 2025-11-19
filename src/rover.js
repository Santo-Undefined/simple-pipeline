export const executeInstructions = (position, instructions) => {
  let { row, col, dir } = parsePositionToObject(position);

  instructions.split("").forEach((command) => {
    ({ row, col, dir } = instructionSheet[command][dir]({ row, col, dir }));
  });
  return `${row} ${col} ${dir}`;
};

const turnRight = {
  N: ({ row, col }) => ({ row, col, dir: "E" }),
  S: ({ row, col }) => ({ row, col, dir: "W" }),
  E: ({ row, col }) => ({ row, col, dir: "S" }),
  W: ({ row, col }) => ({ row, col, dir: "N" }),
};

const turnLeft = {
  N: ({ row, col }) => ({ row, col, dir: "W" }),
  S: ({ row, col }) => ({ row, col, dir: "E" }),
  E: ({ row, col }) => ({ row, col, dir: "N" }),
  W: ({ row, col }) => ({ row, col, dir: "S" }),
};

const moveRover2 = {
  N: ({ row, col, dir }) => ({ row, col: col + 1, dir }),
  S: ({ row, col, dir }) => ({ row, col: col - 1, dir }),
  E: ({ row, col, dir }) => ({ row: row + 1, col, dir }),
  W: ({ row, col, dir }) => ({ row: row - 1, col, dir }),
};

const instructionSheet = {
  M: moveRover2,
  L: turnLeft,
  R: turnRight,
};

export const parsePositionToObject = (position) => {
  const pos = position.split(" ");
  const row = parseInt(pos[0]);
  const col = parseInt(pos[1]);
  const dir = pos[2];
  return { row, col, dir };
};