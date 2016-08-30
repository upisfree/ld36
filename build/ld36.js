(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var action;

action = function(o) {};

module.exports = action;


},{}],2:[function(require,module,exports){
var background;

background = {
  generate: function() {
    var texture;
    texture = PIXI.Texture.fromImage('assets/textures/snow.png');
    this.tilingSprite = new PIXI.extras.TilingSprite(texture, 3000, 3000);
    return stage.addChild(this.tilingSprite);
  },
  update: function() {
    this.tilingSprite.tilePosition.x -= player.distance.x;
    return this.tilingSprite.tilePosition.y -= player.distance.y;
  }
};

module.exports = background;


},{}],3:[function(require,module,exports){
var blizzard;

blizzard = {
  generate: function() {
    var flake, i, j;
    this.container = new PIXI.Container();
    this.particleContainer = new PIXI.particles.ParticleContainer(10000, {
      position: true,
      rotation: true
    });
    this.container.addChild(this.particleContainer);
    this.container.filterArea = new PIXI.Rectangle(0, 0, window.w, window.h);
    this.container.filters = [new PIXI.filters.BlurYFilter()];
    for (i = j = 0; j <= 10000; i = ++j) {
      flake = PIXI.Sprite.fromImage('assets/textures/flake.png');
      flake.anchor.set(0.5);
      flake.position.x = Math.random() * window.w;
      flake.position.y = Math.random() * window.h;
      flake.width = 14;
      flake.height = 3;
      flake.rotation = 2.9;
      this.sprites.push(flake);
      this.particleContainer.addChild(flake);
    }
    return stage.addChild(this.container);
  },
  update: function() {
    var cos, flake, j, len, ref, results;
    cos = Math.cos(ticks / 20) * 10;
    ref = this.sprites;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      flake = ref[j];
      flake.position.x += 30 - cos;
      flake.position.y += 10 + cos;
      if (flake.position.x > window.w) {
        flake.position.x = Math.random() * -50;
      }
      if (flake.position.y > window.h) {
        results.push(flake.position.y = Math.random() * -50);
      } else {
        results.push(void 0);
      }
    }
    return results;
  },
  sprites: []
};

module.exports = blizzard;


},{}],4:[function(require,module,exports){
var collision;

collision = function(o) {
  var oh, out, ow, ox, oy, p, ph, pw, px, py;
  p = player.texture;
  px = p.position.x;
  py = p.position.y;
  pw = p.width;
  ph = p.height;
  ox = o.position.x;
  oy = o.position.y;
  ow = o.width;
  oh = o.height;
  out = {
    x: null,
    y: null
  };
  if ((px < ox + ow && px + pw > ox + ow) && ((py < oy && oy < py + ph) || (py + ph > oy + oh && py < oy + oh))) {
    out.x = 'right';
  } else if ((px < ox && px + pw > ox) && ((py < oy && oy < py + ph) || (py + ph > oy + oh && py < oy + oh))) {
    out.x = 'left';
  }
  if ((py < oy && oy < py + ph) && ((px < ox + ow && px + pw > ox + ow) || (px < ox && px + pw > ox))) {
    out.y = 'top';
  } else if ((py + ph > oy + oh && py < oy + oh) && ((px < ox + ow && px + pw > ox + ow) || (px < ox && px + pw > ox))) {
    out.y = 'bottom';
  }
  return out;
};

module.exports = collision;


},{}],5:[function(require,module,exports){
var end;

end = function() {
  alert('Ты замерз. И умер. Хм.');
  return location.reload();
};

module.exports = end;


},{}],6:[function(require,module,exports){
var Sound, addBody, addCampfire, addCar, addTV, level, r, songs;

Sound = require('./sound');

r = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

addCampfire = function(x, y) {
  var frames, i, j, len, mc, texture, textures;
  frames = ['campfire-1.png', 'campfire-2.png', 'campfire-3.png', 'campfire-4.png', 'campfire-5.png'];
  textures = [];
  for (j = 0, len = frames.length; j < len; j++) {
    i = frames[j];
    texture = PIXI.Texture.fromImage("assets/textures/campfire/" + i);
    textures.push(texture);
  }
  mc = new PIXI.extras.MovieClip(textures);
  mc.position.x = x;
  mc.position.y = y;
  mc.animationSpeed = 0.2;
  mc.play();
  staticObjects.push(mc);
  return stage.addChild(mc);
};

addCar = function(x, y) {
  var sprite;
  sprite = PIXI.Sprite.fromImage('assets/textures/car.png');
  sprite.position.x = x;
  sprite.position.y = y;
  staticObjects.push(sprite);
  return stage.addChild(sprite);
};

addBody = function(x, y) {
  var sprite;
  sprite = PIXI.Sprite.fromImage('assets/textures/body.png');
  sprite.position.x = x;
  sprite.position.y = y;
  staticObjects.push(sprite);
  return stage.addChild(sprite);
};

addTV = function(x, y) {
  var sprite;
  sprite = PIXI.Sprite.fromImage('assets/textures/tv.png');
  sprite.position.x = x;
  sprite.position.y = y;
  staticObjects.push(sprite);
  return stage.addChild(sprite);
};

songs = ['./assets/sounds/dream.mp3', './assets/sounds/quiet.mp3', './assets/sounds/where.mp3', './assets/sounds/cheat.mp3', './assets/sounds/test.mp3', './assets/sounds/lili.mp3', './assets/sounds/gone.mp3', './assets/sounds/doll.mp3', './assets/sounds/thing.mp3', './assets/sounds/home.mp3', './assets/sounds/some.mp3'];

level = function() {
  var m, x, y;
  m = 2000;
  x = window.currentLevelX = r(m * -1, m);
  y = window.currentLevelY = r(m * -1, m);
  addCampfire(x, y + 100);
  if (Math.random() > 0.75) {
    addBody(x + 350, y);
  }
  if (Math.random() > 0.5) {
    addCar(x - 150, y - 200);
  }
  if (Math.random() > 0.5) {
    addTV(x - 400, y - 100);
  }
  window.currentLevelSound = new Sound(songs[r(0, songs.length - 1)], x, y, true, 0.4);
  return window.currentLevelSound.play();
};

module.exports = level;


},{"./sound":8}],7:[function(require,module,exports){
var Player, _currendStep, action, addFootprint, collision, collisionWithLevel, footprintsContainer, level, playStep, stepSound1, stepSound2;

collision = require('./collision');

action = require('./action');

level = require('./level');

stepSound1 = new Howl({
  src: ['assets/sounds/step-1.wav'],
  volume: 0.5,
  preload: true
});

stepSound2 = new Howl({
  src: ['assets/sounds/step-2.wav'],
  volume: 0.5,
  preload: true
});

_currendStep = 'second';

playStep = function() {
  if (!stepSound1.playing() && !stepSound2.playing()) {
    if (_currendStep === 'second') {
      stepSound1.play();
      return _currendStep = 'first';
    } else if (_currendStep === 'first') {
      stepSound2.play();
      return _currendStep = 'second';
    }
  }
};

footprintsContainer = new PIXI.particles.ParticleContainer(1000, {
  position: true,
  rotation: true
});

addFootprint = function(x, y, r) {
  var print, print2;
  if (stepSound1.playing() && Math.random() > 0.75) {
    print = PIXI.Sprite.fromImage('assets/textures/footprint.png');
    print.anchor.set(0.5);
    print.position.x = x + 10;
    print.position.y = y + 150;
    print.width *= 1.5;
    print.height *= 1.5;
    print.rotation = Math.PI / 2;
    return footprintsContainer.addChild(print);
  } else if (stepSound2.playing() && Math.random() > 0.95) {
    print2 = PIXI.Sprite.fromImage('assets/textures/footprint.png');
    print2.anchor.set(0.5);
    print2.position.x = x + 50;
    print2.position.y = y + 150;
    print2.width *= 1.5;
    print2.height *= 1.5;
    print2.rotation = 3 * Math.PI / 2;
    return footprintsContainer.addChild(print2);
  }
};

collisionWithLevel = function(x, y) {
  var oh, ow, ox, oy, ph, pw, px, py;
  px = x;
  py = y;
  pw = 150;
  ph = 150;
  ox = window.currentLevelX;
  oy = window.currentLevelY;
  ow = 300;
  oh = 300;
  if (((px < ox + ow && px + pw > ox + ow) || (px < ox && px + pw > ox)) && ((py < oy && oy < py + ph) || (py + ph > oy + oh && py < oy + oh))) {
    console.log('collision');
    window.currentLevelSound.pause();
    return level();
  }
};

Player = (function() {
  function Player(x, y) {
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    this.texture = PIXI.Sprite.fromImage('assets/textures/player.png');
    this.texture.type = 'player';
    this.texture.width = 150;
    this.texture.height = 150;
    x -= this.texture.width / 2;
    y -= this.texture.height / 2;
    this.texture.position.x = x;
    this.texture.position.y = y;
    this.filter = new PIXI.filters.DisplacementFilter(PIXI.Sprite.fromImage('assets/textures/map.jpg'), 200, 200);
    this.texture.filters = [this.filter];
    this.footprintsContainer = footprintsContainer;
    stage.addChild(this.footprintsContainer);
    stage.addChild(this.texture);
    window.onkeydown = (function(_this) {
      return function(e) {
        var c, j, len, o, results;
        switch (e.keyCode) {
          case 87:
            _this.distance.y -= _this.step;
            playStep();
            addFootprint(_this.texture.position.x, _this.texture.position.y, Math.PI / 2);
            collisionWithLevel(_this.texture.position.x, _this.texture.position.y);
            break;
          case 83:
            _this.distance.y += _this.step;
            playStep();
            addFootprint(_this.texture.position.x, _this.texture.position.y, 3 * Math.PI / 2);
            collisionWithLevel(_this.texture.position.x, _this.texture.position.y);
            break;
          case 68:
            _this.distance.x += _this.step;
            playStep();
            addFootprint(_this.texture.position.x, _this.texture.position.y, Math.PI * 2);
            collisionWithLevel(_this.texture.position.x, _this.texture.position.y);
            break;
          case 65:
            _this.distance.x -= _this.step;
            playStep();
            addFootprint(_this.texture.position.x, _this.texture.position.y, Math.PI);
            collisionWithLevel(_this.texture.position.x, _this.texture.position.y);
        }
        results = [];
        for (j = 0, len = staticObjects.length; j < len; j++) {
          o = staticObjects[j];
          c = collision(o);
          if (c.x === 'left') {
            _this.distance.x -= _this.step;
          } else if (c.x === 'right') {
            _this.distance.x += _this.step;
          }
          if (c.y === 'top') {
            _this.distance.y -= _this.step;
          } else if (c.y === 'bottom') {
            _this.distance.y += _this.step;
          }
          if (c.x !== null && c.y !== null) {
            results.push(action(o));
          } else {
            results.push(void 0);
          }
        }
        return results;
      };
    })(this);
  }

  Player.prototype.updateFootprints = function() {
    var i, j, len, ref, results;
    if (this.footprintsContainer.children.length >= 1000) {
      this.footprintsContainer.children.splice(0, 1);
    }
    ref = this.footprintsContainer.children;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      i.position.x -= this.distance.x;
      results.push(i.position.y -= this.distance.y);
    }
    return results;
  };

  Player.prototype.step = 5;

  Player.prototype.distance = {
    x: 0,
    y: 0
  };

  return Player;

})();

module.exports = Player;


},{"./action":1,"./collision":4,"./level":6}],8:[function(require,module,exports){
var Sound;

Sound = (function() {
  function Sound(url, x, y, _loop, volume) {
    this.x = x;
    this.y = y;
    this.sound = new Howl({
      src: [url],
      loop: _loop,
      preload: true,
      volume: volume
    });
    this.sound.pos(x, y, 0);
    this.sound.pannerAttr({
      panningModel: 'HRTF',
      refDistance: 0.1,
      rolloffFactor: 2.5,
      distanceModel: 'exponential'
    });
    staticSounds.push(this);
  }

  Sound.prototype.play = function() {
    return this.sound.play();
  };

  Sound.prototype.pause = function() {
    return this.sound.pause();
  };

  Sound.prototype.stop = function() {
    return this.sound.stop();
  };

  Sound.prototype.sound = null;

  Sound.prototype.x = 0;

  Sound.prototype.y = 0;

  return Sound;

})();

module.exports = Sound;


},{}],9:[function(require,module,exports){
var Player, animate, background, blizzard, dfilter, end, filter, level, renderer, updateCamera, updateSounds, wind;

Player = require('./player');

window.staticObjects = [];

window.staticSounds = [];

window.currentLevelX = 0;

window.currentLevelY = 0;

window.currentLevelSound = null;

window.w = window.innerWidth;

window.h = window.innerHeight;

updateCamera = require('./updateCamera');

updateSounds = require('./updateSounds');

level = require('./level');

end = require('./end');

blizzard = require('./blizzard');

wind = require('./wind');

background = require('./background');

window.ticks = 0;

renderer = new PIXI.WebGLRenderer(w, h);

renderer.backgroundColor = 0xeeeeee;

document.body.appendChild(renderer.view);

window.stage = new PIXI.Container();

background.generate();

window.player = new Player(w / 2, h / 2);

wind.play();

level();

blizzard.generate();

dfilter = new PIXI.filters.DisplacementFilter(PIXI.Sprite.fromImage('assets/textures/maaap.jpg'));

dfilter.padding = 100;

filter = new PIXI.filters.ColorMatrixFilter();

stage.filters = [dfilter];

filter.blackAndWhite();

setTimeout(function() {
  return document.getElementsByClassName('black')[0].style.display = 'none';
}, 7000);

setTimeout(function() {
  return document.getElementsByClassName('start')[0].style.display = 'none';
}, 4000);

animate = function() {
  requestAnimationFrame(animate);
  ticks += 1;
  dfilter.scale.x = Math.sin(ticks / 20) * 100;
  dfilter.scale.y = -Math.cos(ticks / 20) * 100;
  player.filter.scale.x = Math.sin(ticks / 20) * 100;
  player.filter.scale.y = -Math.cos(ticks / 20) * 200;
  if (player.texture) {
    updateSounds();
    background.update();
    player.updateFootprints();
    updateCamera();
  }
  blizzard.update();
  return renderer.render(stage);
};

animate();


},{"./background":2,"./blizzard":3,"./end":5,"./level":6,"./player":7,"./updateCamera":10,"./updateSounds":11,"./wind":12}],10:[function(require,module,exports){
var updateCamera;

updateCamera = function() {
  var i, j, len, p;
  p = player;
  for (j = 0, len = staticObjects.length; j < len; j++) {
    i = staticObjects[j];
    i.position.x -= p.distance.x;
    i.position.y -= p.distance.y;
  }
  window.currentLevelX -= p.distance.x;
  window.currentLevelY -= p.distance.y;
  p.distance.x = 0;
  return p.distance.y = 0;
};

module.exports = updateCamera;


},{}],11:[function(require,module,exports){
var updateSounds;

updateSounds = function() {
  var i, j, len, mul, p, pos, results, x, y;
  p = player;
  mul = 2;
  results = [];
  for (j = 0, len = staticSounds.length; j < len; j++) {
    i = staticSounds[j];
    i.x -= p.distance.x;
    i.y -= p.distance.y;
    pos = i.sound.pos();
    x = i.x / window.w * mul;
    y = i.y / window.h * mul;
    if (!isNaN(x) && !isNaN(y)) {
      results.push(i.sound.pos(x, y, 0));
    } else {
      results.push(void 0);
    }
  }
  return results;
};

module.exports = updateSounds;


},{}],12:[function(require,module,exports){
var wind;

wind = new Howl({
  src: ['assets/sounds/wind.wav'],
  volume: 0.4,
  loop: true,
  preload: true
});

module.exports = wind;


},{}]},{},[9])