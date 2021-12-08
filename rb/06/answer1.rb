def main()
  ocean = Ocean.new
  ocean.load('input')
  ocean.run(80)
  puts "#{ocean.fishes.length} fishes!"
end

class Ocean
  attr_reader :fishes

  def initialize()
    @fishes = []
  end 

  def load(filename)
    @fishes = File
                .open(filename)
                .readline
                .chomp
                .split(',')
                .map(&:to_i)
                .map { |age| Fish.new(age) }
  end

  def run(days)
    for n in 1..days
      new_fishes = []
      for fish in @fishes
        new_fishes << fish.live
      end
      # puts "%2d #{@fishes.length}" % n
      @fishes.concat(new_fishes.reject(&:nil?))
    end
  end

end

class Fish
  attr_reader :age

  def initialize(age)
    @age = age
  end

  def live()
    if @age == 0
      @age = 6
      return Fish.new(8)
    else
      @age -= 1
      return nil
    end
  end

end


main()