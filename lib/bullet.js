(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  var Bullet = Asteroids.Bullet = function (options) {
    this.color = '#ec0101';
    this.game = options.game;
    this.heading = options.shipHeading;
    this.shipPos = options.pos;
    this.speed = 3;

    var unitVector = Asteroids.Util.headingToUnitVector(this.heading, this.speed);

    var offsetX = 0;
    var offsetY = 0;
    this.pos = [0, 0];
    this.pos[0] = this.shipPos[0] + unitVector.deltaX + offsetX;
    this.pos[1] = this.shipPos[1] + unitVector.deltaY + offsetY;

    this.vel = [0,0];
    this.vel[0] = unitVector.deltaX * this.speed;
    this.vel[1] = unitVector.deltaY * this.speed;

    Asteroids.MovingObject.call(this, {
      pos: this.pos,
      vel: this.vel,
      radius: 4,
      color: 'red',
      game: this.game
    });
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  // Bullet.prototype.findVelocity = function () {
  //   var shipX = this.game.ship.pos[0];
  //   var shipY = this.game.ship.pos[1];
  //
  //   var mouseX = this.game.mousePos.x;
  //   var mouseY = this.game.mousePos.y;
  //
  //   var deltaX = mouseX - shipX;
  //   var deltaY = mouseY - shipY;
  //
  //   var origSpeed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  //   var staticSpeed = 4;
  //
  //   var scale = origSpeed / staticSpeed;
  //   scale = 1 / scale; // invert to scale up or down the bullet x and y accordingly
  //
  //   var bulletX = deltaX * scale;
  //   var bulletY = deltaY * scale;
  //
  //   return [bulletX, bulletY];
  // };

  Bullet.prototype.collideWith = function (otherObj) {
    if (otherObj instanceof Asteroids.Asteroid) {
      this.game.remove(otherObj);
      this.game.score += 100;
      this.game.remove(this);
    }
  };

  Bullet.prototype.isWrappable = function () {
    return false;
  };
})();
