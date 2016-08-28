Sound = require '../sound'

class Girl
  constructor: (x = 0, y = 0, n = 0) ->
    @texture = PIXI.Sprite.fromImage 'assets/textures/1.jpg'

    @type = 'girl'
    @isUsed = false

    @texture.width = 100
    @texture.height = 100

    @texture.position.x = x
    @texture.position.y = y

    @sound = new Sound './assets/sounds/girl-crying.wav', x, y, true, 1
    @sound.play()

    stage.addChild @texture
    staticObjects.push @

  texture: null
  sound: null

# export
module.exports = Girl