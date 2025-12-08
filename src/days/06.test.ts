import { executePart, importDay } from "../runner.ts";
import { describe, test, expect } from "bun:test";
describe(`Day ${6}`, async () => {
  const input =
    "123 328  51 64 \n" +
    " 45 64  387 23 \n" +
    "  6 98  215 314\n" +
    "*   +   *   +  ";
  const day = await importDay(6);

  test("Part 1", async () => {
    const part = day[1];
    const result = await executePart("Part 1", part, input);
    expect(result).toBe(4277556);
  });

  test("Part 2", async () => {
    const part = day[2];
    const result = await executePart("Part 2", part, input);
    expect(result).toBe(3263827);
  });
});
