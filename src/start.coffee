# please delete me
# skuratovcoffeescript
# code below was written by girl
# where is my book, bitch?
Player = require './player'
window.staticObjects = []
window.staticSounds = []
window.w = window.innerWidth
window.h = window.innerHeight
updateCamera = require './updateCamera'
updateSounds = require './updateSounds'
generate = require './generate'
blizzard = require './blizzard'
snow = require './snow'
end = require './end'

window.temperature = 0
window.maxTemperature = 100

renderer = new PIXI.WebGLRenderer w, h
renderer.backgroundColor = 0xeeeeee
document.body.appendChild renderer.view

window.stage = new PIXI.Container()
window.player = new Player w / 2, h / 2
window.heart = PIXI.Sprite.fromImage "assets/textures/heart.gif"
heart.width = 50 * 2
heart.height = 70 * 2
heart.position.x = heart.width * 1.25
heart.position.y = heart.height * 1.25
stage.addChild heart

wind = new Howl
  src: ['assets/sounds/wind.wav']
  volume: 0.4
  loop: true
  preload: true

wind.play()

generate(true)
blizzard.generate()

snow()

dfilter = new PIXI.filters.DisplacementFilter PIXI.Sprite.fromImage('assets/textures/map.jpg'), 0, 0

filter = new PIXI.filters.ColorMatrixFilter()
stage.filters = [filter, dfilter]

filter.blackAndWhite()

animate = ->
  requestAnimationFrame animate

  if heart.width is 20 or heart.height is 20
    generate(player.texture.position.x - 100, player.texture.position.y - 100)

  if heart.width <= 0 or heart.height <= 0
    end()

  temperature += 0.05

  dfilter.scale.x = Math.sin(temperature) * 100
  dfilter.scale.y = -Math.cos(temperature) * 100

  player.filter.scale.x = Math.sin(temperature) * 400
  player.filter.scale.y = -Math.cos(temperature) * 2000

  heart.width -= 0.05
  heart.height -= 0.05

  if player.texture
    updateSounds() # player.distance используется и здесь, обнуляем только один раз
    updateCamera()

  blizzard.update()

  renderer.render stage

animate()