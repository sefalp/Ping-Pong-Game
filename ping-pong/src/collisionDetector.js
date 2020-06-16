export function collisionDetector(ball, paddle) {

  let bottomOfBall = ball.position.y + ball.size;
  let topOfBall = ball.position.y;

  let topOfPaddle = paddle.position.y;
  let leftOfPaddle = paddle.position.x;
  let rightOfPaddle = paddle.position.x + paddle.width;
  let bottomOfPaddle = paddle.position.y + paddle.height;

  if (
    topOfBall <= bottomOfPaddle &&
    bottomOfBall >= topOfPaddle &&
    ball.position.x >= leftOfPaddle &&
    ball.position.x + ball.size < rightOfPaddle
  ) {
    return true;
  } else {
    return false;
  }
  
}
