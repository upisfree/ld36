generate = require './generate'

action = (o) ->
  if not o.isUsed
    switch o.type
      when 'girl'
        temperature -= 50
      when 'baby'
        temperature -= 25

  if o.type isnt 'snow'
    o.texture.alpha = 0.5

    o.isUsed = true
    o.sound.pause()

    generate()

# export
module.exports = action