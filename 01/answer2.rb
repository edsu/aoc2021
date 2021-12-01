#!/usr/bin/env ruby

window = []
larger = 0

File.foreach('input') do |line| 
  window.push(Integer(line))
  if window.length == 4
    if window[0..2].sum < window[1..3].sum
      larger += 1
    end
    window.shift
  end
end

puts larger
