import BouncingBall from "../../core/BouncingBall";
import GameEngine from "../../core/GameEngine";
import { GameMode } from "../../enums";
import { FenceTouch } from "../../types";
import isBallTouchingTheFenceSides from "../isBallTouchingTheFenceSides";

let gameEngine: GameEngine = new GameEngine("test", GameMode.LEFT_VS_RIGHT);
let ball: BouncingBall;

describe("isBallTouchingTheFenceSides", () => {
  afterAll(() => gameEngine.dispose());

  beforeEach(() => {
    ball = new BouncingBall(gameEngine, 10);
  });

  it("should return FenceTouch object with the correct properties when ball touches the right side of the fence", () => {
    const fenceTouch: FenceTouch = {
      right: true,
    };

    ball.moveTo(510, 250);

    expect(isBallTouchingTheFenceSides(500, 500, ball)).toEqual(fenceTouch);
  });

  it("should return FenceTouch object with the correct properties when ball touches the left side of the fence", () => {
    const fenceTouch: FenceTouch = {
      left: true,
    };

    ball.moveTo(0, 250);

    expect(isBallTouchingTheFenceSides(500, 500, ball)).toEqual(fenceTouch);
  });

  it("should return FenceTouch object with the correct properties when ball touches the bottom of the fence", () => {
    const fenceTouch: FenceTouch = {
      bottom: true,
    };

    ball.moveTo(250, 500);

    expect(isBallTouchingTheFenceSides(500, 500, ball)).toEqual(fenceTouch);
  });

  it("should return FenceTouch object with the correct properties when ball touches the top of the fence", () => {
    const fenceTouch: FenceTouch = {
      top: true,
    };

    ball.moveTo(250, 0);

    expect(isBallTouchingTheFenceSides(500, 500, ball)).toEqual(fenceTouch);
  });

  it("should return FenceTouch object with no properties when the ball is not touching any side of the fence", () => {
    const fenceTouch: FenceTouch = {};

    ball.moveTo(250, 250);

    expect(isBallTouchingTheFenceSides(500, 500, ball)).toEqual(fenceTouch);
  });
});
