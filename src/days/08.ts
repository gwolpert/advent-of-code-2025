import type { Day } from "../runner.ts";

type Junction = readonly [number, number, number];
type Connection = [distance: number, a: number, b: number];

const distance = (a: Junction, b: Junction) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

export const parse = (input: string) => {
  const junctions = Array.from(input.matchAll(/(\d+),(\d+),(\d+)/g)).map(
    ([, x, y, z]): Junction => [+x!, +y!, +z!]
  );
  const connections = junctions
    .flatMap((p, i) => {
      const leftOver = junctions.slice(i + 1);
      return leftOver.map((q, j): Connection => [distance(p, q), i, i + j + 1]);
    })
    .sort(([distanceA], [distanceB]) => distanceA! - distanceB!);

  const circuitOf = junctions.map((_, i) => i);
  const findRoot = (junction: number): number => {
    const parent = circuitOf[junction]!;
    if (parent === junction) return junction;
    const root = findRoot(parent);
    circuitOf[junction] = root;
    return root;
  };
  return { junctions, connections, circuitOf, findRoot };
};

export default {
  1: (input: string) => {
    const { circuitOf, connections, findRoot } = parse(input);
    connections.slice(0, 1000).forEach(([, a, b]) => (circuitOf[findRoot(a)] = findRoot(b)));
    const sizes: Record<number, number> = {};
    circuitOf.forEach((_, i) => {
      const root = findRoot(i);
      sizes[root] ??= 0;
      sizes[root]++;
    });
    return Object.values(sizes)
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((a, b) => a * b);
  },
  2: (input: string) => {
    const { junctions, connections, circuitOf, findRoot } = parse(input);
    let circuitCount = junctions.length;
    for (const [, a, b] of connections) {
      if (findRoot(a) === findRoot(b)) continue;
      circuitOf[findRoot(a)] = findRoot(b);
      if (--circuitCount !== 1) continue;
      const [distanceA] = junctions[a]!;
      const [distanceB] = junctions[b]!;
      return distanceA * distanceB;
    }
    return 0;
  },
} satisfies Day;
