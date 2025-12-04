import { executePart, importDay } from "../runner.ts";
import { describe, test, expect } from "bun:test";
describe(`Day ${4}`, async () => {
  const input =
    "..@@.@@@@.\n" +
    "@@@.@.@.@@\n" +
    "@@@@@.@.@@\n" +
    "@.@@@@..@.\n" +
    "@@.@@@@.@@\n" +
    ".@@@@@@@.@\n" +
    ".@.@.@.@@@\n" +
    "@.@@@.@@@@\n" +
    ".@@@@@@@@.\n" +
    "@.@.@@@.@.";
  const day = await importDay(4);

  test("Part 1", async () => {
    const part = day[1];
    const result = await executePart("Part 1", part, input);
    expect(result).toBe(13);
  });

  test("Part 2", async () => {
    const part = day[2];
    const result = await executePart("Part 2", part, input);
    expect(result).toBe(43);
  });
});
