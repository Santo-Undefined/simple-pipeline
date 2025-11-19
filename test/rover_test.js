import { executeInstructions } from '../src/rover.js';

Deno.test('A simple test', () => {
  assertEquals(executeInstructions('0 0 N', 'M'), '0 1 N');
});
