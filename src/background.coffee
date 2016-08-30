background =
  generate: ->
    texture = PIXI.Texture.fromImage 'assets/textures/snow.png'
    @tilingSprite = new PIXI.extras.TilingSprite texture, 3000, 3000 # грубые границы уровня

    stage.addChild @tilingSprite
  update: ->
    @tilingSprite.tilePosition.x -= player.distance.x
    @tilingSprite.tilePosition.y -= player.distance.y

# export
module.exports = background