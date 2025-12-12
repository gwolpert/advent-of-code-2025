import type { Day } from "../runner.ts";

const parse = (input: string) => {
  const parts = input.split("\n\n");
  const sizes = parts.slice(0, -1).map((p) => p.match(/#/g)!.length);
  const regions = parts
    .at(-1)!
    .split("\n")
    .map((l) => l.split(/:? |x/).map(Number));
  return { sizes, regions };
};

export default {
  1: (input: string) => {
    const { sizes, regions } = parse(input);
    return regions.filter(([w, h, ...counts]) => {
      const need = counts.reduce((sum, c, i) => sum + c * sizes[i]!, 0);
      return w! * h! >= need;
    }).length;
  },
  2: (input: string) => {
    return 0;
  },
} satisfies Day;
