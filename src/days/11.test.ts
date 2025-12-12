import { executePart, importDay } from "../runner.ts";
import { describe, test, expect } from "bun:test";
describe(`Day ${11}`, async () => {
  const input1 =
    "aaa: you hhh\n" +
    "you: bbb ccc\n" +
    "bbb: ddd eee\n" +
    "ccc: ddd eee fff\n" +
    "ddd: ggg\n" +
    "eee: out\n" +
    "fff: out\n" +
    "ggg: out\n" +
    "hhh: ccc fff iii\n" +
    "iii: out";
  const input2 =
    "svr: aaa bbb\n" +
    "aaa: fft\n" +
    "fft: ccc\n" +
    "bbb: tty\n" +
    "tty: ccc\n" +
    "ccc: ddd eee\n" +
    "ddd: hub\n" +
    "hub: fff\n" +
    "eee: dac\n" +
    "dac: fff\n" +
    "fff: ggg hhh\n" +
    "ggg: out\n" +
    "hhh: out";
  const day = await importDay(11);

  test("Part 1", async () => {
    const part = day[1];
    const result = await executePart("Part 1", part, input1);
    expect(result).toBe(5);
  });

  test("Part 2", async () => {
    const part = day[2];
    const result = await executePart("Part 2", part, input2);
    expect(result).toBe(2);
  });
});
