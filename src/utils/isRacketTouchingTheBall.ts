import BouncingBall from "../core/BouncingBall";
import Racket from "../core/Racket";
import PlayerType from "../enums/PlayerType.enum";

/**
 * Check if a racket is touching a bouncing ball.
 *
 * @param {Racket} racket - An object representing the racket.
 * @param {BouncingBall} ball - An object representing the bouncing ball.
 *
 * @returns {boolean} Whether or not the racket is touching the ball.
 */

function isRacketTouchingTheBall(racket: Racket, ball: BouncingBall) {
  if (racket.player === PlayerType.Left) {
    if (
      ball.posX - ball.radius <= racket.posX + racket.width &&
      ball.posY > racket.posY &&
      ball.posY < racket.posY + racket.height
    ) {
      return true;
    }
  }
  if (racket.player === PlayerType.Right) {
    if (
      ball.posX + ball.radius >= racket.posX &&
      ball.posY > racket.posY &&
      ball.posY < racket.posY + racket.height
    ) {
      return true;
    }
  }

  return false;
}

export default isRacketTouchingTheBall;
