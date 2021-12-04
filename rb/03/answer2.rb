#!/usr/bin/env ruby

def main() 
  table = get_table('input')
  p(oxygen(table) * c02(table))
end

def get_table(filename)
  return File.foreach(filename).map { |line| 
    line.chomp.split('').map(&:to_i)
  }
end

def oxygen(table)
  return filter(table, 'oxygen')
end

def c02(table)
  return filter(table, 'c02')
end

def filter(table, type, pos=0)
  return table[0].join().to_i(2) if table.length == 1

  if type == 'oxygen'
    n = most_common(table.transpose[pos])
  else 
    n = least_common(table.transpose[pos])
  end

  table = table.select do |row|
    row[pos] == n
  end

  return filter(table, type, pos + 1)
end

def most_common(arr)
  ratio = arr.count(1) / arr.length.to_f
  return ratio < 0.5 ? 0 : 1
end

def least_common(arr)
  return most_common(arr) == 1 ? 0 : 1
end

main()