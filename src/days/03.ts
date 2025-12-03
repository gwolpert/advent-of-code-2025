import type { Day } from "../runner.ts";

const solve = (mapBank: (bank: number[]) => number) => (input: string) => {
  const banks = input.split("\n").map((bank) => Array.from(bank).map(Number));
  return banks.map(mapBank).reduce((total, joltage) => total + joltage, 0);
};

export default {
  1: solve((bank) => {
    const joltages = bank.flatMap((first, i) =>
      Array.from(bank.slice(i + 1)).map((second) => first * 10 + second)
    );
    return Math.max(...joltages);
  }),
  2: solve((batteries) => {
    const result = batteries.reduce(
      (s, battery) => {
        while (s.skip > 0 && (s.selected.at(-1) ?? Infinity) < battery)
          (s.selected.pop(), s.skip--);
        return (s.selected.push(battery), s);
      },
      { selected: new Array<number>(), skip: batteries.length - 12 }
    );
    return +result.selected.slice(0, 12).join("");
  }),
} satisfies Day;
