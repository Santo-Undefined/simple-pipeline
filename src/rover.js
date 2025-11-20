const dgb = (x) => {
  console.log("Debug prob", x)
  return x
};

const turn = function (direction, { row, col, dir }) {
  const directions = ["N", "E", "S", "W", "N"];

  return direction === "R" ?
    { row, col, dir: directions[directions.indexOf(dir) + 1]} :
    { row, col, dir: directions[directions.lastIndexOf(dir) - 1]};
};

const moveRover2 = function ({ row, col, dir }) {
  const newPos = move[dir]({row, col});
  return { row: newPos.row, col: newPos.col, dir};
};

const move = {
  N: ({ row, col }) => ({ row, col: col + 1 }),
  S: ({ row, col }) => ({ row, col: col - 1 }),
  E: ({ row, col }) => ({ row: row + 1, col }),
  W: ({ row, col }) => ({ row: row - 1, col }),
};

const instructionSheet = {
  M: moveRover2,
  L: turn.bind(null, "L"),
  R: turn.bind(null, "R"),
};

export const parsePositionToObject = (position) => {
  const pos = position.split(" ");
  const row = parseInt(pos[0]);
  const col = parseInt(pos[1]);
  const dir = pos[2];
  return { row, col, dir };
};

export const executeInstructions = (position, instructions) => {
  let { row, col, dir } = parsePositionToObject(position);

  instructions.split("").forEach((command) => {
    ({ row, col, dir } = instructionSheet[command]({ row, col, dir }));
  });
  return `${row} ${col} ${dir}`;
};

console.log(executeInstructions('0 0 E', 'M'));