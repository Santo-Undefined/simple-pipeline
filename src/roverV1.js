const dbg = (x) => {
  console.log("debug prob", x);
  return x;
};

export const move = ({ x, y, heading, ...rest }) => {
  // dbg(rest)
  const directions = {
    N: [0, 1],
    E: [1, 0],
    S: [0, -1],
    W: [-1, 0],
  };
  return ({ x : x + directions[heading][0] , y: y + directions[heading][1], heading, ...rest });
};

export const compass = ({ heading, ...rest }, direction) => {
  const options = {
    N: { R: "E", L: "W" },
    E: { R: "S", L: "N" },
    S: { R: "W", L: "E" },
    W: { R: "N", L: "S" },
  };
  return { heading: options[heading][direction], ...rest };
};

export const turnR = ({ heading, ...rest }) => {
  return { ...compass({ heading }, "R"), ...rest };
};

export const turnL = ({ heading, ...rest }) => {
  return { ...compass({ heading }, "L"), ...rest };
};
