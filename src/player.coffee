collision = require './collision'

class Player
  constructor: (x = 0, y = 0) ->
    PIXI.loader.add('player', 'assets/player.png').load (loader, resources) =>
      @texture = new PIXI.Sprite resources.player.texture

      @texture.width = 150
      @texture.height = 150

      x -= @texture.width / 2
      y -= @texture.height / 2

      @texture.position.x = x
      @texture.position.y = y

      stage.addChild @texture

      window.onkeydown = (e) =>
        switch e.keyCode
          when 87 # up
            @distance.y -= @step
          when 83 # down
            @distance.y += @step
          when 68 # right
            @distance.x += @step
          when 65 # left
            @distance.x -= @step

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

  texture: null
  step: 10
  distance:
    x: 0
    y: 0

# export
module.exports = Player