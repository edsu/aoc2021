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
  return filter(table, method(:most_common))
end

def c02(table)
  return filter(table, method(:least_common))
end

def filter(table, criteria, pos=0)
  return table[0].join().to_i(2) if table.length == 1

  n = criteria.call(table.transpose[pos])
  table = table.select { |row| row[pos] == n }

  return filter(table, criteria, pos + 1)
end

def most_common(arr)
  return arr.count(1) / arr.length.to_f < 0.5 ? 0 : 1
end

def least_common(arr)
  return most_common(arr) == 1 ? 0 : 1
end

main()
