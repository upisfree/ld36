Baby = require './npc/baby'
Girl = require './npc/girl'

r = (min, max) ->
  return Math.floor(Math.random() * (max - min) + min)

generate = ->
  m = 2500

  if Math.random() > 0.5
    new Baby r(m * -1, m), r(m * -1, m)
  else
    new Girl r(m * -1, m), r(m * -1, m)  

# export
module.exports = generate