import { readFileSync } from 'fs';
import { sum } from 'lodash';

function main() {
  const data = getData('input');
  const start = Math.min(...data);
  const end = Math.max(...data);
  const pos = getPos(data, start, end);
  console.log(`position ${pos} is cheapest with fuel of ${getFuel(data, pos)}`);
}

function getData(filename: string): number[] {
  const s: string = readFileSync(filename, {encoding: 'utf8'}) 
  return s.split(',').map(s => parseInt(s))
}

function getPos(data: number[], start: number, end: number): number {
  const guess = start + Math.round(Math.abs(start - end) / 2);
  const fuel = getFuel(data, guess);
  const fuelUp = getFuel(data, guess + 1);
  const fuelDown = getFuel(data, guess - 1);
  if (fuel < fuelUp && fuel < fuelDown) {
    return guess;
  } else if (fuel < fuelUp) {
    return getPos(data, start, guess);
  } else {
    return getPos(data, guess, end);
  }
}

function getFuel(data: number[], guess: number) {
  return sum(data.map(n => Math.abs(n - guess)))
}

main();