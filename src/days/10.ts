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

const findXorPatterns = (target: number[], buttons: number[][]): number[][][] => {
  const n = buttons.length;
  const results: number[][][] = [];
  for (let mask = 0; mask < 1 << n; mask++) {
    const state = Array(target.length).fill(0);
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) buttons[i]!.forEach((b) => (state[b] ^= 1));
    }
    if (state.every((s, i) => s === target[i])) {
      results.push(buttons.filter((_, i) => mask & (1 << i)));
    }
  }
  return results;
};

export default {
  1: (input: string) =>
    parse(input).reduce((s, { target, buttons }) => {
      const patterns = findXorPatterns(target, buttons);
      if (!patterns.length) return s;
      return s + Math.min(...patterns.map((p) => p.length));
    }, 0),
  2: (input: string) =>
    parse(input).reduce((s, { joltages, buttons }) => {
      const cache = new Map<string, number>();

      const solve = (target: number[]): number => {
        if (target.every((t) => !t)) return 0;
        const key = target.join(",");
        if (cache.has(key)) return cache.get(key)!;

        const parity = target.map((t) => t & 1);
        const patterns = findXorPatterns(parity, buttons);
        let min = Infinity;

        for (const pressed of patterns) {
          const remaining = [...target];
          for (const btn of pressed) btn.forEach((b) => remaining[b]!--);
          if (remaining.some((r) => r < 0)) continue;
          const half = remaining.map((r) => r >> 1);
          min = Math.min(min, pressed.length + 2 * solve(half));
        }

        cache.set(key, min);
        return min;
      };

      return s + solve(joltages);
    }, 0),
} satisfies Day;
