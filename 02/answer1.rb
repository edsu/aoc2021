#!/usr/bin/env ruby

horiz = 0
depth = 0

File.foreach('input') do |line| 
  
  cmd, n = line.split(' ')
  n = Integer(n)

  case cmd
  when "forward"
    horiz += n
  when "up"
    depth -= n
  when "down"
    depth += n
  end

end

puts horiz * depth
