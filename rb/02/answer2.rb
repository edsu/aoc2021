#!/usr/bin/env ruby

horiz = 0
depth = 0
aim = 0

File.foreach('input') do |line| 
  
  cmd, n = line.split(' ')
  n = Integer(n)

  case cmd
  when "forward"
    horiz += n
    depth += n * aim
  when "up"
    aim -= n
  when "down"
    aim += n
  end

end

puts horiz * depth
