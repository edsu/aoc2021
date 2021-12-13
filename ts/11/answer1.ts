import { readFileSync } from 'fs'

type Grid = number[][];

interface Cell {
  x: number;
  y: number;
  value: number;
}

function main() {
  const grid: Grid = getGrid('test');
  console.log(step(grid));
  console.log(step(grid));
}

function step(grid: Grid): Grid {
  // add one to every cell in the grid
  incrementGrid(grid);

  return grid;
}

function incrementGrid(grid: Grid) {
  walkGrid(grid, cell => {
    grid[cell.y][cell.x] += 1;
    flash(grid, cell);
  })
  resetFlashed(grid);
  return grid;
}

function flash(grid: Grid, cell: Cell): boolean {
  if (grid[cell.y][cell.x] == 10) {
    console.log(`flashed ${colNum},${rowNum}`)
    grid[cell.y][cell.x] = 11;
    for (let y = cell.y - 1; y <= cell.y; y += 1) {
      for (let x = cell.x - 1; x <= cell.x; x += 1) {
        if (y >= 0 && y < grid.length && x >= 0 && x < grid[0].length) {
          flash(grid, {y, x});
        }
      }
    }
    return true;
  } else {
    return false
  }
}

function getGrid(filename: string): number[][] {
  const s: string = readFileSync(filename, {encoding: 'utf8'}).trim();
  return s.split('\n').map(s => s.split('').map(s => parseInt(s)));
}

function resetFlashed(grid: Grid) {
  walkGrid(grid, (cell: Cell) => {
    if (cell.value > 9) {
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
        value: grid[rowNum][colNum]
      })
    }
  }
}
 
main();