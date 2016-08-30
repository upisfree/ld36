# please delete me
# skuratovcoffeescript
# code below was written by girl
# where is my book, bitch?
Player = require './player'
window.staticObjects = []
window.staticSounds = []
window.currentLevelX = 0
window.currentLevelY = 0
window.currentLevelSound = null
window.w = window.innerWidth
window.h = window.innerHeight
updateCamera = require './updateCamera'
updateSounds = require './updateSounds'
level = require './level'
end = require './end'
blizzard = require './blizzard'
wind = require './wind'
background = require './background'

window.ticks = 0

renderer = new PIXI.WebGLRenderer w, h
renderer.backgroundColor = 0xeeeeee
document.body.appendChild renderer.view

window.stage = new PIXI.Container()

background.generate()

window.player = new Player w / 2, h / 2

# window.heart = PIXI.Sprite.fromImage "assets/textures/heart.gif"
# heart.width = 50 * 2
# heart.height = 70 * 2
# heart.position.x = heart.width * 1.25
# heart.position.y = heart.height * 1.25
# stage.addChild heart

wind.play()

level()

blizzard.generate()

dfilter = new PIXI.filters.DisplacementFilter PIXI.Sprite.fromImage('assets/textures/maaap.jpg')
dfilter.padding = 100

filter = new PIXI.filters.ColorMatrixFilter()
stage.filters = [dfilter]

filter.blackAndWhite()

animate = ->
  requestAnimationFrame animate

  # if heart.width <= 0 or heart.height <= 0
  #   end()

  ticks += 1

  dfilter.scale.x = Math.sin(ticks / 20) * 100
  dfilter.scale.y = -Math.cos(ticks / 20) * 100

  player.filter.scale.x = Math.sin(ticks / 20) * 100
  player.filter.scale.y = -Math.cos(ticks / 20) * 200

  # player.filter.scale.x = Math.sin(temperature) * 400
  # player.filter.scale.y = -Math.cos(temperature) * 2000

  if player.texture
    updateSounds() # player.distance используется и здесь, обнуляем только один раз
    background.update() # и здесь
    player.updateFootprints()
    updateCamera()

  blizzard.update()

  renderer.render stage

animate()