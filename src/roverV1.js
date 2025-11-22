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

export const performInstruction = (position, command) => {
  const commands = {
    M: move,
    L: turnL,
    R: turnR,
  };
  return commands[command](position);
};
