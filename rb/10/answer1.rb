OPENING_CHARS = ['[', '(', '{', '<']
CLOSING_CHARS = [']', ')', '}', '>']

def main() 
  score = 0
  get_lines('input').each do |line| 
    ch = get_corrupted(line)
    score += points(ch) if ch != nil
  end
  puts "score: #{score}"
end

def get_lines(filename)
  File.foreach(filename).map do |line|
    line.chomp.split('')
  end
end

def get_corrupted(line)
  stack = []
  for ch in line
    if OPENING_CHARS.include?(ch)
      stack.push(ch)
    else
      open_ch = stack.pop
      if ch != closing_char(open_ch)
        return ch
      end
    end
  end
  return nil
end

def closing_char(ch) 
  return CLOSING_CHARS[OPENING_CHARS.find_index(ch)]
end

def points(ch)
  case ch
  when ')'
    3
  when ']'
    57
  when '}'
    1197
  when '>'
    25137
  end
end

main()
