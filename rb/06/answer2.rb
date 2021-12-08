def main()
  o = Ocean.new
  o.load('input')
  o.run(256)
  puts "#{o.fishes} fishes!"
end

class Ocean 

  def initialize()
    @ages = Array.new(9, 0)
  end 

  def fishes()
    return @ages.sum
  end

  def load(filename)
    fishes = File
               .open(filename)
               .readline
               .chomp
               .split(',')
               .map(&:to_i)

    for f in fishes
      @ages[f] += 1
    end
  end

  def run(days)
    for n in 1..days do
      new_fish = @ages.shift
      @ages[6] += new_fish
      @ages.push(new_fish)
    end
  end

end

main()