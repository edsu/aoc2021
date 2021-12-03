import { createReadStream } from 'fs'
import { createInterface } from 'readline'

class Submarine {

  increased: number;
  previous: number;

  constructor() {
    this.increased = 0;
    this.previous = 0;
  }

  move(n: number) {
    if (this.previous && n > this.previous) {
      this.increased += 1;
    }
    this.previous = n;
  }

}

const sub = new Submarine();

const data = createInterface({input: createReadStream('./input')});
data.on('line', line => sub.move(parseInt(line)));
data.on('close', () => console.log(sub.increased));