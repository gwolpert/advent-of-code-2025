import type { Day } from "../runner.ts";

const parse = (input: string) => {
  const [rangesSection, idsSection] = input.split("\n\n");
  const ranges = Array.from(rangesSection!.matchAll(/(\d+)-(\d+)/g)).map(
    ([, from, to]) => [+from!, +to!] as const
  );
  const ids = idsSection!.match(/\d+/g)!.map(Number);
  return { ranges, ids };
};

export default {
  1: (input: string) => {
    const { ranges, ids } = parse(input);
    return ids.filter((id) => ranges.some(([from, to]) => id >= from && id <= to)).length;
  },
  2: (input: string) => {
    const { ranges } = parse(input);
    return ranges
      .sort(([fromA, toA], [fromB, toB]) => fromA - fromB || toA - toB)
      .reduce(
        ({ count, maxEnd }, [from, to]) => {
          const start = Math.max(from, maxEnd + 1);
          if (start > to) return { count, maxEnd };
          count += to - start + 1;
          return { count, maxEnd: to };
        },
        { count: 0, maxEnd: -1 }
      ).count;
  },
} satisfies Day;
