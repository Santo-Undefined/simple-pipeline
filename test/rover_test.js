import { assertEquals } from "jsr:@std/assert";
import { executeInstructions } from '../src/rover.js';
import * as fn from "../src/rover.js";

Deno.test("Move freely", () => {
  assertEquals(executeInstructions('0 0 E', 'LMRMMMR'), "3 1 S")
})

Deno.test('Just move in place', () => {
  assertEquals(fn.executeInstructions('0 0 N', 'L'), '0 0 W');
  assertEquals(fn.executeInstructions('0 0 N', 'LLLL'), '0 0 N');
  assertEquals(fn.executeInstructions('0 0 S', 'R'), '0 0 W');
  assertEquals(fn.executeInstructions('0 0 S', 'RL'), '0 0 S');
});

Deno.test("Move one step", () => {
  assertEquals(fn.executeInstructions('0 0 N', 'M'), '0 1 N')
  assertEquals(fn.executeInstructions('0 0 N', 'LLM'), '0 -1 S')
  assertEquals(fn.executeInstructions('0 0 N', 'LLMRR'), '0 -1 N')
})

Deno.test("position parse check", () => {
  assertEquals(fn.parsePosition("0 0 N"), { row: 0, col: 0, dir: "N" });
  assertEquals(fn.parsePosition("-2 3 E"), { row: -2, col: 3, dir: "E" });
  assertEquals(fn.parsePosition("-2 -3 E"), { row: -2, col: -3, dir: "E" });
});

Deno.test("for plateau check if rover is inside", () => {
  assertEquals(fn.isSafe({x:0, y:0},{x:0,y:0}), true)
  assertEquals(fn.isSafe({x:1, y:0},{x:0,y:0}), false)
  assertEquals(fn.isSafe({x:1, y:0},{x:Infinity,y:Infinity}), true)
  assertEquals(fn.isSafe({x:Infinity, y:0},{x:10,y:10}), false)
})