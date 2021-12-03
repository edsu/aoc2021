import { createReadStream } from 'fs'
import { createInterface } from 'readline'

class Submarine {
  horizontal = 0
  depth = 0

  forward(n: number) {
    this.horizontal += n
  }

  up(n: number) {
    this.depth -= n
  }

  down(n: number) {
    this.depth += n
  }

  result(): number {
    return this.depth * this.horizontal
  }

}

const sub = new Submarine();
const data = createInterface({input: createReadStream('./input')});

data.on('line', line => {
  const parts = line.split(' ')
  const cmd = parts[0]
  const n = parseInt(parts[1])
  if (cmd == "forward") sub.forward(n)
  else if (cmd == "up") sub.up(n)
  else if (cmd == "down") sub.down(n)
})

data.on('close', () => console.log(sub.result()));