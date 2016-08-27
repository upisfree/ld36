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
        _this.texture.position.x = x;
        _this.texture.position.y = y;
        world.addChild(_this.texture);
        return window.onkeydown = function(e) {
          switch (e.keyCode) {
            case 87:
              return _this.texture.position.y -= 10;
            case 83:
              return _this.texture.position.y += 10;
            case 68:
              return _this.texture.position.x += 10;
            case 65:
              return _this.texture.position.x -= 10;
          }
        };
      };
    })(this));
  }

  Player.prototype.texture = null;

  return Player;

})();

module.exports = Player;


},{}],2:[function(require,module,exports){
var Player, animate, h, player, renderer, w;

Player = require('./player');

w = window.innerWidth;

h = window.innerHeight;

renderer = new PIXI.WebGLRenderer(w, h);

document.body.appendChild(renderer.view);

window.stage = new PIXI.Container();

window.world = new pixicam.World({
  screenWidth: 4000,
  screenHeight: 4000,
  width: 4000,
  height: 4000
});

window.camera = world.camera;

stage.addChild(world);

player = new Player(w / 2, h / 2);

console.log(world);

animate = function() {
  requestAnimationFrame(animate);
  world.update();
  return renderer.render(stage);
};

animate();

setTimeout(function() {
  return camera.follow(player.texture);
}, 2000);


},{"./player":1}]},{},[2])