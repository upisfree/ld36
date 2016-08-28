Baby = require './npc/baby'
Girl = require './npc/girl'

r = (min, max) ->
  return Math.floor(Math.random() * (max - min) + min)

generate = (first = false, x, y) ->
  if x and y
    for i in [0..4]
      if Math.random() > 0.5
        new Baby x, y
      else
        new Girl x, y
  else
    m = 2000

    for i in [0..4]
      if Math.random() > 0.5
        new Baby r(m * -1, m), r(m * -1, m)
      else
        new Girl r(m * -1, m), r(m * -1, m)

# export
module.exports = generate