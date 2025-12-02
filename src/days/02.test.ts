import { executePart, importDay } from "../runner.ts";
import { describe, test, expect } from "bun:test";
describe(`Day ${2}`, async () => {
  const input =
    "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,\n" +
    "1698522-1698528,446443-446449,38593856-38593862,565653-565659,\n" +
    "824824821-824824827,2121212118-2121212124";
  const day = await importDay(2);

  test("Part 1", async () => {
    const part = day[1];
    const result = await executePart("Part 1", part, input);
    expect(result).toBe(1227775554);
  });

  test("Part 2", async () => {
    const part = day[2];
    const result = await executePart("Part 2", part, input);
    expect(result).toBe(4174379265);
  });
});
