#!/usr/bin/env ruby

prev = nil
larger = 0

File.foreach('input') do |line| 
  curr = Integer(line)
  if prev != nil and prev < curr
    larger += 1
  end
  prev = curr
end

puts larger
  

