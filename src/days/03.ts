import type { Day } from "../runner.ts";

const solve = (enabled: number) => (input: string) => {
  const findBest = (bank: number[], needed: number): number[] => {
    if (needed === 0) return [];
    for (let digit = 9; digit >= 0; digit--) {
      const i = bank.findIndex((battery, position) => {
        return battery === digit && bank.length - position >= needed;
      });
      if (~i) return [digit, ...findBest(bank.slice(i + 1), needed - 1)];
    }
    return [];
  };

  const banks = input.split("\n").map((bank) => {
    const battery = Array.from(bank).map(Number);
    return Number(findBest(battery, enabled).join(""));
  });
  return banks.reduce((total, joltage) => total + joltage, 0);
};

export default {
  1: solve(2),
  2: solve(12),
} satisfies Day;
