(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Player;

Player = (function() {
  function Player(x, y) {
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    PIXI.loader.add('player', 'assets/player.png').load((function(_this) {
      return function(loader, resources) {
        _this.texture = new PIXI.Sprite(resources.player.texture);
        _this.texture.width = 150;
        _this.texture.height = 150;
        x -= _this.texture.width / 2;
        y -= _this.texture.height / 2;
        _this.texture.position.x = _this.x = x;
        _this.texture.position.y = _this.y = y;
        stage.addChild(_this.texture);
        return window.onkeydown = function(e) {
          switch (e.keyCode) {
            case 87:
              _this.y -= _this.step;
              return _this.distance.y -= _this.step;
            case 83:
              _this.y += _this.step;
              return _this.distance.y += _this.step;
            case 68:
              _this.x += _this.step;
              return _this.distance.x += _this.step;
            case 65:
              _this.x -= _this.step;
              return _this.distance.x -= _this.step;
          }
        };
      };
    })(this));
  }

  Player.prototype.texture = null;

  Player.prototype.step = 10;

  Player.prototype.x = 0;

  Player.prototype.y = 0;

  Player.prototype.distance = {
    x: 0,
    y: 0
  };

  return Player;

})();

module.exports = Player;


},{}],2:[function(require,module,exports){
var Rock;

Rock = (function() {
  function Rock(x, y, n) {
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    if (n == null) {
      n = 0;
    }
    PIXI.loader.add("rock-" + n, 'assets/rock.png').load((function(_this) {
      return function(loader, resources) {
        _this.texture = new PIXI.Sprite(resources["rock-" + n].texture);
        _this.texture.width = 100;
        _this.texture.height = 100;
        _this.texture.position.x = x;
        _this.texture.position.y = y;
        stage.addChild(_this.texture);
        return staticObjects.push(_this.texture);
      };
    })(this));
  }

  Rock.prototype.texture = null;

  return Rock;

})();

module.exports = Rock;


},{}],3:[function(require,module,exports){
var Player, Rock, animate, collision, h, renderer, rock0, rock1, rock2, rock3, updateCamera, w;

Player = require('./player');

Rock = require('./rock');

window.staticObjects = [];

w = window.innerWidth;

h = window.innerHeight;

updateCamera = require('./updateCamera');

renderer = new PIXI.WebGLRenderer(w, h);

document.body.appendChild(renderer.view);

window.stage = new PIXI.Container();

collision = function() {
  var i, len, o, oh, ow, ox, oy, p, ph, pw, px, py, results;
  p = player.texture;
  px = p.position.x;
  py = p.position.y;
  pw = p.width;
  ph = p.height;
  results = [];
  for (i = 0, len = staticObjects.length; i < len; i++) {
    o = staticObjects[i];
    ox = o.position.x;
    oy = o.position.y;
    ow = o.width;
    oh = o.height;
    if (((px < ox + ow && px + pw > ox + ow) || (px < ox && px + pw > ox)) && ((py < oy && oy < py + ph) || (py + ph > oy + oh && py < oy + oh))) {
      results.push(console.log('collision'));
    } else {
      results.push(void 0);
    }
  }
  return results;
};

rock0 = new Rock(50, 50, 0);

rock1 = new Rock(50, 700, 1);

rock2 = new Rock(900, 50, 2);

rock3 = new Rock(900, 700, 3);

window.player = new Player(w / 2, h / 2);

animate = function() {
  requestAnimationFrame(animate);
  if (player.texture) {
    collision();
    updateCamera();
  }
  return renderer.render(stage);
};

animate();


},{"./player":1,"./rock":2,"./updateCamera":4}],4:[function(require,module,exports){
var updateCamera;

updateCamera = function() {
  var i, j, len, p;
  p = player;
  for (j = 0, len = staticObjects.length; j < len; j++) {
    i = staticObjects[j];
    i.position.x -= p.distance.x;
    i.position.y -= p.distance.y;
  }
  p.distance.x = 0;
  return p.distance.y = 0;
};

module.exports = updateCamera;


},{}]},{},[3])