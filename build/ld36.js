(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


},{}],2:[function(require,module,exports){
var Player, collision;

collision = require('./collision');

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
        _this.texture.position.x = x;
        _this.texture.position.y = y;
        stage.addChild(_this.texture);
        return window.onkeydown = function(e) {
          var c, i, len, o, results;
          switch (e.keyCode) {
            case 87:
              _this.distance.y -= _this.step;
              break;
            case 83:
              _this.distance.y += _this.step;
              break;
            case 68:
              _this.distance.x += _this.step;
              break;
            case 65:
              _this.distance.x -= _this.step;
          }
          results = [];
          for (i = 0, len = staticObjects.length; i < len; i++) {
            o = staticObjects[i];
            c = collision(o);
            if (c.x === 'left') {
              _this.distance.x -= _this.step;
            } else if (c.x === 'right') {
              _this.distance.x += _this.step;
            }
            if (c.y === 'top') {
              results.push(_this.distance.y -= _this.step);
            } else if (c.y === 'bottom') {
              results.push(_this.distance.y += _this.step);
            } else {
              results.push(void 0);
            }
          }
          return results;
        };
      };
    })(this));
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


},{"./collision":1}],3:[function(require,module,exports){
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


},{}],4:[function(require,module,exports){
var Player, Rock, animate, h, renderer, rock0, rock1, rock2, rock3, updateCamera, w;

Player = require('./player');

Rock = require('./rock');

window.staticObjects = [];

w = window.innerWidth;

h = window.innerHeight;

updateCamera = require('./updateCamera');

renderer = new PIXI.WebGLRenderer(w, h);

document.body.appendChild(renderer.view);

window.stage = new PIXI.Container();

rock0 = new Rock(50, 50, 0);

rock1 = new Rock(50, 700, 1);

rock2 = new Rock(900, 50, 2);

rock3 = new Rock(900, 700, 3);

window.player = new Player(w / 2, h / 2);

animate = function() {
  requestAnimationFrame(animate);
  if (player.texture) {
    updateCamera();
  }
  return renderer.render(stage);
};

animate();


},{"./player":2,"./rock":3,"./updateCamera":5}],5:[function(require,module,exports){
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


},{}]},{},[4])