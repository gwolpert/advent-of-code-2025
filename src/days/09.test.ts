import { executePart, importDay } from "../runner.ts";
import { describe, test, expect } from "bun:test";
describe(`Day ${9}`, async () => {
  const input = "7,1\n" + "11,1\n" + "11,7\n" + "9,7\n" + "9,5\n" + "2,5\n" + "2,3\n" + "7,3\n";
  const day = await importDay(9);

  test("Part 1", async () => {
    const part = day[1];
    const result = await executePart("Part 1", part, input);
    expect(result).toBe(50);
  });

  test("Part 2", async () => {
    const part = day[2];
    const result = await executePart("Part 2", part, input);
    expect(result).toBe(24);
  });
});
