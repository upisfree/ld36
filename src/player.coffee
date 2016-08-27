class Player
  constructor: (x = 0, y = 0) ->
    PIXI.loader.add('player', 'assets/player.png').load (loader, resources) =>
      @texture = new PIXI.Sprite resources.player.texture

      @texture.width = 150
      @texture.height = 150

      x -= @texture.width / 2
      y -= @texture.height / 2

      @texture.position.x = @x = x
      @texture.position.y = @y = y

      stage.addChild @texture

      window.onkeydown = (e) =>
        switch e.keyCode
          when 87 # up
            @y -= @step
            @distance.y -= @step
          when 83 # down
            @y += @step
            @distance.y += @step
          when 68 # right
            @x += @step
            @distance.x += @step
          when 65 # left
            @x -= @step
            @distance.x -= @step

  texture: null
  step: 10
  x: 0
  y: 0
  distance:
    x: 0
    y: 0

# export
module.exports = Player