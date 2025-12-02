import type { Day } from "../runner.ts";

const solve = (input: string, pattern: RegExp) =>
  input
    .matchAll(/(\d+)-(\d+)/g)
    .map(([, a, b]) => ({ length: +b! - +a! + 1, x: +b! }))
    .flatMap(({ length, x }) => Array.from({ length }, (_, i) => x + i))
    .filter((num) => num.toString().match(pattern))
    .reduce((sum, id) => sum + id, 0);

export default {
  1: (input: string) => solve(input, /^(\d+)\1$/),
  2: (input: string) => solve(input, /^(\d+)\1$+/),
} satisfies Day;
