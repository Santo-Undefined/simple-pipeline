export const executeInstructions = (position, instructions) => {
  const pos = parsePosition(position);
  for(const char of instructions) {
    if (char === "M") {
      pos.col += 1
    }
  }
  return `${pos.row} ${pos.col} ${pos.dir}`
};

export const parsePosition = (position) => {
  const pos = position;
  const row = parseInt(pos.slice(0, pos.indexOf(" ")));
  const col = parseInt(
    pos.slice(pos.indexOf(" ") + 1, pos.lastIndexOf(" ")),
  );
  const dir = pos.slice(pos.lastIndexOf(" ") + 1);
  return { row, col, dir };
};
