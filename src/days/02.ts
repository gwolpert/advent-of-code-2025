import type { Day } from "../runner.ts";

const solve = (pattern: RegExp) => (input: string) =>
  Array.from(input.matchAll(/(\d+)-(\d+)/g))
    .flatMap(([, from, until]) => {
      const start = Number(from);
      const length = Number(until) - start + 1;
      return Array.from({ length }, (_, i) => start + i);
    })
    .filter((id) => pattern.test(id.toString()))
    .reduce((sum, id) => sum + id, 0);

export default {
  1: solve(/^(\d+)\1$/),
  2: solve(/^(\d+)\1+$/),
} satisfies Day;
