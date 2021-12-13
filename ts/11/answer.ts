import { readFileSync } from 'fs'

type Grid = number[][];

interface Cell {
  x: number;
  y: number;
}

function main() {
  const grid: Grid = getGrid('test2');
  console.log(step(grid));
  // console.log(step(grid));
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

  if (grid[cell.y][cell.x] != -1) {
    grid[cell.y][cell.x] += 1;
    console.log(`incrementing`, cell, `to`, grid[cell.y][cell.x])
  }

  if (grid[cell.y][cell.x] == 10) {
    console.log(`flash`, cell);
    grid[cell.y][cell.x] = -1;
    for (let y = cell.y - 1; y < cell.y + 1; y += 1) {
      for (let x = cell.x - 1; x < cell.x + 1; x += 1) {
        if (y >= 0 && y < grid.length && x >= 0 && x < grid[0].length) {
          increment(grid, {x, y});
        }
      }
    }
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