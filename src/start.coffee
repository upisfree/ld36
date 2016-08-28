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
window.maxTemperature = 400

renderer = new PIXI.WebGLRenderer w, h
renderer.backgroundColor = 0xeeeeee
document.body.appendChild renderer.view

window.stage = new PIXI.Container()

window.player = new Player w / 2, h / 2

wind = new Howl
  src: ['assets/sounds/wind.wav']
  volume: 0.4
  preload: true

wind.play()

generate()
blizzard.generate()

snow()

filter = new PIXI.filters.ColorMatrixFilter()
stage.filters = [filter]

filter.blackAndWhite()

animate = ->
  requestAnimationFrame animate

  if temperature >= maxTemperature
    end()

  temperature += 0.1

  player.filter.scale.x = Math.sin(temperature) * 400
  player.filter.scale.y = Math.sin(temperature) * 400

  if player.texture
    updateSounds() # player.distance используется и здесь, обнуляем только один раз
    updateCamera()

  blizzard.update()

  renderer.render stage

animate()