collision = require './collision'
action = require './action'

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

    stage.addChild @texture

    window.onkeydown = (e) =>
      switch e.keyCode
        when 87 # up
          @distance.y -= @step
          playStep()
        when 83 # down
          @distance.y += @step
          playStep()
        when 68 # right
          @distance.x += @step
          playStep()
        when 65 # left
          @distance.x -= @step
          playStep()

      for o in staticObjects
        c = collision o.texture

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

  texture: null
  step: 10
  distance:
    x: 0
    y: 0

# export
module.exports = Player