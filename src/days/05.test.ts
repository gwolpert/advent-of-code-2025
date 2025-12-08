import { executePart, importDay } from "../runner.ts";
import { describe, test, expect } from "bun:test";
describe(`Day ${5}`, async () => {
  const input =
    "3-5\n" +
    "10-14\n" +
    "16-20\n" +
    "12-18\n" +
    "\n" +
    "1\n" +
    "5\n" +
    "8\n" +
    "11\n" +
    "17\n" +
    "32";
  const day = await importDay(5);

  test("Part 1", async () => {
    const part = day[1];
    const result = await executePart("Part 1", part, input);
    expect(result).toBe(3);
  });

  test("Part 2", async () => {
    const part = day[2];
    const result = await executePart("Part 2", part, input);
    expect(result).toBe(14);
  });
});
