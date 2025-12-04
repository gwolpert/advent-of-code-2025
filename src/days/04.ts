import type { Day } from "../runner.ts";

const solve = (repeat: boolean) => (input: string) => {
  const grid = input.split("\n").map((line) => line.split(""));
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;

  const countAdjacent = (r: number, c: number) => {
    let count = 0;
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = r + dr,
          nc = c + dc;
        if (
          nr >= 0 &&
          nr < rows &&
          nc >= 0 &&
          nc < cols &&
          grid[nr]![nc] === "@"
        ) {
          count++;
        }
      }
    }
    return count;
  };

  let total = 0;
  while (repeat) {
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
  }

  return total;
};

export default {
  1: solve(false),
  2: solve(true),
} satisfies Day;
