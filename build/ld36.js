(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var action, generate;

generate = require('./generate');

action = function(o) {
  if (!o.isUsed) {
    switch (o.type) {
      case 'girl':
        temperature -= 50;
        break;
      case 'baby':
        temperature -= 25;
    }
  }
  if (o.type !== 'snow') {
    o.texture.alpha = 0.5;
    o.isUsed = true;
    o.sound.pause();
    return generate();
  }
};

module.exports = action;


},{"./generate":5}],2:[function(require,module,exports){
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
    var flake, j, len, ref, results;
    ref = this.sprites;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      flake = ref[j];
      flake.position.x += 30;
      flake.position.y += 10;
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


},{}],3:[function(require,module,exports){
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


},{}],4:[function(require,module,exports){
var end;

end = function() {
  console.log('end');
  return location.reload();
};

module.exports = end;


},{}],5:[function(require,module,exports){
var Baby, Girl, generate, r;

Baby = require('./npc/baby');

Girl = require('./npc/girl');

r = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

generate = function() {
  var m;
  m = 2500;
  if (Math.random() > 0.5) {
    return new Baby(r(m * -1, m), r(m * -1, m));
  } else {
    return new Girl(r(m * -1, m), r(m * -1, m));
  }
};

module.exports = generate;


},{"./npc/baby":6,"./npc/girl":7}],6:[function(require,module,exports){
var Baby, Sound;

Sound = require('../sound');

Baby = (function() {
  function Baby(x, y) {
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    this.texture = PIXI.Sprite.fromImage('assets/textures/4.jpg');
    this.texture.type = 'baby';
    this.texture.isUsed = false;
    this.texture.width = 100;
    this.texture.height = 100;
    this.texture.position.x = x;
    this.texture.position.y = y;
    this.sound = new Sound('./assets/sounds/baby-crying.wav', x, y, true, 1);
    this.sound.play();
    stage.addChild(this.texture);
    staticObjects.push(this);
  }

  Baby.prototype.texture = null;

  Baby.prototype.sound = null;

  return Baby;

})();

module.exports = Baby;


},{"../sound":10}],7:[function(require,module,exports){
var Girl, Sound;

Sound = require('../sound');

Girl = (function() {
  function Girl(x, y, n) {
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    if (n == null) {
      n = 0;
    }
    this.texture = PIXI.Sprite.fromImage('assets/textures/1.jpg');
    this.type = 'girl';
    this.isUsed = false;
    this.texture.width = 100;
    this.texture.height = 100;
    this.texture.position.x = x;
    this.texture.position.y = y;
    this.sound = new Sound('./assets/sounds/girl-crying.wav', x, y, true, 1);
    this.sound.play();
    stage.addChild(this.texture);
    staticObjects.push(this);
  }

  Girl.prototype.texture = null;

  Girl.prototype.sound = null;

  return Girl;

})();

module.exports = Girl;


},{"../sound":10}],8:[function(require,module,exports){
var Player, _currendStep, action, collision, playStep, stepSound1, stepSound2;

collision = require('./collision');

action = require('./action');

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
    stage.addChild(this.texture);
    window.onkeydown = (function(_this) {
      return function(e) {
        var c, i, len, o, results;
        switch (e.keyCode) {
          case 87:
            _this.distance.y -= _this.step;
            playStep();
            break;
          case 83:
            _this.distance.y += _this.step;
            playStep();
            break;
          case 68:
            _this.distance.x += _this.step;
            playStep();
            break;
          case 65:
            _this.distance.x -= _this.step;
            playStep();
        }
        results = [];
        for (i = 0, len = staticObjects.length; i < len; i++) {
          o = staticObjects[i];
          c = collision(o.texture);
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

  Player.prototype.texture = null;

  Player.prototype.step = 10;

  Player.prototype.distance = {
    x: 0,
    y: 0
  };

  return Player;

})();

module.exports = Player;


},{"./action":1,"./collision":3}],9:[function(require,module,exports){
var Snow, r, snow;

r = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

Snow = (function() {
  function Snow() {
    this.texture = PIXI.Sprite.fromImage("assets/textures/snow/snow" + (r(1, 5)) + ".png");
    this.texture.type = 'snow';
    this.texture.isUsed = true;
    this.texture.width = 100;
    this.texture.height = 100;
    this.texture.position.x = r(-3000, 3000);
    this.texture.position.y = r(-3000, 3000);
    stage.addChild(this.texture);
    staticObjects.push(this);
  }

  Snow.prototype.texture = null;

  return Snow;

})();

snow = function() {
  var i, j, results;
  this.container = new PIXI.Container();
  stage.addChild(this.container);
  results = [];
  for (i = j = 0; j <= 100; i = ++j) {
    results.push(new Snow());
  }
  return results;
};

module.exports = snow;


},{}],10:[function(require,module,exports){
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
      refDistance: 0.8,
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


},{}],11:[function(require,module,exports){
var Player, animate, blizzard, end, filter, generate, renderer, snow, updateCamera, updateSounds, wind;

Player = require('./player');

window.staticObjects = [];

window.staticSounds = [];

window.w = window.innerWidth;

window.h = window.innerHeight;

updateCamera = require('./updateCamera');

updateSounds = require('./updateSounds');

generate = require('./generate');

blizzard = require('./blizzard');

snow = require('./snow');

end = require('./end');

window.temperature = 0;

window.maxTemperature = 400;

renderer = new PIXI.WebGLRenderer(w, h);

renderer.backgroundColor = 0xeeeeee;

document.body.appendChild(renderer.view);

window.stage = new PIXI.Container();

window.player = new Player(w / 2, h / 2);

wind = new Howl({
  src: ['assets/sounds/wind.wav'],
  volume: 0.4,
  preload: true
});

wind.play();

generate();

blizzard.generate();

snow();

filter = new PIXI.filters.ColorMatrixFilter();

stage.filters = [filter];

filter.blackAndWhite();

animate = function() {
  requestAnimationFrame(animate);
  if (temperature >= maxTemperature) {
    end();
  }
  temperature += 0.1;
  player.filter.scale.x = Math.sin(temperature) * 400;
  player.filter.scale.y = Math.sin(temperature) * 400;
  if (player.texture) {
    updateSounds();
    updateCamera();
  }
  blizzard.update();
  return renderer.render(stage);
};

animate();


},{"./blizzard":2,"./end":4,"./generate":5,"./player":8,"./snow":9,"./updateCamera":12,"./updateSounds":13}],12:[function(require,module,exports){
var updateCamera;

updateCamera = function() {
  var i, j, len, p;
  p = player;
  for (j = 0, len = staticObjects.length; j < len; j++) {
    i = staticObjects[j];
    i.texture.position.x -= p.distance.x;
    i.texture.position.y -= p.distance.y;
  }
  p.distance.x = 0;
  return p.distance.y = 0;
};

module.exports = updateCamera;


},{}],13:[function(require,module,exports){
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


},{}]},{},[11])