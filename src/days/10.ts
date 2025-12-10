import type { Day } from "../runner.ts";

type Machine = { target: number[]; buttons: number[][]; joltages: number[] };

const parse = (input: string): Machine[] =>
  input.split("\n").map((line) => ({
    target: [...line.match(/\[([.#]+)]/)![1]!].map((c) => +(c === "#")),
    buttons: [...line.matchAll(/\(([^)]+)\)/g)].map((m) => m[1]!.split(",").map(Number)),
    joltages: line
      .match(/\{([^}]+)}/)![1]!
      .split(",")
      .map(Number),
  }));

const gaussElim = (target: number[], buttons: number[][], gf2 = false) => {
  const [n, m] = [target.length, buttons.length];
  const matrix = target.map((t, i) => [...buttons.map((b) => +b.includes(i)), t]);
  const [pivotCols, freeCols]: [number[], number[]] = [[], []];
  let pivotRow = 0;

  for (let col = 0; col < m; col++) {
    const pivot = matrix.slice(pivotRow).findIndex((row) => row[col]) + pivotRow;
    if (pivot < pivotRow) {
      freeCols.push(col);
      continue;
    }
    [matrix[pivotRow], matrix[pivot]] = [matrix[pivot]!, matrix[pivotRow]!];
    pivotCols.push(col);
    const pVal = matrix[pivotRow]![col]!;
    for (let row = 0; row < n; row++) {
      if (row !== pivotRow && matrix[row]![col]) {
        const f = matrix[row]![col]! / pVal;
        for (let c = 0; c <= m; c++)
          matrix[row]![c] = gf2
            ? matrix[row]![c]! ^ matrix[pivotRow]![c]!
            : matrix[row]![c]! - f * matrix[pivotRow]![c]!;
      }
    }
    pivotRow++;
  }
  return { matrix, pivotCols, freeCols, pivotRow, n, m };
};

const solveLights = (target: number[], buttons: number[][]): number => {
  const { matrix, pivotCols, freeCols, pivotRow, n, m } = gaussElim(target, buttons, true);
  if (matrix.slice(pivotRow, n).some((row) => row[m])) return 0;

  let min = Infinity;
  for (let fv = 0; fv < 1 << freeCols.length; fv++) {
    const sol = Array(m).fill(0);
    freeCols.forEach((c, i) => (sol[c] = (fv >> i) & 1));
    for (let i = pivotCols.length - 1; i >= 0; i--) {
      const c = pivotCols[i]!;
      const rhs = matrix[i]![m]!;
      const xor = matrix[i]!.slice(c + 1, m).reduce((v, x, j) => v ^ (x ? sol[c + 1 + j] : 0), 0);
      sol[c] = rhs ^ xor;
    }
    min = Math.min(
      min,
      sol.reduce((a, b) => a + b)
    );
  }
  return min === Infinity ? 0 : min;
};

const solveJoltage = (target: number[], buttons: number[][]): number => {
  const { matrix, pivotCols, freeCols, m } = gaussElim(target, buttons);
  const maxFree = Math.max(...target) + 1;
  let min = Infinity;

  const search = (idx: number, sol: number[]): void => {
    if (idx === freeCols.length) {
      const full = [...sol];
      for (let i = pivotCols.length - 1; i >= 0; i--) {
        const c = pivotCols[i]!;
        const rhs = matrix[i]![m]!;
        const sum = matrix[i]!.slice(c + 1, m).reduce((v, x, j) => v + x * full[c + 1 + j]!, 0);
        full[c] = (rhs - sum) / matrix[i]![c]!;
      }
      if (full.every((x) => x >= 0 && Number.isInteger(x)))
        min = Math.min(
          min,
          full.reduce((a, b) => a + b)
        );
      return;
    }
    for (let v = 0; v <= maxFree && v < min; v++) {
      sol[freeCols[idx]!] = v;
      search(idx + 1, sol);
    }
  };
  search(0, Array(m).fill(0));
  return min === Infinity ? 0 : min;
};

export default {
  1: (input: string) =>
    parse(input).reduce((s, { target, buttons }) => s + solveLights(target, buttons), 0),
  2: (input: string) =>
    parse(input).reduce((s, { joltages, buttons }) => s + solveJoltage(joltages, buttons), 0),
} satisfies Day;
