import { assertEquals } from "jsr:@std/assert";
import * as fns from "../src/roverV1.js";

Deno.test("Move forward north", () =>
  assertEquals(fns.move({ x: 0, y: 0, heading: "N" }), {
    x: 0,
    y: 1,
    heading: "N",
  }));

Deno.test("Move forward south", () =>
  assertEquals(fns.move({ x: 0, y: 0, heading: "S" }), {
    x: 0,
    y: -1,
    heading: "S",
  }));

Deno.test("Move forward east", () =>
  assertEquals(fns.move({ x: 0, y: 0, heading: "E" }), {
    x: 1,
    y: 0,
    heading: "E",
  }));

Deno.test("Move forward west", () =>
  assertEquals(fns.move({ x: 0, y: 0, heading: "W" }), {
    x: -1,
    y: 0,
    heading: "W",
  }));
Deno.test("Trun right from north", () => {
  assertEquals(
    fns.turnR({ x: 1, y: 1, heading: "N" }),
    { x: 1, y: 1, heading: "E" },
  );
});

Deno.test("Turn right from east", () =>
  assertEquals(fns.turnR({ x: 0, y: 0, heading: "E" }), {
    x: 0,
    y: 0,
    heading: "S",
  }));

Deno.test("Turn right from south", () =>
  assertEquals(fns.turnR({ x: 0, y: 0, heading: "S" }), {
    x: 0,
    y: 0,
    heading: "W",
  }));

Deno.test("Turn right from west", () =>
  assertEquals(fns.turnR({ x: 0, y: 0, heading: "W" }), {
    x: 0,
    y: 0,
    heading: "N",
  }));

Deno.test("Turn Left from north", () =>
  assertEquals(fns.turnL({ x: 0, y: 0, heading: "N" }), {
    x: 0,
    y: 0,
    heading: "W",
  }));
Deno.test("Turn Left from east", () =>
  assertEquals(fns.turnL({ x: 0, y: 0, heading: "E" }), {
    x: 0,
    y: 0,
    heading: "N",
  }));
Deno.test("Turn Left from south", () =>
  assertEquals(fns.turnL({ x: 0, y: 0, heading: "S" }), {
    x: 0,
    y: 0,
    heading: "E",
  }));
Deno.test("Turn Left from west", () =>
  assertEquals(fns.turnL({ x: 0, y: 0, heading: "W" }), {
    x: 0,
    y: 0,
    heading: "S",
  }));

Deno.test("perform simple Instruction Move", () => {
  assertEquals(fns.performInstruction({ x: 0, y: 0, heading: "N" }, "M"), {
    x: 0,
    y: 1,
    heading: "N",
  })
})
Deno.test("perform simple Instruction turnR", () => {
  assertEquals(fns.performInstruction({ x: 0, y: 0, heading: "N" }, "R"), {
    x: 0,
    y: 0,
    heading: "E",
  })
})
Deno.test("perform simple Instruction turnL", () => {
  assertEquals(fns.performInstruction({ x: 0, y: 0, heading: "N" }, "L"), {
    x: 0,
    y: 0,
    heading: "W",
  })
});

Deno.test("excute simple instuctions", () => {
  assertEquals(fns.executeInstructions({ x: 0, y: 0, heading: "N" }, "L"), {
    x: 0,
    y: 0,
    heading: "W",
  })
})
Deno.test("excute multiple left turn instuctions", () => {
  assertEquals(fns.executeInstructions({ x: 0, y: 0, heading: "N" }, "LLLL"), {
    x: 0,
    y: 0,
    heading: "N",
  })
})
Deno.test("excute multiple right turn instuctions", () => {
  assertEquals(fns.executeInstructions({ x: 0, y: 0, heading: "N" }, "RRRR"), {
    x: 0,
    y: 0,
    heading: "N",
  })
})
Deno.test("excute multiple move instuctions", () => {
  assertEquals(fns.executeInstructions({ x: 0, y: 0, heading: "N" }, "MMMM"), {
    x: 0,
    y: 4,
    heading: "N",
  })
})
Deno.test("excute multiple random instuctions", () => {
  assertEquals(fns.executeInstructions({ x: 0, y: 0, heading: "N" }, "MLMLMLML"), {
    x: 0,
    y: 0,
    heading: "N",
  })
})
