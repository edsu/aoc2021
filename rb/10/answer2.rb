OPENING_CHARS = ['[', '(', '{', '<']
CLOSING_CHARS = [']', ')', '}', '>']

def main() 
  scores = []
  get_lines('input').each do |line| 
    compl = completion(line)
    scores << get_score(compl) if compl
  end
  p scores.sort[(scores.length - 1) / 2]
end

def get_lines(filename)
  File.foreach(filename).map do |line|
    line.chomp.split('')
  end
end

def completion(line)
  stack = []
  for ch in line
    if OPENING_CHARS.include?(ch)
      stack.push(ch)
    else
      open_ch = stack.pop
      if ch != closing_char(open_ch)
        return nil
      end
    end
  end
  return stack.map {|ch| closing_char(ch)}.reverse
end

def closing_char(ch) 
  return CLOSING_CHARS[OPENING_CHARS.find_index(ch)]
end

def get_score(chars)
  score = 0
  for ch in chars
    score = score * 5 + char_points(ch)
  end
  return score
end

def char_points(ch)
  case ch
  when ')'
    1
  when ']'
    2 
  when '}'
    3
  when '>'
    4
  end
end

main()