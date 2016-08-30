blizzard =
  generate: ->
    @container = new PIXI.Container()
    @particleContainer = new PIXI.particles.ParticleContainer 10000,
      position: true
      rotation: true

    @container.addChild @particleContainer
    @container.filterArea = new PIXI.Rectangle 0, 0, window.w, window.h
    @container.filters = [new PIXI.filters.BlurYFilter()]

    for i in [0..10000]
      flake = PIXI.Sprite.fromImage 'assets/textures/flake.png'
      flake.anchor.set 0.5
      flake.position.x = Math.random() * window.w
      flake.position.y = Math.random() * window.h
      flake.width = 14
      flake.height = 3
      flake.rotation = 2.9

      @sprites.push flake
      @particleContainer.addChild flake

    stage.addChild @container
  update: ->
    cos = Math.cos(ticks / 20) * 10
    for flake in @sprites
      flake.position.x += 30 - cos
      flake.position.y += 10 + cos

      if flake.position.x > window.w
        flake.position.x = Math.random() * -50

      if flake.position.y > window.h
        flake.position.y = Math.random() * -50
    
  sprites: []

module.exports = blizzard