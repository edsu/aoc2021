require 'rgl/adjacency'

def main
  filename = ARGV[0] || 'input'

  g = get_graph(filename)

  total_paths = []

  small_caves = g.each_vertex.select do |v| 
    v.downcase == v && v != 'start' && v != 'end'
  end

  for small_cave in small_caves do
    for path in walk(g, small_cave) do
      total_paths.push(path) unless total_paths.include?(path)
    end
  end

  p total_paths.select {|path| path[-1] == 'end'}.length
end

def walk(g, twice, paths=[['start']])
  new_paths = []
  found_new = false
  for path in paths
    v = path[-1]
    if v == 'end' || v == 'dead-end'
      new_paths.push(path)
    else
      g.each_adjacent(v) do |a|
        if a.upcase == a || ! path.include?(a) || (a == twice && path.count(a) == 1)
          new_path = path + [a]
          unless paths.include?(new_path)
            found_new = true
            new_paths.push(new_path)
          end
        else
          new_paths.push(path + ['dead-end'])
        end
      end
    end
  end

  return found_new ? walk(g, twice, new_paths) : paths
end

def get_graph(filename)
  g = RGL::AdjacencyGraph.new
  File.foreach(filename) do |line| 
    parts = line.chomp.split('-')
    g.add_edge(*parts)
  end
  return g
end

main()
