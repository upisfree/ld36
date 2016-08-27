class Player
  constructor: (x = 0, y = 0) ->
    PIXI.loader.add('player', 'assets/player.png').load (loader, resources) =>
      @texture = new PIXI.Sprite resources.player.texture

      @texture.width = 150
      @texture.height = 150

      @texture.position.x = x
      @texture.position.y = y

      world.addChild @texture

      window.onkeydown = (e) =>
        switch e.keyCode
          when 87 # up
            @texture.position.y -= 10
          when 83 # down
            @texture.position.y += 10
          when 68 # right
            @texture.position.x += 10
          when 65 # left
            @texture.position.x -= 10

  texture: null

# export
module.exports = Player