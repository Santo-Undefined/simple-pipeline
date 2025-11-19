import { assertEquals } from "jsr:@std/assert";
// import { executeInstructions } from '../src/rover.js';
import * as fn from "../src/rover.js";

Deno.test('Just move', () => {
  assertEquals(fn.executeInstructions('0 0 N', 'M'), '0 1 N');
  assertEquals(fn.executeInstructions('0 0 N', 'MM'), '0 2 N');
});

Deno.test("position parse check", () => {
  assertEquals(fn.parsePosition("0 0 N"), { row: 0, col: 0, dir: "N" });
  assertEquals(fn.parsePosition("-2 3 E"), { row: -2, col: 3, dir: "E" });
  assertEquals(fn.parsePosition("-2 -3 E"), { row: -2, col: -3, dir: "E" });
});