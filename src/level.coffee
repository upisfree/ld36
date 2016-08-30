Sound = require './sound'

r = (min, max) ->
  return Math.floor(Math.random() * (max - min) + min)

addCampfire = (x, y) ->
  frames = ['campfire-1.png', 'campfire-2.png', 'campfire-3.png', 'campfire-4.png', 'campfire-5.png']
  textures = []

  for i in frames
    texture = PIXI.Texture.fromImage "assets/textures/campfire/#{i}"
    textures.push texture

  mc = new PIXI.extras.MovieClip textures
  mc.position.x = x
  mc.position.y = y

  mc.animationSpeed = 0.2

  mc.play()

  staticObjects.push mc

  stage.addChild mc

addCar = (x, y) ->
  sprite = PIXI.Sprite.fromImage 'assets/textures/car.png'

  sprite.position.x = x
  sprite.position.y = y

  staticObjects.push sprite

  stage.addChild sprite

addBody = (x, y) ->
  sprite = PIXI.Sprite.fromImage 'assets/textures/body.png'

  sprite.position.x = x
  sprite.position.y = y

  staticObjects.push sprite

  stage.addChild sprite

addTV = (x, y) ->
  sprite = PIXI.Sprite.fromImage 'assets/textures/tv.png'

  sprite.position.x = x
  sprite.position.y = y

  staticObjects.push sprite

  stage.addChild sprite

songs = ['./assets/sounds/dream.mp3', './assets/sounds/quiet.mp3',
         './assets/sounds/where.mp3', './assets/sounds/cheat.mp3',
         './assets/sounds/test.mp3', './assets/sounds/lili.mp3',
         './assets/sounds/gone.mp3', './assets/sounds/doll.mp3',
         './assets/sounds/thing.mp3', './assets/sounds/home.mp3',
         './assets/sounds/some.mp3']

level = ->
  m = 2000

  x = window.currentLevelX = r m * -1, m
  y = window.currentLevelY = r m * -1, m

  addCampfire x, y + 100
  
  if Math.random() > 0.75
    addBody x + 350, y
  
  if Math.random() > 0.5
    addCar x - 150, y - 200

  if Math.random() > 0.5
    addTV x - 400, y - 100

  window.currentLevelSound = new Sound songs[r(0, songs.length - 1)], x, y, true, 0.4
  window.currentLevelSound.play()

# export
module.exports = level