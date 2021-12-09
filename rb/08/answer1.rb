DECODER = {
  2 => 1,
  4 => 4,
  3 => 7,
  7 => 8
}

p(File
  .foreach('input')
  .map {|line| line.chomp.split(' | ')[1] }
  .map {|s| s.split(' ')}
  .flatten
  .map {|s| [s, DECODER.fetch(s.length, 0)] }
  .reject {|n| n[1] == 0}
  .length)