(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  var Ship = Asteroids.Ship = function (options) {
    this.pos = options.pos;
    this.game = options.game;
    this.RADIUS = 5;
    this.COLOR = 'blue';
    this.vel = [0, 0];

    Asteroids.MovingObject.call(this, {
      color: this.COLOR,
      radius: this.RADIUS,
      vel: this.vel,
      pos: this.pos,
      game: this.game
    });
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.fireBullet = function () {
    var bullet = new Asteroids.Bullet({
      pos: this.pos,
      game: this.game,
      vel: this.vel
    });
    this.game.bullets.push(bullet);
  };

  Ship.prototype.power = function (impulse) {
    impX = impulse[0];
    impY = impulse[1];
    this.vel[0] += impX;
    this.vel[1] += impY;
  };

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
  };
})();