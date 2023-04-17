import { Rect } from "fabric/fabric-impl";
import { fabric } from "fabric";
import type GameEngine from "./GameEngine";
import { PlayerType } from "../enums";
import { isRacketTouchingTheBall, touchedTheRacketSound } from "../utils";

class Racket {
  rect: Rect;
  engine: GameEngine;
  targetY = 0;
  posY = 0;
  posX = 0;
  height = 100;
  width = 10;
  stepY: number;
  movementLatency = 5;
  player: PlayerType;
  color: "red" | "blue";

  constructor(engine: GameEngine, player: PlayerType, speed = 1) {
    this.engine = engine;
    this.posY = (engine.canvas.height || 0) / 2 - this.height / 2;
    this.player = player;
    this.color = "red";
    this.stepY = speed;

    if (this.player === PlayerType.Right) {
      this.posX = (engine.canvas.width || 0) - this.width;
      this.color = "blue";
    }
    this.rect = new fabric.Rect({
      name: this.player,
      left: this.posX,
      top: this.posY,
      width: this.width,
      height: this.height,
      selectable: false,
      fill: this.color,
    });

    this.engine.canvas.add(this.rect);
  }

  collisionDetector() {
    const ball = this.engine.ball;

    if (isRacketTouchingTheBall(this, ball)) {
      this.rect.set({ fill: "white" });
      ball.reverseX();
      touchedTheRacketSound();
    } else {
      this.rect.set({ fill: this.color });
    }
  }

  autoMove() {
    const ball = this.engine.ball;

    if (this.shouldItMoveDown(ball.posY)) {
      this.moveDown();
    }

    if (this.shouldItMoveUp(ball.posY)) {
      this.moveUp();
    }
  }

  shouldItMoveDown(ballY: number) {
    return ballY > this.posY + this.height / 2;
  }

  shouldItMoveUp(ballY: number) {
    return ballY < this.posY + this.height / 2;
  }

  moveDown() {
    if (this.posY + this.height < (this.engine.canvas.height || 0)) {
      this.posY += this.stepY;
      this.rect.set({ top: this.posY });
    }
  }

  moveUp() {
    if (this.posY > 0) {
      this.posY -= this.stepY;
      this.rect.set({ top: this.posY });
    }
  }

  moveToStart() {
    this.posY = (this.engine.canvas.height || 0) / 2 - this.height / 2;
    this.rect.set({ top: this.posY });
  }
}

export default Racket;
