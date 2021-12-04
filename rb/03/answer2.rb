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
  # if there's only one row in the table return it converted to an integer
  return table[0].join().to_i(2) if table.length == 1

  # find the bit criteria at the given position to filter by
  n = criteria.call(table.transpose[pos])

  # remove any rows that don't match our criteria at the given position
  table = table.select { |row| row[pos] == n }

  # return the result of filtering the table based on the next position
  return filter(table, criteria, pos + 1)
end

def most_common(arr)
  return arr.count(1) / arr.length.to_f < 0.5 ? 0 : 1
end

def least_common(arr)
  return most_common(arr) == 1 ? 0 : 1
end

main()