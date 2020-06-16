export default class InputHandler {
  constructor(paddle, paddle2, game) {
    document.addEventListener("keydown", ciguli => {
      switch (ciguli.keyCode) {
        case 37:
          paddle.moveLeft();
          break;

        case 39:
          paddle.moveRight();
          break;

        case 65:
          paddle2.moveLeft();
          break;

        case 68:
          paddle2.moveRight();
          break;

        case 27:
          game.pauseGame();
          break;

        case 32:
          game.closeMenu();
          break;

        default:
      }
    });

    document.addEventListener("keyup", ciguli => {
      switch (ciguli.keyCode) {
        case 37:
          if (paddle.speed < 0) paddle.stop();
          break;

        case 39:
          if (paddle.speed > 0) paddle.stop();
          break;

        case 65:
          if (paddle2.speed < 0) paddle2.stop();
          break;

        case 68:
          if (paddle2.speed > 0) paddle2.stop();
          break;

        default:
      }
    });
  }
}
