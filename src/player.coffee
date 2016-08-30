collision = require './collision'
action = require './action'
level = require './level'

stepSound1 = new Howl
  src: ['assets/sounds/step-1.wav']
  volume: 0.5
  preload: true

stepSound2 = new Howl
  src: ['assets/sounds/step-2.wav']
  volume: 0.5
  preload: true

_currendStep = 'second'

playStep = ->
  if not stepSound1.playing() and not stepSound2.playing()
    if _currendStep is 'second'
      stepSound1.play()
      _currendStep = 'first'
    else if _currendStep is 'first'
      stepSound2.play()
      _currendStep = 'second'


footprintsContainer = new PIXI.particles.ParticleContainer 1000,
  position: true
  rotation: true

addFootprint = (x, y, r) ->
  if stepSound1.playing() and Math.random() > 0.75
    print = PIXI.Sprite.fromImage 'assets/textures/footprint.png'
    print.anchor.set 0.5
    print.position.x = x + 10 # размеры текстуры игрока, некогда сделать хорошо
    print.position.y = y + 150
    print.width *= 1.5
    print.height *= 1.5
    print.rotation = Math.PI / 2

    footprintsContainer.addChild print
  else if stepSound2.playing() and Math.random() > 0.95
    print2 = PIXI.Sprite.fromImage 'assets/textures/footprint.png'
    print2.anchor.set 0.5
    print2.position.x = x + 50 # размеры текстуры игрока, некогда сделать хорошо
    print2.position.y = y + 150
    print2.width *= 1.5
    print2.height *= 1.5
    print2.rotation = 3 * Math.PI / 2

    footprintsContainer.addChild print2

collisionWithLevel = (x, y) ->
  px = x
  py = y
  pw = 150
  ph = 150

  ox = window.currentLevelX
  oy = window.currentLevelY
  ow = 300
  oh = 300

  if ((px < ox + ow && px + pw > ox + ow) || (px < ox && px + pw > ox)) &&
     ((py < oy && oy < py + ph) || (py + ph > oy + oh && py < oy + oh))
    console.log 'collision'
    window.currentLevelSound.pause()
    level()

class Player
  constructor: (x = 0, y = 0) ->
    @texture = PIXI.Sprite.fromImage 'assets/textures/player.png'
    @texture.type = 'player'

    @texture.width = 150
    @texture.height = 150

    x -= @texture.width / 2
    y -= @texture.height / 2

    @texture.position.x = x
    @texture.position.y = y

    @filter = new PIXI.filters.DisplacementFilter PIXI.Sprite.fromImage('assets/textures/map.jpg'), 200, 200
    @texture.filters = [@filter]

    @footprintsContainer = footprintsContainer
    stage.addChild @footprintsContainer

    stage.addChild @texture

    window.onkeydown = (e) =>
      switch e.keyCode
        when 87 # up
          @distance.y -= @step
          
          playStep()

          addFootprint @texture.position.x, @texture.position.y, Math.PI / 2

          collisionWithLevel @texture.position.x, @texture.position.y
        when 83 # down
          @distance.y += @step
          
          playStep()

          addFootprint @texture.position.x, @texture.position.y, 3 * Math.PI / 2

          collisionWithLevel @texture.position.x, @texture.position.y
        when 68 # right
          @distance.x += @step
          
          playStep()

          addFootprint @texture.position.x, @texture.position.y, Math.PI * 2

          collisionWithLevel @texture.position.x, @texture.position.y
        when 65 # left
          @distance.x -= @step

          playStep()

          addFootprint @texture.position.x, @texture.position.y, Math.PI

          collisionWithLevel @texture.position.x, @texture.position.y

      for o in staticObjects
        c = collision o

        if c.x is 'left' # right
          @distance.x -= @step
        else if c.x is 'right' # left
          @distance.x += @step

        if c.y is 'top' # down
          @distance.y -= @step
        else if c.y is 'bottom' # up
          @distance.y += @step

        if c.x isnt null and c.y isnt null
          action o

  updateFootprints: ->
    if @footprintsContainer.children.length >= 1000
      @footprintsContainer.children.splice 0, 1

    for i in @footprintsContainer.children
      i.position.x -= @distance.x
      i.position.y -= @distance.y

  step: 5
  distance:
    x: 0
    y: 0

# export
module.exports = Player