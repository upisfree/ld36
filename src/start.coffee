# please delete me
# skuratovcoffeescript
# code below was written by girl
# where is my book, bitch?
Player = require './player'
Rock = require './rock'
Jack = require './jack'
window.staticObjects = []
w = window.innerWidth
h = window.innerHeight
updateCamera = require './updateCamera'

renderer = new PIXI.WebGLRenderer w, h
document.body.appendChild renderer.view

window.stage = new PIXI.Container()

rock0 = new Rock 50, 50, 0
rock1 = new Jack 50, 700, 0
rock2 = new Rock 900, 50, 1
rock3 = new Jack 900, 700, 1

window.player = new Player w / 2, h / 2

animate = ->
  requestAnimationFrame animate

  if player.texture
    updateCamera()

  renderer.render stage

animate()