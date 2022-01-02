# frozen_string_literal: true

OPENING_CHARS = ['[', '(', '{', '<'].freeze
CLOSING_CHARS = [']', ')', '}', '>'].freeze

def main
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
  line.each do |ch|
    if OPENING_CHARS.include?(ch)
      stack.push(ch)
    else
      open_ch = stack.pop
      return nil if ch != closing_char(open_ch)
    end
  end
  stack.map { |c| closing_char(c) }.reverse
end

def closing_char(char)
  CLOSING_CHARS[OPENING_CHARS.find_index(char)]
end

def get_score(chars)
  score = 0
  chars.each do |ch|
    score = score * 5 + char_points(ch)
  end
  score
end

def char_points(char)
  { ')': 1, ']': 2, '}': 3, '>': 4 }[char]
end

main
