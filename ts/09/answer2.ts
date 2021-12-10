import { readFileSync } from 'fs'

type Basin = Point[];

class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  equals(p: Point) {
    return this.x == p.x && this.y == p.y
  }
}

function main() {

  // get the map
  const map: number[][] = getMap('input');

  // get the low points in the map
  const lowPoints = getLowPoints(map);

  // examine each low point to get the extent of the basin it's a part of
  const basins = []
  for (const point of lowPoints) {
    basins.push(getBasin(map, point))
  }

  // output the score!
  console.log(score(basins));
}

function getMap(filename: string): number[][] {
  const s: string = readFileSync(filename, {encoding: 'utf8'});
  return s.split('\n').map(s => s.split('').map(s => parseInt(s)));
}

function getLowPoints(map: number[][]): Point[] {
  const flipped: number[][] = transpose(map);
  const lowPoints: Point[] = [];
  for (let y = 0; y < map.length; y += 1) {
    for (let x = 0; x < map[0].length; x += 1) {
      if (isSmallest(x, map[y]) && isSmallest(y, flipped[x])) {
        lowPoints.push(new Point(x, y));
      }
    }
  }
  return lowPoints;
}

function isSmallest(i: number, map: number[]) {
  if (i > 0 && i < map.length - 1) {
    return (map[i] < map[i - 1]) && (map[i] < map[i + 1]);
  } else if (i == 0) {
    return map[i] < map[i + 1];
  } else {
    return map[i] < map[i - 1];
  }
}

function getBasin(map: number[][], p: Point): Basin {
  const basin: Basin = [];
  walkBasin(map, p, basin);
  return basin;
}

function walkBasin(map: number[][], p: Point, basin: Basin): void {
  // we've been here before
  if (basin.find(e => e.equals(p))) return

  // found a ridge
  if (map[p.y][p.x] == 9) return 

  // ok we found part of the basin
  basin.push(p);

  // walk left
  if (p.x > 0) walkBasin(map, new Point(p.x - 1, p.y), basin);

  // walk right
  if (p.x < map[0].length - 1) walkBasin(map, new Point(p.x + 1, p.y), basin);

  // walk down
  if (p.y > 0) walkBasin(map, new Point(p.x, p.y - 1), basin);

  // walk up
  if (p.y < map.length - 1) walkBasin(map, new Point(p.x, p.y + 1), basin)
} 

function score(basins: Basin[]) {
  const s = basins.sort((a, b) => b.length - a.length);
  return s[0].length * s[1].length * s[2].length;
}

function transpose(a: any[][]): any[][] {
  return a[0].map((y,i) => a.map(y => y[i]));
}

main();