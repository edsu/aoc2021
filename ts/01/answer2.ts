import { createReadStream } from 'fs'
import { createInterface } from 'readline'

class Counter {

  window: number[] = [];
  increased = 0

  count(n: number) {
    this.window.push(n)
    if (this.window.length == 4) {
      if (sum(this.window.slice(1, 4)) > sum(this.window.slice(0, 3))) {
        this.increased += 1
      }
      this.window.shift()
    }
  }

}

function sum(l: number[]): number {
  return l.reduce((a, b) => {return a + b}, 0)
}

const counter = new Counter()
const data = createInterface({input: createReadStream('./input')});
data.on('line', line => counter.count(parseInt(line)));
data.on('close', () => console.log(counter.increased));