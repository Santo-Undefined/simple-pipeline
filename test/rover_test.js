import { assertEquals } from "jsr:@std/assert";
import { executeInstructions } from '../src/rover.js';
import * as fn from "../src/rover.js";

Deno.test("Move freely", () => {
  assertEquals(executeInstructions('0 0 E', 'LMRMMMR', ""), "3 1 S")
})

Deno.test("position parse check", () => {
  assertEquals(fn.parsePosition("0 0 N"), { x: 0, y: 0, dir: "N" });
  assertEquals(fn.parsePosition("-2 3 E"), { x: -2, y: 3, dir: "E" });
  assertEquals(fn.parsePosition("-2 -3 E"), { x: -2, y: -3, dir: "E" });
});

Deno.test("for plateau check if rover is inside", () => {
  assertEquals(fn.isSafe({maxX:0, maxY:0},{x:0,y:0}), true)
  assertEquals(fn.isSafe({maxX:1, maxY:0},{x:0,y:0}), true)
  assertEquals(fn.isSafe({maxX:1, maxY:0},{x:Infinity,y:Infinity}), false)
  assertEquals(fn.isSafe({maxX:1, maxY:0},{x:-Infinity,y:-Infinity}), false)
  assertEquals(fn.isSafe({x:Infinity, y:0},{x:10,y:10}), false)
})

Deno.test("rotate in  place", () => {
  assertEquals(fn.executeInstructions("0 0 N", "RRRR", "1 1"), "0 0 N")
  assertEquals(fn.executeInstructions("0 0 N", "LRLR", "1 1"), "0 0 N")
  assertEquals(fn.executeInstructions("0 0 N", "LRLR", ""), "0 0 N")
})

Deno.test("Move", () => {
  assertEquals(fn.executeInstructions("0 0 N", "M", "1 1"), "0 1 N")
  assertEquals(fn.executeInstructions("0 0 N", "MM", "2 2"), "0 2 N")
  assertEquals(fn.executeInstructions("1 1 E", "MMLMMM", "5 5"), "3 4 N")
  assertEquals(fn.executeInstructions("0 0 N", "LMRM", ""), "-1 1 N")
  assertEquals(fn.executeInstructions("2 2 N", "MMMRMM"), "4 5 E")
  assertEquals(fn.executeInstructions("2 2 N", ""), "2 2 N")

})

Deno.test("Move out of bounds", () => {
  assertEquals(fn.executeInstructions("5 5 N", "M", "5 5"), "5 5 N RIP")
  assertEquals(fn.executeInstructions("0 0 S", "M", "5 5"), "0 0 S RIP")
  assertEquals(fn.executeInstructions("2 2 N", "MMMRMM", "4 4"), "2 4 N RIP")
  assertEquals(fn.executeInstructions("2 2 N", "MMMRMM", "0 0"), "2 2 N RIP")
  assertEquals(fn.executeInstructions("2 2 N", "MMMRMM", ""), "4 5 E")
  assertEquals(fn.executeInstructions("0 0 S", "M"), "0 -1 S");
})

Deno.test.only("MUlti-rover", () => {
  assertEquals(fn.executeInstructions("5 5\n2\n0 0 N\n1 1 S\n\nLM\nLM"),"0 0 W RIP\n2 1 E");
  assertEquals(fn.executeInstructions("\n2\n0 0 N\n1 1 S\n\nLM\nLM"), "-1 0 W\n2 1 E");
})