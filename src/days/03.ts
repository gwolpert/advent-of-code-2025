import type { Day } from "../runner.ts";

const solve = (enabled: number) => (input: string) => {
  const findBest = (bank: number[], needed: number): number[] => {
    if (needed === 0) return [];
    for (let digit = 9; digit >= 0; digit--) {
      const findIndex = (battery: number, pos: number) =>
        battery === digit && bank.length - pos >= needed;
      const index = bank.findIndex(findIndex) + 1;
      if (index) return [digit, ...findBest(bank.slice(index), --needed)];
    }
    return [];
  };

  const banks = input.split("\n").map((line) => {
    const bank = Array.from(line).map(Number);
    return Number(findBest(bank, enabled).join(""));
  });
  return banks.reduce((total, joltage) => total + joltage, 0);
};

export default {
  1: solve(2),
  2: solve(12),
} satisfies Day;
