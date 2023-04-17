import BouncingBall from "../core/BouncingBall";
import { FenceTouch } from "../types";

/**
 * Check if the ball is touching any of the sides of a fence.
 *
 * @param {number} fenceHeight - The height of the fence in pixels.
 * @param {number} fenceWidth - The width of the fence in pixels.
 * @param {BouncingBall} ball - An object representing the bouncing ball.
 *
 * @returns {FenceTouch} An object indicating which sides of the fence the ball is touching.
 */
function isBallTouchingTheFenceSides(
  fenceHeight: number,
  fenceWidth: number,
  ball: BouncingBall
): FenceTouch {
  const fenceTouch: FenceTouch = {};

  // Check if the ball is touching the right side of the fence
  if (ball.posX + ball.radius >= fenceWidth) {
    fenceTouch.right = true;
  }

  // Check if the ball is touching the left side of the fence
  if (ball.posX - ball.radius <= 0) {
    fenceTouch.left = true;
  }

  // Check if the ball is touching the bottom side of the fence
  if (ball.posY + ball.radius >= fenceHeight) {
    fenceTouch.bottom = true;
  }

  // Check if the ball is touching the top side of the fence
  if (ball.posY - ball.radius <= 0) {
    fenceTouch.top = true;
  }

  return fenceTouch;
}

export default isBallTouchingTheFenceSides;
