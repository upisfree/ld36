# please delete me
# skuratovcoffeescript
# code below was written by girl
# where is my book, bitch?
Player = require './player'
Sound = require './sound'
Rock = require './rock'
Jack = require './jack'
window.staticObjects = []
window.staticSounds = []
window.w = window.innerWidth
window.h = window.innerHeight
updateCamera = require './updateCamera'
updateSounds = require './updateSounds'

renderer = new PIXI.WebGLRenderer w, h
document.body.appendChild renderer.view

window.stage = new PIXI.Container()

rock0 = new Rock -500, -500, 0
rock3 = new Jack 1500, 1500, 1

s1 = new Sound './assets/sounds/baby-crying.wav', -500, -500, true, 0.1
s2 = new Sound './assets/sounds/girl-crying.wav', 1500, 1500, true, 1

s1.play()
s2.play()

window.player = new Player w / 2, h / 2

# filter = new PIXI.filters.GlowFilter(renderer.width, renderer.height, 15, 2, 1, 0xFF0000, 0.5)

# stage.filters = [filter] # нет фильтров, поставь в виде файла и ок, сначала геймплей, потом звуковой движ,а потом графон

animate = ->
  requestAnimationFrame animate

  if player.texture
    updateSounds() # player.distance используется и здесь, обнуляем только один раз
    updateCamera()

  renderer.render stage

animate()