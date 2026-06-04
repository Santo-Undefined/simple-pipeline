const dbg = (x) => {
  console.log("debug prob", x);
  return x;
};

const compass = {
  N: { R: "E", L: "W", offset: [0, 1] },
  E: { R: "S", L: "N", offset: [1, 0] },
  S: { R: "W", L: "E", offset: [0, -1] },
  W: { R: "N", L: "S", offset: [-1, 0] },
};

export const move = ({ x, y, heading, ...rest }) => {
  const [dx, dy] = compass[heading].offset;
  return ({ x: x + dx, y: y + dy, heading, ...rest });
};

export const turnR = ({ heading, ...rest }) => {
  return { heading: compass[heading].R, ...rest };
};

export const turnL = ({ heading, ...rest }) => {
  return { heading: compass[heading].L, ...rest };
};

export const performInstruction = (position, command, plateauBounds) => {
  const commands = {
    M: move,
    L: turnL,
    R: turnR,
  };
  const newPosition = commands[command](position);
  // dbg({ plateauBounds });
  // dbg({ newPosition });
  return { ...newPosition, isLive: isOnPlateau(plateauBounds, newPosition) };
};

export const parsePosition = (position) => {
  const [x, y, heading] = position.split(" ");
  return { x: parseInt(x), y: parseInt(y), heading, isLive: true };
};

export const parsePlateauBounds = (plateau) => {
  if (plateau === "") return [Infinity, Infinity, -Infinity, -Infinity];
  const [maxX, maxY] = plateau.split(" ");
  return { maxX: parseInt(maxX), maxY: parseInt(maxY), minX: 0, minY: 0 };
};

export const isOnPlateau = (plateau, currentPosition) =>
  plateau.maxX >= currentPosition.x <= plateau.minX &&
  plateau.maxY >= currentPosition.y <= plateau.miny;

export const makeFinalMessage = ({ x, y, heading, isLive }) => {
  const finalMessage = isLive
    ? `${x} ${y} ${heading}`
    : `${x} ${y} ${heading} RIP`;
  return `${x} ${y} ${heading}`;
};

export const executeInstructions = (initialPosition, instructions, plateau) => {
  const plateauBounds = parsePlateauBounds(plateau);
  let currentPosition = parsePosition(initialPosition);

  [...instructions].forEach((command) => {
    const lastPosition = currentPosition;
    currentPosition = performInstruction(
      currentPosition,
      command,
      plateauBounds,
    );
    // dbg({currentPosition})
    if (!currentPosition.isLive) {
      // dbg("inside if");
      return makeFinalMessage(lastPosition);
    }
  });
  return makeFinalMessage(currentPosition);
};
