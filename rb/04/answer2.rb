class Game
  attr_reader :boards
  attr_reader :numbers

  def initialize
    @numbers = nil
    @boards = []
  end

  def load(filename)
    board = nil
    File.foreach(filename, chomp: true) do |line|
      if @numbers.nil?
        @numbers = line.split(',').map(&:to_i)
      elsif line == ""
        if board.nil? 
          board = Board.new(id=1)
        else
          @boards << board
          board = Board.new(id=@boards.length + 1)
        end
      else
        board.add_row(line.strip.split(/ +/).map(&:to_i))
      end
    end
    @boards << board
  end

  def play 
    winners = []
    @numbers.each do |n|
      puts "draw #{n}"
      @boards.each do |board|
        board.play(n)
        if board.winner? && ! winners.include?(board)
          puts("board #{board.id} won with #{board.score} points")
          winners << board
        end
      end
      if winners.length == @boards.length
        puts "everyone won!"
        break
      end
    end
    return boards - winners
  end

end


class Board
  attr_reader :id

  def initialize(id)
    @id = id 
    @last_play = nil
    @squares = []
    @played = Array.new(5) { Array.new(5, 0) }
  end

  def add_row(row)
    @squares << row
  end

  def play(n)
    @last_play = n
    @squares.each_with_index do |row, i|
      row.each_with_index do |cell, j|
        if @squares[i][j] == n 
          @played[i][j] = 1
        end
      end
    end
  end

  def winner?

    @played.each do |row|
      if row.sum == 5
        return true
      end
    end

    @played.transpose.each do |col|
      if col.sum == 5
        return true
      end
    end

    return false
  end

  def score
    unplayed_sum = 0
    @played.each_with_index do |row, i|
      row.each_with_index do |p, j|
        if p == 0
          unplayed_sum += @squares[i][j]
        end
      end
    end
    return @last_play * unplayed_sum
  end

end

game = Game.new
game.load('input')
remaining_boards = game.play
puts remaining_boards