import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { range, zip } from 'lodash';

async function main() {
  const grid = new Grid();
  await grid.load('input');
  console.log(grid.toString())
  console.log(`\n${grid.overlappingPoints()} overlapping points.`)
}

class Grid {
  cols: number[][];

  constructor() {
    this.cols = [];
  }

  async load(filename: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const input = createInterface({input: createReadStream(filename)});
      input.on('line', (s: string) => {
        const line = new Line(s)
        for (const point of line.points()) {
          if (this.cols[point.x] === undefined) {
            this.cols[point.x] = []
          }
          if (this.cols[point.x][point.y] === undefined) {
            this.cols[point.x][point.y] = 1
          } else {
            this.cols[point.x][point.y] += 1
          }
        }
      });

      input.on('close', () => resolve(true));
    })
  }

  overlappingPoints() {
    let probs = 0;
    for (const row of this.getMatrix()) {
      for (const cell of row) {
        if (cell > 1) probs += 1;
      }
    }
    return probs;
  }

  getMatrix(): number[][] {
    const rows: number[][] = [];
    const maxX = this.cols.length - 1;
    const maxY = Math.max(...this.cols.map(row => row.length - 1).filter(Number.isFinite));

    for (let y=0; y <= maxY; y += 1) {
      const row = []
      for (let x=0; x <= maxX; x += 1) {
        row[x] = this.cols[x] && this.cols[x][y] ? this.cols[x][y] : 0;
      }
      rows.push(row)
    }

    return rows
  }

  toString(): string {
    let s = ''
    for (const row of this.getMatrix()) {
      for (const cell of row) {
        s += `${cell == 0 ? '.' : cell}`;
      }
      s += '\n'
    }
    return s
  }

}

class Line {
  point1: Point;
  point2: Point;

  constructor(s: string) {
    const parts = s.split(' -> ')
    this.point1 = new Point(parts[0].split(',').map(s => parseInt(s)));
    this.point2 = new Point(parts[1].split(',').map(s => parseInt(s)));
  }

  points(): Point[] {
    let points = []
    if (this.horizontal()) {
      return irange(this.point1.x, this.point2.x)
        .map(x => new Point([x, this.point1.y]));
    } else if (this.vertical()) {
      return irange(this.point1.y, this.point2.y)
        .map(y => new Point([this.point1.x, y]))
    } else {
      const xs: number[] = irange(this.point1.x, this.point2.x);
      const ys: number[] = irange(this.point1.y, this.point2.y);
      points = zip(xs, ys).map(coord => new Point(coord));
    }
    return points;
  }

  toString() {
    return `${this.point1} -> ${this.point2}`
  }

  horizontal(): boolean {
    return this.point1.y == this.point2.y;
  }

  vertical(): boolean {
    return this.point1.x == this.point2.x;
  }

}

class Point {
  x: number;
  y: number;

  constructor(coords: any[]) {
    this.x = coords[0];
    this.y = coords[1];
  }

  toString() {
    return `${this.x},${this.y}`
  }

}

function irange(i: number, j: number): number[] {
  if (i < j) {
    return range(i, j + 1);
  } else if (i > j) {
    return range(i, j - 1);
  } else {
    return [i]
  }
}

main();
