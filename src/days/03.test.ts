import { executePart, importDay } from "../runner.ts";
import { describe, test, expect } from "bun:test";
describe(`Day ${3}`, async () => {
  const input = "987654321111111\n" + "811111111111119\n" + "234234234234278\n" + "818181911112111";
  const day = await importDay(3);

  test("Part 1", async () => {
    const part = day[1];
    const result = await executePart("Part 1", part, input);
    expect(result).toBe(357);
  });

  test("Part 2", async () => {
    const part = day[2];
    const result = await executePart("Part 2", part, input);
    expect(result).toBe(3121910778619);
  });
});
