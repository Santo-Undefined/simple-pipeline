import { assertEquals } from "jsr:@std/assert";
import * as fns from "../src/roverV1.js";

Deno.test("Move forward north", () =>
  assertEquals(fns.move({ x: 0, y: 0, heading: "N", isLive: true }), {
    x: 0,
    y: 1,
    heading: "N",
    isLive: true,
  }));

Deno.test("Move forward south", () =>
  assertEquals(fns.move({ x: 0, y: 0, heading: "S", isLive: true }), {
    x: 0,
    y: -1,
    heading: "S",
    isLive: true,
  }));

Deno.test("Move forward east", () =>
  assertEquals(fns.move({ x: 0, y: 0, heading: "E", isLive: true }), {
    x: 1,
    y: 0,
    heading: "E",
    isLive: true,
  }));

Deno.test("Move forward west", () =>
  assertEquals(fns.move({ x: 0, y: 0, heading: "W", isLive: true }), {
    x: -1,
    y: 0,
    heading: "W",
    isLive: true,
  }));
Deno.test("Trun right from north", () => {
  assertEquals(
    fns.turnR({ x: 1, y: 1, heading: "N", isLive: true }),
    { x: 1, y: 1, heading: "E", isLive: true },
  );
});

Deno.test("Turn right from east", () =>
  assertEquals(fns.turnR({ x: 0, y: 0, heading: "E", isLive: true }), {
    x: 0,
    y: 0,
    heading: "S",
    isLive: true,
  }));

Deno.test("Turn right from south", () =>
  assertEquals(fns.turnR({ x: 0, y: 0, heading: "S", isLive: true }), {
    x: 0,
    y: 0,
    heading: "W",
    isLive: true,
  }));

Deno.test("Turn right from west", () =>
  assertEquals(fns.turnR({ x: 0, y: 0, heading: "W", isLive: true }), {
    x: 0,
    y: 0,
    heading: "N",
    isLive: true,
  }));

Deno.test("Turn Left from north", () =>
  assertEquals(fns.turnL({ x: 0, y: 0, heading: "N", isLive: true }), {
    x: 0,
    y: 0,
    heading: "W",
    isLive: true,
  }));
Deno.test("Turn Left from east", () =>
  assertEquals(fns.turnL({ x: 0, y: 0, heading: "E", isLive: true }), {
    x: 0,
    y: 0,
    heading: "N",
    isLive: true,
  }));
Deno.test("Turn Left from south", () =>
  assertEquals(fns.turnL({ x: 0, y: 0, heading: "S", isLive: true }), {
    x: 0,
    y: 0,
    heading: "E",
    isLive: true,
  }));
Deno.test("Turn Left from west", () =>
  assertEquals(fns.turnL({ x: 0, y: 0, heading: "W", isLive: true }), {
    x: 0,
    y: 0,
    heading: "S",
    isLive: true,
  }));

Deno.test("perform simple Instruction Move", () => {
  assertEquals(
    fns.performInstruction({ x: 0, y: 0, heading: "N", isLive: true }, "M", {
      maxX: 5,
      maxY: 5,
      minX: 0,
      minY: 0,
    }),
    {
      x: 0,
      y: 1,
      heading: "N",
      isLive: false,
    },
  );
});
Deno.test("perform simple Instruction turnR", () => {
  assertEquals(
    fns.performInstruction({ x: 0, y: 0, heading: "N" }, "R", {
      maxX: 5,
      maxY: 5,
    }),
    {
      x: 0,
      y: 0,
      heading: "E",
      isLive: false,
    },
  );
});
Deno.test("perform simple Instruction turnL", () => {
  assertEquals(
    fns.performInstruction({ x: 0, y: 0, heading: "N" }, "L", {
      maxX: 5,
      maxY: 5,
      minX: 0,
      minY: 0,
    }),
    {
      x: 0,
      y: 0,
      heading: "W",
      isLive: false,
    },
  );
});

Deno.test("excute simple instuctions", () => {
  assertEquals(fns.executeInstructions("0 0 N", "L", "5 5"), "0 0 W");
});
Deno.test("excute multiple left turn instuctions", () => {
  assertEquals(fns.executeInstructions("0 0 N", "LLLL", "5 5"), "0 0 N");
});
Deno.test("excute multiple right turn instuctions", () => {
  assertEquals(fns.executeInstructions("0 0 N", "RRRR", "5 5"), "0 0 N");
});
Deno.test("excute multiple move instuctions", () => {
  assertEquals(fns.executeInstructions("0 0 N", "MMMM", "5 5"), "0 4 N");
});
Deno.test("excute multiple random instuctions", () => {
  assertEquals(fns.executeInstructions("0 0 N", "MLMLMLML", "5 5"), "0 0 N");
});
Deno.test("parse Input", () => {
  assertEquals(fns.parsePosition("0 0 N"), {
    x: 0,
    y: 0,
    heading: "N",
    isLive: true,
  });
});
Deno.test("Make final message", () => {
  assertEquals(fns.makeFinalMessage({ x: 1, y: 1, heading: "N" }), "1 1 N");
});
Deno.test("Parse input with boundary", () => {
  assertEquals(fns.parsePlateauBounds("0 0"), {
    maxX: 0,
    maxY: 0,
    minX: 0,
    minY: 0,
  });
});
Deno.test("Is on plateau", () => {
  assertEquals(fns.isOnPlateau({ maxX: 5, maxY: 5 }, { x: 0, y: 0 }), false);
});
Deno.test("Is not on plateau", () => {
  assertEquals(fns.isOnPlateau({ maxX: 5, maxY: 5 }, { x: 6, y: 0 }), false);
});
Deno.test("Is not on plateau neagtive coords", () => {
  assertEquals(fns.isOnPlateau({ maxX: -1, maxY: 0 }, { x: 6, y: 0 }), false);
});
Deno.test("Is not on plateau neagtive coords 2", () => {
  assertEquals(fns.isOnPlateau({ maxX: 5, maxY: 5 }, { x: -1, y: 0 }), false);
});
// Deno.test("when fallen off the plateau", () => {
//   assertEquals(fns.executeInstructions("0 0 S", "M", "5 5"), "0 0 S RIP");
// });
