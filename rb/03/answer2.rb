#!/usr/bin/env ruby

def get_table(filename)
  table = []
  File.foreach(filename) do |line|
    table.push(line.chomp().split('').map(&:to_i))
  end
  return table
end

def most_common(arr)
  ratio = arr.count(1) / arr.length.to_f
  return ratio < 0.5 ? 0 : 1
end

def least_common(arr)
  return most_common(arr) == 1 ? 0 : 1
end

def filter(table, pos, type)
  return table[0].join().to_i(2) if table.length == 1

  if type == 'oxygen'
    n = most_common(table.transpose[pos])
  else 
    n = least_common(table.transpose[pos])
  end

  table = table.select do |row|
    row[pos] == n
  end

  return filter(table, pos + 1, type)
end

def oxygen(table)
  return filter(table, 0, 'oxygen')
end

def c02(table)
  return filter(table, 0, 'c02')
end

table = get_table('input')
p(oxygen(table) * c02(table))