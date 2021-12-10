import { sum } from 'lodash';
import { readFileSync } from 'fs'

function main() {
  const grid: number[][] = getGrid('input');
  const flipped: number[][] = transpose(grid);
  const lowPoints: number[] = [];

  for (let y = 0; y < grid.length; y += 1) {
    for (let x = 0; x < grid[0].length; x += 1) {
      if (isSmallest(x, grid[y]) && isSmallest(y, flipped[x])) {
        lowPoints.push(grid[y][x]);
      }
    }
  }

  console.log(sum(lowPoints.map(n => n + 1)));
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

function getGrid(filename: string): number[][] {
  const s: string = readFileSync(filename, {encoding: 'utf8'});
  return s.split('\n').map(s => s.split('').map(s => parseInt(s)));
}

function transpose(a: any[][]): any[][] {
  return a[0].map((y,i) => a.map(y => y[i]));
}

main();