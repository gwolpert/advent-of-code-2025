import { executePart, importDay } from "../runner.ts";
import { describe, test, expect } from "bun:test";
describe(`Day ${7}`, async () => {
  const input =
    ".......S.......\n" +
    "...............\n" +
    ".......^.......\n" +
    "...............\n" +
    "......^.^......\n" +
    "...............\n" +
    ".....^.^.^.....\n" +
    "...............\n" +
    "....^.^...^....\n" +
    "...............\n" +
    "...^.^...^.^...\n" +
    "...............\n" +
    "..^...^.....^..\n" +
    "...............\n" +
    ".^.^.^.^.^...^.\n" +
    "...............";
  const day = await importDay(7);

  test("Part 1", async () => {
    const part = day[1];
    const result = await executePart("Part 1", part, input);
    expect(result).toBe(21);
  });

  test("Part 2", async () => {
    const part = day[2];
    const result = await executePart("Part 2", part, input);
    expect(result).toBe(40);
  });
});
