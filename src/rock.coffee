class Rock
  constructor: (x = 0, y = 0, n = 0) ->
    PIXI.loader.add("rock-#{n}", 'assets/rock.png').load (loader, resources) =>
      @texture = new PIXI.Sprite resources["rock-#{n}"].texture

      @texture.width = 100
      @texture.height = 100

      @texture.position.x = x
      @texture.position.y = y

      stage.addChild @texture

      staticObjects.push @texture

  texture: null

# export
module.exports = Rock