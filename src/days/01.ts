import type { Day } from "../runner.ts";

type Direction = "L" | "R";
type Rotation = { curr: number; next: number; dir: Direction; dist: number };
const dirs: Record<Direction, number> = { L: -1, R: 1 } as const;

const solve = (countFn: (r: Rotation) => number) => (input: string) =>
  input
    .matchAll(/^([LR])(\d+)$/gm)
    .map((x) => ({ dir: x[1] as Direction, dist: +x[2]! }))
    .reduce(
      ({ curr, count }, { dir, dist }) => {
        const next = (curr + dirs[dir] * dist) % 100;
        count += countFn({ curr, next, dir, dist });
        return { curr: next, count };
      },
      { curr: 50, count: 0 }
    ).count;

export default {
  1: solve(({ next }) => Number(!next)),
  2: solve(({ curr, dir, dist }) => {
    const delta = { L: 0, R: 100 }[dir] - curr * dirs[dir];
    return Math.max(0, ~~((dist - delta + 99) / 100));
  }),
} satisfies Day;
