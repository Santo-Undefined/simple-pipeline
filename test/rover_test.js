import { assertEquals } from "jsr:@std/assert";
// import { executeInstructions } from '../src/rover.js';
import * as fn from "../src/rover.js";

Deno.test.ignore('Just move', () => {
  assertEquals(fn.executeInstructions('0 0 N', 'M'), '0 1 N');
  assertEquals(fn.executeInstructions('0 0 N', 'MML'), '0 2 L');
});

Deno.test("position parse check", () => {
  assertEquals(fn.parsePosition("0 0 N"), { row: 0, col: 0, dir: "N" });
  assertEquals(fn.parsePosition("-2 3 E"), { row: -2, col: 3, dir: "E" });
  assertEquals(fn.parsePosition("-2 -3 E"), { row: -2, col: -3, dir: "E" });
});

Deno.test("check direction update", () => {
  assertEquals(fn.findRelavtiveDirectionsToMove({dir: "N"}, "R"),{dir:"E"})
  assertEquals(fn.findRelavtiveDirectionsToMove({dir: "S"}, "L"),{dir:"E"})
});