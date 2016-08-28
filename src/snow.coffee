r = (min, max) ->
  return Math.floor(Math.random() * (max - min) + min)

class Snow
  constructor: ->
    @texture = PIXI.Sprite.fromImage "assets/textures/snow/snow#{r(1, 5)}.png"

    @texture.type = 'snow'
    @texture.isUsed = true

    @texture.width = 100
    @texture.height = 100

    @texture.position.x = r(-3000, 3000)
    @texture.position.y = r(-3000, 3000)

    stage.addChild @texture
    staticObjects.push @

  texture: null

snow = ->
  @container = new PIXI.Container()
  
  stage.addChild @container
  
  for i in [0..100]
    new Snow()

module.exports = snow