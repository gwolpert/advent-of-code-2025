import type { Day } from "../runner.ts";

const parse = (input: string) => {
  const [startRow, ...grid] = input.split("\n");
  const start = startRow!.indexOf("S");
  return { grid, start };
};

export default {
  1: (input: string) => {
    const { grid, start } = parse(input);
    let beams = new Set([start]);
    let splits = 0;
    for (let y = 1; y < grid.length; y++)
      beams = new Set(
        [...beams].flatMap((x) => (grid[y]![x] === "^" ? (splits++, [x - 1, x + 1]) : x))
      );
    return splits;
  },
  2: (input: string) => {
    const { grid, start } = parse(input);
    let beams = new Map([[start, 1]]);
    for (let y = 1; y < grid.length; y++) {
      const next = new Map<number, number>();
      const add = (x: number, n: number) => next.set(x, (next.get(x) ?? 0) + n);
      for (const [x, n] of beams) grid[y]![x] === "^" ? (add(x - 1, n), add(x + 1, n)) : add(x, n);
      beams = next;
    }
    return [...beams.values()].reduce((a, b) => a + b, 0);
  },
} satisfies Day;
