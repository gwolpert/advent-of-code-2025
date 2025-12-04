import type { Day } from "../runner.ts";

const directions: [number, number][] = [
  [-1, -1], // top-left
  [-1, 0], // top
  [-1, 1], // top-right
  [0, -1], // left
  [0, 1], // right
  [1, -1], // bottom-left
  [1, 0], // bottom
  [1, 1], // bottom-right
];

const solve = (repeat: boolean) => (input: string) => {
  const grid = input.split("\n").map((line) => line.split(""));
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;

  const countAdjacent = (y: number, x: number) =>
    directions
      .map(([dy, dx]): [number, number] => [y + dy, x + dx])
      .filter(([y, x]) => {
        return y >= 0 && y < rows && x >= 0 && x < cols && grid[y]![x] === "@";
      }).length;

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
