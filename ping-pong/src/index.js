import Game from "/src/game.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const gameWidth = 800;
const gameHeight = 600;

let game = new Game(gameWidth, gameHeight);
game.start();

let lastTime = 0;

function gameLoop(now) {
  let deltaTime = now - lastTime;
  lastTime = now;

  ctx.clearRect(0, 0, gameWidth, gameHeight);
  game.move_objects(deltaTime);
  game.draw_objects(ctx);

  requestAnimationFrame(gameLoop);
}

gameLoop();
