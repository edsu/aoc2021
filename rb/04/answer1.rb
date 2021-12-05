class Game

  def initialize(filename)
    @numbers = nil
    @boards = []
    board = nil

    File.foreach(filename, chomp: true) do |line|
      if @numbers.nil?
        @numbers = line.split(',').map(&:to_i)
      elsif line == ""
        if board.nil? 
          board = Board.new
        else
          @boards << board
          board = Board.new
        end
      else
        board.add_row(line.strip.split(/ +/).map(&:to_i))
      end
    end
    @boards << board
  end

  def play 
    @numbers.each do |n|
      @boards.each do |board|
        board.play(n)
        if board.winner?
          return board
        end
      end
    end
    return nil
  end

end


class Board

  def initialize()
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

    @played.transpose.each do |row|
      if row.sum == 5
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

game = Game.new('input')
board = game.play
p board.score
