export const parsePosition = (initalPosition) => {
  const position = initalPosition.split(" ");
  const x = parseInt(position[0]);
  const y = parseInt(position[1]);
  const dir = position[2];
  return { x, y, dir };
};

export const parsePlateauPosition = (position = "") => {
  if (position.length === 0) {
    return { maxX: Infinity, maxY: Infinity };
  }
  const pos = position.split(" ");
  const maxX = parseInt(pos[0]);
  const maxY = parseInt(pos[1]);
  return { maxX, maxY };
};

const turn = function (offset, position) {
  const directions = ["N", "E", "S", "W", "N"];
  const index = (directions.indexOf(position.dir) + offset) % directions.length;
  position.dir = directions[index];
  return position;
};

const move = {
  N: (x, y) => ({ x, y: y + 1 }),
  S: (x, y) => ({ x, y: y - 1 }),
  E: (x, y) => ({ x: x + 1, y }),
  W: (x, y) => ({ x: x - 1, y }),
};

const moveRover = function ({ x, y, dir }) {
  const nextPosition = move[dir](x, y);

  return { ...nextPosition, dir };
};

const executeInstruction = {
  M: moveRover,
  L: turn.bind(null, 3),
  R: turn.bind(null, 1),
};

const parseFinalPosition = (position, status = false) => {
  const roverCondition = status ? " RIP" : "";
  return `${position.x} ${position.y} ${position.dir}${roverCondition}`;
};

const isWithInBounds = (minVal, maxVal, val) => val <= maxVal && val >= minVal;

const isLessThanInfinity = (plateau) =>
  plateau.maxX < Infinity && plateau.maxY < Infinity;

export const isSafe = (plateau, presentPosition) => {
  const startVal = isLessThanInfinity(plateau) ? 0 : -Infinity;
  const xAxis = isWithInBounds(startVal, plateau.maxX, presentPosition.x);
  const yAxis = isWithInBounds(startVal, plateau.maxY, presentPosition.y);
  return xAxis && yAxis;
};

export const executeInstructions = (position, instructions, plateau) => {
  const plateauBounds = parsePlateauPosition(plateau);
  let roverPosition = parsePosition(position);

  for (const instruction of [...instructions]) {
    const lastRoverPosition = roverPosition;
    roverPosition = executeInstruction[instruction](roverPosition);

    if (!isSafe(plateauBounds, roverPosition)) {
      return parseFinalPosition(lastRoverPosition, true);
    }
  }

  return parseFinalPosition(roverPosition);
};
