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

const turn = function (position, offset) {
  const directions = ["N", "E", "S", "W", "N"];
  const index = (directions.indexOf(position.dir) + offset) % directions.length;
  const dir = directions[index];
  return { x: position.x, y: position.y, dir: dir };
};

const move = {
  N: (x, y) => ({ x, y: y + 1 }),
  S: (x, y) => ({ x, y: y - 1 }),
  E: (x, y) => ({ x: x + 1, y }),
  W: (x, y) => ({ x: x - 1, y }),
};

const moveRover = ({ x, y, dir }) => {
  const nextPosition = move[dir](x, y);
  return { ...nextPosition, dir };
};

const performInstruction = {
  M: (position) => moveRover(position),
  L: (position) => turn(position, 3),
  R: (position) => turn(position, 1),
};

const parseFinalPosition = (position, isOffBounds) => {
  const roverCondition = isOffBounds ? " RIP" : "";
  return `${position.x} ${position.y} ${position.dir}${roverCondition}`;
};

const isWithInBounds = (min, max, val) => val <= max && val >= min;

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
    roverPosition = performInstruction[instruction](roverPosition);

    if (!isSafe(plateauBounds, roverPosition)) {
      return parseFinalPosition(lastRoverPosition, true);
    }
  }
  return parseFinalPosition(roverPosition, false);
};
