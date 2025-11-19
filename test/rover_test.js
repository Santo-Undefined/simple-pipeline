import {assertEquals} from "jsr:@std/assert"
// import { executeInstructions } from '../src/rover.js';
import * as fn from '../src/rover.js';

// Deno.test('A simple test', () => {
//   assertEquals(executeInstructions('0 0 N', 'M'), '0 1 N');
// });

Deno.test("simple movement check", () => {
  assertEquals(fn.parsePosition("0 0 N"), {row: 0, col :0, dir: "N"})
});