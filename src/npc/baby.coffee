Sound = require '../sound'

class Baby
  constructor: (x = 0, y = 0) ->
    @texture = PIXI.Sprite.fromImage 'assets/textures/baby.png'

    @texture.type = 'baby'
    @texture.isUsed = false

    @texture.width = 100
    @texture.height = 100

    @texture.position.x = x
    @texture.position.y = y

    @sound = new Sound './assets/sounds/baby-crying.wav', x, y, true, 0.4
    @sound.play()

    stage.addChild @texture
    staticObjects.push @

  texture: null
  sound: null

# export
module.exports = Baby