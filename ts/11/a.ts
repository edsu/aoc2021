import { readFileSync } from 'fs'

type Grid = number[][];

interface Cell {
  x: number;
  y: number;
}

function main() {
  const grid: Grid = getGrid('test');
  console.log(step(grid));
  console.log(step(grid));
}

function step(grid: Grid): Grid {
  walkGrid(grid, cell => {
    increment(grid, cell);
  })
  resetFlashed(grid);
  return grid;
}

function increment(grid: Grid, cell: Cell) {
  console.log(cell);

  if (cell.y < 0 || cell.y > grid.length || cell.x < 0 || cell.x > grid[0].length) {
    console.log('stopping');
    return
  }

  const value = grid[cell.y][cell.x];
  if (value == -1) {
    console.log('stopping2');
    return
  } else if (value == 9) {
    grid[cell.y][cell.x] = -1;
    for (let y = cell.y - 1; y < cell.y + 1; y += 1) {
      for (let x = cell.x - 1; x = cell.x + 1; x += 1) {
        increment(grid, {y, x});
      }
    }
  } else if (value != -1) {
    grid[cell.y][cell.x] += 1;
  }
}

function getGrid(filename: string): number[][] {
  const s: string = readFileSync(filename, {encoding: 'utf8'}).trim();
  return s.split('\n').map(s => s.split('').map(s => parseInt(s)));
}

function resetFlashed(grid: Grid) {
  walkGrid(grid, (cell: Cell) => {
    if (grid[cell.y][cell.x] == -1) {
      console.log(`found flashed ${cell.x},${cell.y}`)
      grid[cell.y][cell.x] = 0;
    }
  });
}

function walkGrid(grid: Grid, f: (c: Cell) => any): any  {
  for (let rowNum = 0; rowNum < grid.length; rowNum += 1) {
    for (let colNum = 0; colNum < grid[0].length; colNum += 1) {
      f({
        x: colNum,
        y: rowNum,
      })
    }
  }
}
 
main();