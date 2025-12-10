import type { Day } from "../runner.ts";

type Tile = [x: number, y: number];

const parse = (input: string): Tile[] =>
  Array.from(input.matchAll(/(\d+),(\d+)/g)).map(([, x, y]) => [+x!, +y!]);

const area = ([x1, y1]: Tile, [x2, y2]: Tile) => (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);

const isInsidePolygon = ([x, y]: Tile, redTiles: Tile[]) => {
  let crossings = 0;
  for (let i = 0; i < redTiles.length; ) {
    const [x1, y1] = redTiles[i]!;
    const [x2, y2] = redTiles[++i % redTiles.length]!;
    if (y1 === y2) continue;
    const [yMin, yMax] = y1 < y2 ? [y1, y2] : [y2, y1];
    if (y < yMin || y >= yMax) continue;
    const xInt = x1 + ((y - y1) * (x2 - x1)) / (y2 - y1);
    if (xInt > x) crossings++;
  }
  return crossings % 2 === 1;
};

const isOnBoundary = ([x, y]: Tile, redTiles: Tile[]) => {
  for (let i = 0; i < redTiles.length; ) {
    const [x1, y1] = redTiles[i]!;
    const [x2, y2] = redTiles[++i % redTiles.length]!;
    if (x1 === x2 && x === x1) {
      const [yMin, yMax] = y1 < y2 ? [y1, y2] : [y2, y1];
      if (y >= yMin && y <= yMax) return true;
    }
    if (y1 === y2 && y === y1) {
      const [xMin, xMax] = x1 < x2 ? [x1, x2] : [x2, x1];
      if (x >= xMin && x <= xMax) return true;
    }
  }
  return false;
};

const isValid = (tile: Tile, redTiles: Tile[]) =>
  isOnBoundary(tile, redTiles) || isInsidePolygon(tile, redTiles);

// Check if a boundary segment cuts through the rectangle interior
const segmentCutsRect = ([rx1, ry1]: Tile, [rx2, ry2]: Tile, redTiles: Tile[]) => {
  const [minX, maxX] = rx1 < rx2 ? [rx1, rx2] : [rx2, rx1];
  const [minY, maxY] = ry1 < ry2 ? [ry1, ry2] : [ry2, ry1];

  for (let i = 0; i < redTiles.length; ) {
    const [x1, y1] = redTiles[i]!;
    const [x2, y2] = redTiles[++i % redTiles.length]!;

    // Vertical segment
    if (x1 === x2 && x1 > minX && x1 < maxX) {
      const [segMinY, segMaxY] = y1 < y2 ? [y1, y2] : [y2, y1];
      if (segMinY < maxY && segMaxY > minY) return true;
    }
    // Horizontal segment
    if (y1 === y2 && y1 > minY && y1 < maxY) {
      const [segMinX, segMaxX] = x1 < x2 ? [x1, x2] : [x2, x1];
      if (segMinX < maxX && segMaxX > minX) return true;
    }
  }
  return false;
};

export default {
  1: (input: string) =>
    parse(input).reduce(
      (max, a, i, tiles) => tiles.slice(i + 1).reduce((m, b) => Math.max(m, area(a, b)), max),
      0
    ),
  2: (input: string) => {
    const redTiles = parse(input);
    return redTiles.reduce(
      (max, [x1, y1], i) =>
        redTiles.slice(i + 1).reduce((m, [x2, y2]) => {
          if (
            !isValid([x1, y2], redTiles) ||
            !isValid([x2, y1], redTiles) ||
            segmentCutsRect([x1, y1], [x2, y2], redTiles)
          )
            return m;
          return Math.max(m, area([x1, y1], [x2, y2]));
        }, max),
      0
    );
  },
} satisfies Day;
