# note: I'm not at all happy with the readability of this & am struggling to keep up!

require 'set'

def decode(displays) 
  numbers = {}
  while true
    for display in displays
      case display.length
      when 2
        numbers['1'] = display
      when 4
        numbers['4'] = display
      when 5
        if numbers['1'] && display.superset?(numbers['1'])
          numbers['3'] = display
        elsif numbers['4'] && numbers['1'] && display.superset?((numbers['4'] - numbers['1']))
          numbers['5'] = display
        else
          numbers['2'] = display
        end
      when 6
        if numbers['4'] && display.superset?(numbers['4']) 
          numbers['9'] = display
        elsif numbers['4'] && numbers['1'] && display.superset?((numbers['4'] - numbers['1']))
          numbers['6'] = display
        else
          numbers['0'] = display
        end
      when 3
        numbers['7'] = display
      when 7
        numbers['8'] = display
      end
    end
    break if numbers.length == 10
  end
  return numbers.invert
end

data = File
        .foreach('input')
        .map do |line| 
          row = line.chomp.split(' | ')
          [row[0].split(' ').map {|d| Set.new(d.split(''))}, row[1].split(' ')]
        end

sum = 0
for row in data
  codes = decode(row[0])
  s = ''
  for display in row[1]
    s += codes[Set.new(display.split(''))]
  end
  sum += s.to_i
end

p sum