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

  // get the data
  const grid: number[][] = getGrid('input');

  // get the low points in the grid
  const lowPoints = getLowPoints(grid);

  // examine each low point to get the extent of the basin it's a part of
  const basins = []
  for (const point of lowPoints) {
    basins.push(getBasin(grid, point))
  }

  // output the score!
  console.log(score(basins));
}

function getGrid(filename: string): number[][] {
  const s: string = readFileSync(filename, {encoding: 'utf8'});
  return s.split('\n').map(s => s.split('').map(s => parseInt(s)));
}

function getLowPoints(grid: number[][]): Point[] {
  const flipped: number[][] = transpose(grid);
  const lowPoints: Point[] = [];
  for (let y = 0; y < grid.length; y += 1) {
    for (let x = 0; x < grid[0].length; x += 1) {
      if (isSmallest(x, grid[y]) && isSmallest(y, flipped[x])) {
        lowPoints.push(new Point(x, y));
      }
    }
  }
  return lowPoints;
}

function isSmallest(i: number, data: number[]) {
  if (i > 0 && i < data.length - 1) {
    return (data[i] < data[i - 1]) && (data[i] < data[i + 1]);
  } else if (i == 0) {
    return data[i] < data[i + 1];
  } else {
    return data[i] < data[i - 1];
  }
}

function getBasin(data: number[][], p: Point): Basin {
  const basin: Basin = [];
  walkBasin(data, p, basin);
  return basin;
}

function walkBasin(data: number[][], p: Point, basin: Basin): void {
  // we've been here before
  if (basin.find(e => e.equals(p))) return

  // found a ridge
  if (data[p.y][p.x] == 9) return 

  // ok we found part of the basin
  basin.push(p);

  // walk left
  if (p.x > 0) walkBasin(data, new Point(p.x - 1, p.y), basin);

  // walk right
  if (p.x < data[0].length - 1) walkBasin(data, new Point(p.x + 1, p.y), basin);

  // walk down
  if (p.y > 0) walkBasin(data, new Point(p.x, p.y - 1), basin);

  // walk up
  if (p.y < data.length - 1) walkBasin(data, new Point(p.x, p.y + 1), basin)
} 

function score(basins: Basin[]) {
  const s = basins.sort((a, b) => b.length - a.length);
  return s[0].length * s[1].length * s[2].length;
}

function transpose(a: any[][]): any[][] {
  return a[0].map((y,i) => a.map(y => y[i]));
}

main();