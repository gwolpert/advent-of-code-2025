import type { Day } from "../runner.ts";

const parse = (input: string): Map<string, string[]> => {
  const graph = new Map<string, string[]>();
  for (const match of input.matchAll(/(\w+): (.+)/g)) {
    graph.set(match[1]!, match[2]!.split(" "));
  }
  return graph;
};

const countPaths = (graph: Map<string, string[]>, node: string): number => {
  if (node === "out") return 1;
  const neighbors = graph.get(node);
  if (!neighbors) return 0;
  return neighbors.reduce((sum, next) => sum + countPaths(graph, next), 0);
};

type State = { node: string; count: number; dac: boolean; fft: boolean };

const countPathsWithRequired = (graph: Map<string, string[]>): number => {
  let states: State[] = [{ node: "svr", count: 1, dac: false, fft: false }];
  let total = 0;

  while (states.length > 0) {
    total += states
      .filter((s) => s.node === "out" && s.dac && s.fft)
      .reduce((sum, s) => sum + s.count, 0);

    const next: State[] = [];
    for (const s of states.filter((s) => s.node !== "out")) {
      const dac = s.dac || s.node === "dac";
      const fft = s.fft || s.node === "fft";
      for (const neighbor of graph.get(s.node) ?? []) {
        const existing = next.find((n) => n.node === neighbor && n.dac === dac && n.fft === fft);
        if (existing) existing.count += s.count;
        else next.push({ node: neighbor, count: s.count, dac, fft });
      }
    }
    states = next;
  }
  return total;
};

export default {
  1: (input: string) => {
    const graph = parse(input);
    return countPaths(graph, "you");
  },
  2: (input: string) => {
    const graph = parse(input);
    return countPathsWithRequired(graph);
  },
} satisfies Day;
