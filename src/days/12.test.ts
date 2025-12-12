import { executePart, importDay } from "../runner.ts";
import { describe, test, expect } from "bun:test";
describe(`Day ${12}`, async () => {
  const input =
    "0:\n###\n##.\n##.\n\n" +
    "1:\n###\n##.\n.##\n\n" +
    "2:\n.##\n###\n##.\n\n" +
    "3:\n##.\n###\n##.\n\n" +
    "4:\n###\n#..\n###\n\n" +
    "5:\n###\n.#.\n###\n\n" +
    "4x4: 0 0 0 0 2 0\n" +
    "12x5: 1 0 1 0 2 2\n" +
    "12x5: 1 0 1 0 3 2";
  const day = await importDay(12);

  test("Part 1", async () => {
    const part = day[1];
    const result = await executePart("Part 1", part, input);
    expect(result).toBe(3);
  });

  test("Part 2", async () => {
    const part = day[2];
    const result = await executePart("Part 2", part, input);
    expect(result).toBe(0);
  });
});
