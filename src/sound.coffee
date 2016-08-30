class Sound
  constructor: (url, x, y, _loop, volume) ->
    @x = x
    @y = y

    @sound = new Howl
      src: [url]
      loop: _loop
      preload: true
      volume: volume

    @sound.pos x, y, 0

    @sound.pannerAttr
      panningModel: 'HRTF'
      refDistance: 0.1
      rolloffFactor: 2.5
      distanceModel: 'exponential'

    staticSounds.push @

  play: ->
    @sound.play()
  pause: ->
    @sound.pause()
  stop: ->
    @sound.stop()

  sound: null
  x: 0
  y: 0

# export
module.exports = Sound