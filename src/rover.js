export const parsePosition = (position) => {
  const pos = position.split(" ");
  const row = parseInt(pos[0]);
  const col = parseInt(pos[1]);
  const dir = pos[2];
  return { row, col, dir };
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

const instructionList = {
  M: moveRover,
  L: turnL,
  R: turnR,
};

const parseFinalPosition = (pos) => {
  return `${pos.row} ${pos.col} ${pos.dir}`;
};

export const executeInstructions = (position, instructions) => {
  let pos = parsePosition(position);

  [...instructions].forEach((command) => 
    (pos = instructionList[command](pos))
  );

  return parseFinalPosition(pos);
};

console.log(executeInstructions("0 0 E", "M"));
