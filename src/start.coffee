# please delete me
# skuratovcoffeescript
# code below was written by girl
# where is my book, bitch?
Player = require './player'
w = window.innerWidth
h = window.innerHeight

renderer = new PIXI.WebGLRenderer w, h
document.body.appendChild renderer.view

window.stage = new PIXI.Container()

window.world = new pixicam.World
  screenWidth: 4000
  screenHeight: 4000
  width: 4000
  height: 4000

window.camera = world.camera

stage.addChild world


player = new Player w / 2, h / 2




console.log world





animate = ->
  requestAnimationFrame animate

  world.update()

  renderer.render stage

animate()


setTimeout ->
  camera.follow player.texture
, 2000