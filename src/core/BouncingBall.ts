import { Circle } from "fabric/fabric-impl";
import { fabric } from "fabric";
import { missedTheBallSound } from "../utils";
import { PlayerType } from "../enums";
import type GameEngine from "./GameEngine";
import isBallTouchingTheFenceSides from "../utils/isBallTouchingTheFenceSides";

class BouncingBall {
  engine: GameEngine;
  circle: Circle;
  posX: number;
  posY: number;
  stepX: number;
  stepY: number;
  radius: number;
  speed: number;

  constructor(engine: GameEngine, radius: number, speed = 1) {
    this.radius = radius;
    this.posX = radius;
    this.posY = radius;
    this.engine = engine;
    this.stepX = speed;
    this.stepY = speed;
    this.speed = speed;

    this.circle = new fabric.Circle({
      name: "ball",
      fill: "yellow",
      radius: this.radius,
      left: this.posX,
      top: this.posY,
      originX: "center",
      originY: "center",
    });

    this.engine.canvas.add(this.circle);
  }

  moveBall() {
    const newPosX = this.posX + this.stepX;
    const newPosY = this.posY + this.stepY;
    this.moveTo(newPosX, newPosY);
  }

  collisionDetector() {
    const newPosX = this.posX + this.stepX;
    const newPosY = this.posY + this.stepY;
    this.moveTo(newPosX, newPosY);

    const touched = isBallTouchingTheFenceSides(
      this.engine.canvas.height || 0,
      this.engine.canvas.width || 0,
      this
    );

    if (touched.right) {
      this.reverseX();
      this.engine.ballTouchedToSide(PlayerType.Right);
      missedTheBallSound();
    }

    if (touched.left) {
      this.reverseX();
      this.engine.ballTouchedToSide(PlayerType.Left);
      missedTheBallSound();
    }

    if (touched.bottom) {
      this.reverseY();
    }

    if (touched.top) {
      this.reverseY();
    }
  }

  moveTo(x: number, y: number) {
    this.posX = x;
    this.posY = y;
    this.circle.set({ left: x, top: y });
  }

  reverseX() {
    this.stepX *= -1;
  }

  reverseY() {
    this.stepY *= -1;
  }

  resetBallDirection() {
    this.stepX = this.speed;
    this.stepY = this.speed;
  }
}

export default BouncingBall;
