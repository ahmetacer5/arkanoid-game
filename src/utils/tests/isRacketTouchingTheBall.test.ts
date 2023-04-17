import BouncingBall from "../../core/BouncingBall";
import GameEngine from "../../core/GameEngine";
import Racket from "../../core/Racket";
import { GameMode, PlayerType } from "../../enums";
import isRacketTouchingTheBall from "../isRacketTouchingTheBall";

let gameEngine: GameEngine = new GameEngine("test", GameMode.LEFT_VS_RIGHT);

describe("isRacketTouchingTheBall", () => {
  afterAll(() => gameEngine.dispose());

  test("should return true when the ball touches the left racket", () => {
    const ball = new BouncingBall(gameEngine, 10);
    const racket = new Racket(gameEngine, PlayerType.Left);
    racket.posX = 0;
    racket.posY = 0;
    racket.width = 100;
    racket.height = 100;
    ball.posX = 10;
    ball.posY = 10;
    const result = isRacketTouchingTheBall(racket, ball);
    expect(result).toBe(true);
  });

  test("should return true when the ball touches the right racket", () => {
    const ball = new BouncingBall(gameEngine, 10);
    const racket = new Racket(gameEngine, PlayerType.Right);
    racket.posX = 0;
    racket.posY = 0;
    racket.width = 100;
    racket.height = 100;
    ball.posX = 10;
    ball.posY = 10;
    const result = isRacketTouchingTheBall(racket, ball);
    expect(result).toBe(true);
  });

  test("should return false when the ball does not touch the racket", () => {
    const ball = new BouncingBall(gameEngine, 10);
    const racket = new Racket(gameEngine, PlayerType.Right);
    racket.posX = 0;
    racket.posY = 0;
    racket.width = 100;
    racket.height = 100;
    ball.posX = 200;
    ball.posY = 200;
    const result = isRacketTouchingTheBall(racket, ball);
    expect(result).toBe(false);
  });
});
