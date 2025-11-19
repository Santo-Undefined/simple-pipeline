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

export const executeInstructions1 = (position, instructions) => {
  let pos = parsePosition(position);
  instructions.split("").forEach(command => {
    pos = isMove(command) ? moveRover1(pos) : findNextDirection1(pos, command);
  });
  return `${pos.row} ${pos.col} ${pos.dir}`;
}

export const findNextDirection1 = (pos, instruction) => {
  if (!"LR".includes(instruction)){
    return pos
  }
  const curretDirection = pos.dir;
  switch (curretDirection) {
    case "N": pos.dir = instruction === "R" ? "E" : "W"; break;
    case "S": pos.dir = instruction === "R" ? "W" : "E"; break;
    case "E": pos.dir = instruction === "R" ? "S" : "N"; break;
    case "W": pos.dir = instruction === "R" ? "N" : "S"; break;
  }
  return pos;
}

export const moveRover1 = (pos) => {
  switch (pos.dir) {
    case "N": pos.col += 1; break;
    case "S": pos.col -= 1; break;
    case "E": pos.row += 1; break;
    case "W": pos.row -=  1; break;
  }
  return pos;
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