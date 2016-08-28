updateSounds = ->
  p = player

  mul = 2

  for i in staticSounds
    # относительно холста
    i.x -= p.distance.x
    i.y -= p.distance.y

    # относительно звука
    pos = i.sound.pos()

    x = i.x / window.w * mul
    y = i.y / window.h * mul

    if not isNaN(x) and not isNaN(y)
      i.sound.pos x, y, 0

  # обнулять distance не надо, т.к. обнуляем в updateCamera

# export
module.exports = updateSounds