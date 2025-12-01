import { executePart, importDay } from "../runner.ts";
import { describe, test, expect } from "bun:test";
describe(`Day ${1}`, async () => {
  const input = "L68\nL30\nR48\nL5\nR60\nL55\nL1\nL99\nR14\nL82";
  const day = await importDay(1);

  test("Part 1", async () => {
    const part = day[1];
    const result = await executePart("Part 1", part, input);
    expect(result).toBe(3);
  });

  test("Part 2", async () => {
    const part = day[2];
    const result = await executePart("Part 2", part, input);
    expect(result).toBe(6);
  });
});
