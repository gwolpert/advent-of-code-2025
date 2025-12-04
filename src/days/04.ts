import type { Day } from "../runner.ts";

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const solve = (repeat: boolean) => (input: string) => {
  const grid = input.split("\n").map((line) => line.split(""));
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;

  const countAdjacent = (r: number, c: number) =>
    directions.reduce((count, [dr, dc]) => {
      const nr = r + dr!;
      const nc = c + dc!;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) return count;
      return count + Number(grid[nr]![nc] === "@");
    }, 0);

  let total = 0;
  do {
    const accessible: [number, number][] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r]![c] === "@" && countAdjacent(r, c) < 4) {
          accessible.push([r, c]);
        }
      }
    }
    if (!accessible.length) break;
    total += accessible.length;
    accessible.forEach(([r, c]) => (grid[r]![c] = "."));
  } while (repeat);

  return total;
};

export default {
  1: solve(false),
  2: solve(true),
} satisfies Day;
