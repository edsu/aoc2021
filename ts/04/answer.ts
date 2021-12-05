import { createReadStream } from 'fs'
import { createInterface } from 'readline'

async function main() {
  const game = new Game();
  await game.load('input');
  game.play()
}

class Game {
  numbers: number[] = [];
  boards: Board[] = [];

  async load(filename: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const input = createInterface({input: createReadStream(filename)});
      input.on('line', (line: string) => {
        if (this.numbers.length == 0) {
          this.numbers = line.split(',').map(s => parseInt(s));
        } else if (line == '') {
          this.boards.push(new Board(this.boards.length + 1));
        } else {
          const board = this.boards[this.boards.length - 1]
          board.add_row(line.trim().split(/ +/).map(s => new Square(parseInt(s))));
        }
      })
      input.on('close', () => resolve(true));
    })
  }

  play() {
    const winners: Board[] = []
    for (const number of this.numbers) {
      console.log(`playing ${number}`);
      for (const board of this.boards) {
        board.play(number);
        if (board.winner() && winners.indexOf(board) == -1) {
          console.log(`board ${board.id} won! score=${board.score()}`)
          console.log(board.toString())
          winners.push(board)
        }
      }
      if (winners.length == this.boards.length) {
        console.log('everyone won')
        break
      }
    }
  }

}

class Board {
  id: number
  squares: Square[][];
  lastPlayed: number;

  constructor(id: number) {
    this.id = id;
    this.squares = []
    this.lastPlayed = 0
  }

  add_row(row: Square[]) {
    this.squares.push(row);
  }

  play(n: number): void {
    this.lastPlayed = n
    this.squares.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell.n == n) {
          cell.played = true
        }
      })
    })
  }

  winner(): boolean {
    for (const row of this.squares) {
      if (row.filter(c => c.played).length == 5) {
        return true
      }
    }
    for (const col of transpose(this.squares)) {
      if (col.filter(c => c.played).length == 5) {
        return true
      }
    }
    return false
  }

  score() {
    let sum = 0;
    for (const row of this.squares) {
      for (const square of row) {
        if (! square.played) {
          sum += square.n;
        }
      }
    }
    return this.lastPlayed * sum;
  }

  toString() {
    let text = ''
    for (const row of this.squares) {
      for (const square of row) {
        text += square.toString()
      }
      text += "\n"
    }
    return text
  }
}

class Square {
  n: number;
  played: boolean;

  constructor(n: number) {
    this.n = n
    this.played = false
  }

  toString(): string {
    const s = `${this.n}${this.played ? '+' : '-'}`;
    return '<' + ' '.repeat(3 - s.length) + s + '> '
  }
}

function transpose(a: any[][]): any[][] {
  return a[0].map((x,i) => a.map(x => x[i]));
}

function sum(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0);
}

main()