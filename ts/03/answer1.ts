import { createReadStream } from 'fs'
import { createInterface } from 'readline'

type Table = number[][]

async function main() {
  const table = await getTable('input')
  console.log(power(table))
}

function power(table: Table): number {
  const gamma: number[] = transpose(table).map(row => (
    sum(row) / row.length > 0.5 ? 1 : 0
  ))
  const epsilon = gamma.map(n => n == 1 ? 0 : 1)
  return binary(gamma) * binary(epsilon)
}

async function getTable(filename: string): Promise<Table> {
  const t: Table = new Array()
  return new Promise((resolve, reject) => {
    const input = createInterface({input: createReadStream(filename)});
    input.on('line', line => {
      t.push(line.split('').map(s => parseInt(s)))
    })
    input.on('close', () => resolve(t));
  })
}

function transpose(t: Table): Table {
 return t[0].map((x,i) => t.map(x => x[i]))
}

function sum(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0)
}

function binary(s: number[]): number {
  return parseInt(s.join(''), 2) 
}

main()