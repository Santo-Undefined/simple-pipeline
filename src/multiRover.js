const dbg = (x) => {
  console.log("debug prob", x);
  return x;
};

export const parsePosition = (initalPosition) => {
  const [x, y, dir] = initalPosition.split(" ");
  return { x: parseInt(x), y: parseInt(y), dir };
};

export const parsePlateauPosition = (position = "") => {
  if (position.length === 0) {
    return { maxX: Infinity, maxY: Infinity };
  }
  const [maxX, maxY] = position.split(" ");

  return { maxX: parseInt(maxX), maxY: parseInt(maxY) };
};

const parseFinalPosition = ({ x, y, dir }, isOffBounds) => {
  const roverCondition = isOffBounds ? " RIP" : "";
  return `${x} ${y} ${dir}${roverCondition}`;
};

const turn = (position, offset) => {
  const directions = ["N", "E", "S", "W"];
  const index = (directions.indexOf(position.dir) + offset) % directions.length;
  const dir = directions[index];
  return { ...position, dir };
};

const moves = () => {
  const directions = {
    N: (x, y) => ({ x, y: y + 1 }),
    S: (x, y) => ({ x, y: y - 1 }),
    E: (x, y) => ({ x: x + 1, y }),
    W: (x, y) => ({ x: x - 1, y }),
  };
  return (direction) => directions[direction];
};
const move = moves();

const moveRover = ({ x, y, dir }) => {
  const nextPosition = move(dir)(x, y);
  return { ...nextPosition, dir };
};

const instructionList = () => {
  const instructions = {
    M: (position) => moveRover(position),
    L: (position) => turn(position, 3),
    R: (position) => turn(position, 1),
  };
  return (instruction) => instructions[instruction];
};

const performInstruction = instructionList();

const isWithInBounds = (min, max, val) => val <= max && val >= min;
const isLessThanInfinity = (x, y) => x < Infinity && y < Infinity;

export const isSafe = ({ maxX, maxY }, { x, y }) => {
  const startVal = isLessThanInfinity(maxX, maxY) ? 0 : -Infinity;
  const isXvalid = isWithInBounds(startVal, maxX, x);
  const isYvalid = isWithInBounds(startVal, maxY, y);
  return isXvalid && isYvalid;
};

const executeRoverInstuctions = (position, instructions, plateau) => {
  const plateauBounds = plateau;
  let roverPosition = position;

  for (const instruction of [...instructions]) {
    const lastRoverPosition = roverPosition;
    roverPosition = performInstruction(instruction)(roverPosition);

    if (!isSafe(plateauBounds, roverPosition)) {
      return parseFinalPosition(lastRoverPosition, true);
    }
  }
  return parseFinalPosition(roverPosition, false);
};

export const executeInstructions = (inputObj) => {
  const plateauBounds = inputObj.plateau;
  const finalMessages = [];

  inputObj.rovres.forEach((rover) => {
    const roverResponse = executeRoverInstuctions(
      rover.position,
      rover.instructions,
      plateauBounds,
    );
    finalMessages.push(roverResponse);
  });
  return finalMessages.join("\n");
};

const inputObj = {
  plateau: { maxX: 5, maxY: 5 },
  roverCount: 3,
  rovres: [
    { position: { x: 0, y: 0, dir: "N" }, instructions: "MMM" },
    { position: { x: 1, y: 1, dir: "S" }, instructions: "MM" },
    { position: { x: 0, y: 2, dir: "N" }, instructions: "MMR" },
  ],
};

console.log(executeInstructions(inputObj));
