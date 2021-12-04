#!/usr/bin/env ruby

def get_table(filename)
  table = []
  File.foreach(filename) do |line|
    table.push(line.chomp().split(''))
  end
  return table
end

def power(table)
  gamma = table.transpose.map do |row| 
    row.map(&:to_f).sum / row.length > 0.5 ? '1' : '0'
  end
  epsilon = gamma.map {|e| e == '1' ? '0' : '1'}
  return gamma.join('').to_i(2) * epsilon.join('').to_i(2)
end

p(power(get_table('input')))