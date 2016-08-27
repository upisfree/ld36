updateCamera = ->
  p = player

  for i in staticObjects
    i.position.x -= p.distance.x
    i.position.y -= p.distance.y
  
  p.distance.x = 0
  p.distance.y = 0

# export
module.exports = updateCamera