import { assertEquals } from "jsr:@std/assert";
// import { executeInstructions } from '../src/rover.js';
import * as fn from "../src/rover.js";

Deno.test('Just move', () => {
  assertEquals(fn.executeInstructions('0 0 N', 'L'), '0 0 W');
  // assertEquals(fn.executeInstructions('0 0 N', 'MML'), '0 2 L');
});

Deno.test("position parse check", () => {
  assertEquals(fn.parsePosition("0 0 N"), { row: 0, col: 0, dir: "N" });
  assertEquals(fn.parsePosition("-2 3 E"), { row: -2, col: 3, dir: "E" });
  assertEquals(fn.parsePosition("-2 -3 E"), { row: -2, col: -3, dir: "E" });
});

Deno.test("check direction update", () => {
  assertEquals(fn.findRelavtiveDirectionsToMove("N", "R"),"E")
  assertEquals(fn.findRelavtiveDirectionsToMove("S", "L"),"E")
});

Deno.test("Move according to direction", () => {
  assertEquals(fn.moveRover({ row: 0, col: 0, dir: "N" }), { row: 0, col: 1, dir: "N" })
  assertEquals(fn.moveRover({ row: 1, col: 1, dir: "N" }), { row: 1, col: 2, dir: "N" })
  assertEquals(fn.moveRover({ row: 0, col: 0, dir: "S" }), { row: 0, col: -1, dir: "S" })
})