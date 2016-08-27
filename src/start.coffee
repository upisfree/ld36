# please delete me
# skuratovcoffeescript
# code below was written by girl
# where is my book, bitch?
Player = require './player'
Rock = require './rock'
window.staticObjects = []
w = window.innerWidth
h = window.innerHeight
updateCamera = require './updateCamera'

renderer = new PIXI.WebGLRenderer w, h
document.body.appendChild renderer.view

window.stage = new PIXI.Container()


# collision = ->
#   p = player

#   for o in staticObjects
#     x = o.position.x - p.x
    
#     if x > -o.width / 2 && x < o.width / 2
#       y = o.position.y - p.y
      
#       if y > -o.height / 2 && y < p.texture.height / 2
#         console.log 'collision'


collision = ->
  p = player.texture
  px = p.position.x
  py = p.position.y
  pw = p.width
  ph = p.height

  for o in staticObjects
    ox = o.position.x
    oy = o.position.y
    ow = o.width
    oh = o.height

    if ((px < ox + ow && px + pw > ox + ow) || (px < ox && px + pw > ox)) &&
       ((py < oy && oy < py + ph) || (py + ph > oy + oh && py < oy + oh))
      console.log 'collision'

rock0 = new Rock 50, 50, 0
rock1 = new Rock 50, 700, 1
rock2 = new Rock 900, 50, 2
rock3 = new Rock 900, 700, 3

window.player = new Player w / 2, h / 2

# collision = ->
#   bbb = new Bump PIXI
#   p = player

#   for o in staticObjects
#     console.log bbb.contain p.texture, {x:o.position.x, y: o.position.y, width: o.width, height: o.height}
#     # console.log p.texture.position.x, o.position.x, p.texture.position.y, o.position.y
#     # console.log b.hitTestPoint p.texture.position, o.position, false, false, true
#     # console.log b.hit p.texture, o, false, false, true

animate = ->
  requestAnimationFrame animate

  if player.texture
    collision()

    updateCamera()

  renderer.render stage

animate()