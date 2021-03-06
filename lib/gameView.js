(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var GameView = window.Asteroids.GameView = function (options) {
    this.canvasEl = options.canvasEl;

    options = {
      DIM_X: options.DIM_X,
      DIM_Y: options.DIM_Y,
      ctx: options.ctx,
      canvasEl: this.canvasEl,
      gameView: this
    };

    this.game = new Asteroids.Game(options);

    this.bindKeyHandlers();
  };

  GameView.prototype.bindKeyHandlers = function () {
    var power = 0.6;
    key('up', function(){
      direction = 'forward';
      this.game.ship.power(direction);
      return false;
    }.bind(this));
    key('down', function(){
      direction = 'backward';
      this.game.ship.power(direction);
      return false;
    }.bind(this));
    key('left', function(){
      this.game.ship.left();
      return false;
    }.bind(this));
    key('right', function(){
      this.game.ship.right();
      return false;
    }.bind(this));

    key('space', function () {
      this.game.ship.fireBullet();
    }.bind(this));
  };


  GameView.prototype.start = function () {
    var gameInterval = setInterval(function () {
      this.game.step();
      this.game.draw();
    }.bind(this), 10);

    this.game.gameInterval = gameInterval;
  };
})();
