export const executeInstructions = (position, instructions) => {
  let pos = parsePosition(position);
  for(const char of instructions) {
    if (char === "M") {
      pos = moveRover(pos)
    }
    else {
      pos.dir = findNextDirection(pos.dir, char)
    }
  }
  return `${pos.row} ${pos.col} ${pos.dir}`;
};
////////////////////////////////////////////////
const isMove = (command) => command === "M";

// export const executeInstructions1 = (position, instructions) => {
//   const pos = parsePosition(position);
//   instructions.split("").forEach(command => {
//     if (isMove(command)) {
//       pos = moveRover2[pos.dir];
//     }
//     pos.dir = findNextDirection2[pos.dir](command);

//   });
//   return `${pos.row} ${pos.col} ${pos.dir}`;
// }

export const executeInstructions1 = (position, instructions) => {
  let pos = parsePosition(position);
  instructions.split("").forEach(command => {
    instructionSheet[command][pos.dir](pos)
  });
  return `${pos.row} ${pos.col} ${pos.dir}`;
}

const findNextDirectionRight = {
  N: (pos) => {pos.dir = "E"},
  S: (pos) => {pos.dir = "W"},
  E: (pos) => {pos.dir = "S"},
  W: (pos) => {pos.dir = "N"}
}

const findNextDirectionLeft = {
  N: (pos) => {pos.dir = "W"},
  S: (pos) => {pos.dir = "E"},
  E: (pos) => {pos.dir = "N"},
  W: (pos) => {pos.dir = "S"}
}

const moveRover2 = {
  N: (pos) => {pos.col += 1},
  S: (pos) => {pos.col -= 1},
  E: (pos) => {pos.row += 1},
  W: (pos) => {pos.row -=  1},
  }

const instructionSheet = {
  M: moveRover2,
  L: findNextDirectionLeft,
  R: findNextDirectionRight
}

//////////////////////////


export const parsePosition = (position) => {
  const pos = position;
  const row = parseInt(pos.slice(0, pos.indexOf(" ")));
  const col = parseInt(
    pos.slice(pos.indexOf(" ") + 1, pos.lastIndexOf(" ")),
  );
  const dir = pos.slice(pos.lastIndexOf(" ") + 1);
  return { row, col, dir };
};

export const findNextDirection = (dir, instruction) => {
  if (!"LR".includes(instruction)){
    return dir
  }
  let nextDirection = ""
  switch (dir) {
    case "N": nextDirection = instruction === "R" ? "E" : "W"; break;
    case "S": nextDirection = instruction === "R" ? "W" : "E"; break;
    case "E": nextDirection = instruction === "R" ? "S" : "N"; break;
    case "W": nextDirection = instruction === "R" ? "N" : "S"; break;
  }
  return nextDirection
}

export const moveRover = (pos) => {
  switch (pos.dir) {
    case "N": pos.col += 1; break;
    case "S": pos.col -= 1; break;
    case "E": pos.row += 1; break;
    case "W": pos.row -=  1; break;
  }
  return pos;
}