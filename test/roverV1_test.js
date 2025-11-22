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
Deno.test("Rover trun Right from north", () => {
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
