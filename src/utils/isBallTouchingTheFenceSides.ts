import BouncingBall from "../core/BouncingBall";
import { FenceTouch } from "../types";

function isBallTouchingTheFenceSides(
  fenceHeight: number,
  fenceWidth: number,
  ball: BouncingBall
): FenceTouch {
  const fenceTouch: FenceTouch = {};

  if (ball.posX + ball.radius >= fenceWidth) {
    fenceTouch.right = true;
  }

  if (ball.posX - ball.radius <= 0) {
    fenceTouch.left = true;
  }

  if (ball.posY + ball.radius >= fenceHeight) {
    fenceTouch.bottom = true;
  }

  if (ball.posY - ball.radius <= 0) {
    fenceTouch.top = true;
  }

  return fenceTouch;
}

export default isBallTouchingTheFenceSides;
