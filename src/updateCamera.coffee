updateCamera = ->
  p = player

  for i in staticObjects
    i.texture.position.x -= p.distance.x
    i.texture.position.y -= p.distance.y
  
  p.distance.x = 0
  p.distance.y = 0

# export
module.exports = updateCamera