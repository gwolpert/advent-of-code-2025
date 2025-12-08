import { executePart, importDay } from "../runner.ts";
import { describe, test, expect } from "bun:test";
describe(`Day ${8}`, async () => {
  const input =
    "162,817,812\n" +
    "57,618,57\n" +
    "906,360,560\n" +
    "592,479,940\n" +
    "352,342,300\n" +
    "466,668,158\n" +
    "542,29,236\n" +
    "431,825,988\n" +
    "739,650,466\n" +
    "52,470,668\n" +
    "216,146,977\n" +
    "819,987,18\n" +
    "117,168,530\n" +
    "805,96,715\n" +
    "346,949,466\n" +
    "970,615,88\n" +
    "941,993,340\n" +
    "862,61,35\n" +
    "984,92,344\n" +
    "425,690,689\n";
  const day = await importDay(8);

  test("Part 1", async () => {
    // Test uses 10 connections, actual uses 1000
    const { init } = await import("./08.ts");
    const { circuitOf, connections, findRoot } = init(input);
    connections
      .slice(0, 10)
      .forEach(([, a, b]) => (circuitOf[findRoot(a)] = findRoot(b)));
    const sizes = new Map<number, number>();
    circuitOf.forEach((_, i) => {
      const root = findRoot(i);
      sizes.set(root, (sizes.get(root) ?? 0) + 1);
    });
    const result = [...sizes.values()]
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((a, b) => a * b);
    expect(result).toBe(40);
  });

  test("Part 2", async () => {
    const part = day[2];
    const result = await executePart("Part 2", part, input);
    expect(result).toBe(25272);
  });
});
