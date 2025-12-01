import { executePart, importDay } from "../runner.ts";
import { describe, test, expect } from "bun:test";
const DAY_NUMBER = 99;
describe(`Day ${DAY_NUMBER}`, async () => {
  const input = "";
  const day = await importDay(DAY_NUMBER);

  test("Part 1", async () => {
    const part = day[1];
    const result = await executePart("Part 1", part, input);
    expect(result).toBe(0);
  });

  test("Part 2", async () => {
    const part = day[2];
    const result = await executePart("Part 2", part, input);
    expect(result).toBe(0);
  });
});
