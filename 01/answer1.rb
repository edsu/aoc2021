#!/usr/bin/env ruby

prev = nil
larger = 0

File.foreach('input') do |line| 
  curr = line.to_i
  if prev != nil && prev < curr
    larger += 1
  end
  prev = curr
end

puts larger
