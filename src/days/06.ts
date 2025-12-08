import type { Day } from "../runner.ts";

const opFns: Record<string, (a: number, b: number) => number> = {
  "*": (a, b) => a * b,
  "+": (a, b) => a + b,
};

const parse = (input: string) => {
  const rows = input.split("\n");
  const operators = [...rows.pop()!.matchAll(/[*+]+/g)];
  const numbers = rows.map((r) => [...r.matchAll(/\d+/g)].map(([m]) => m));
  return { rows, operators, numbers };
};

const solve = (numbers: number[]) => numbers.reduce((a, b) => a + b);

export default {
  1: (input: string) => {
    const { operators, numbers } = parse(input);
    const result = operators.map(([operator], i) =>
      numbers.map((row) => +row[i]!).reduce(opFns[operator]!)
    );
    return solve(result);
  },
  2: (input: string) => {
    const { rows, operators, numbers } = parse(input);
    const result = operators.map(([operator], i) => {
      const col = numbers.map((row) => row[i]!);
      const length = Math.max(...col.map(({ length }) => length));
      const start = operators[i]!.index;
      const colNums = Array.from({ length }, (_, j) => {
        const numbers = rows.map((r) => r[start + j] ?? " ");
        return +numbers.join("").trim();
      }).filter(Boolean);
      return colNums.reduce(opFns[operator]!);
    });
    return solve(result);
  },
} satisfies Day;
