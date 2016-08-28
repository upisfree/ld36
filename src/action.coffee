generate = require './generate'

action = (o) ->
  if not o.isUsed
    switch o.type
      when 'girl'
        temperature -= 50
      when 'baby'
        temperature -= 25

  if o.type isnt 'snow'
    o.texture.alpha = 0

    o.isUsed = true
    o.sound.pause()

    # alert 'Вообще, ты выиграл. Но если хочешь, поищи еще младенцев в снегу :3'

    # generate(false)

# export
module.exports = action