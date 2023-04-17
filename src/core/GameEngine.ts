import { Canvas } from "fabric/fabric-impl";
import { fabric } from "fabric";
import BouncingBall from "./BouncingBall";
import { GameMode, GameState, PlayerType } from "../enums";
import { whoWillStartFirst } from "../utils";
import Racket from "./Racket";

class GameEngine {
  canvas: Canvas;
  ball: BouncingBall;
  canvasH = 400;
  canvasW = 600;
  rendererTimerRef?: NodeJS.Timer;
  racketLeft: Racket;
  racketRight: Racket;
  playerLeftScore = 0;
  playerRightScore = 0;
  playerTurn: PlayerType;
  gameState = GameState.RESET;
  gameMode: GameMode;
  onScoreUpdate?: (left: number, right: number) => void;
  onGameStateChange?: (gameState: GameState) => void;
  keyDownEventListener = this.handleUserKeyPress.bind(this);

  constructor(canvasId: string, gameMode: GameMode) {
    this.canvas = new fabric.Canvas(canvasId, {
      backgroundColor: "black",
      height: this.canvasH,
      width: this.canvasW,
    });
    this.gameMode = gameMode;
    this.playerTurn = whoWillStartFirst(gameMode);
    this.ball = new BouncingBall(this, 5, 1.5);
    this.racketLeft = new Racket(this, PlayerType.Left, 30);
    this.racketRight = new Racket(this, PlayerType.Right, 30);
    this.resetGame();
    this.initGameRenderer();
    window.addEventListener("keydown", this.keyDownEventListener);
  }

  setGameState(state: GameState) {
    this.gameState = state;
    this.onGameStateChange?.(state);
  }

  setScore(left: number, right: number) {
    this.playerLeftScore = left;
    this.playerRightScore = right;
    this.onScoreUpdate?.(left, right);
  }

  moveBallToStart() {
    this.ball.resetBallDirection();
    if (this.playerTurn === PlayerType.Left) {
      this.ball.moveTo(
        this.racketLeft.posX + this.racketLeft.width + this.ball.radius,
        this.racketLeft.posY + this.racketLeft.height / 2
      );
    } else {
      this.ball.moveTo(
        this.racketRight.posX - this.ball.radius,
        this.racketRight.posY + this.racketRight.height / 2
      );
      this.ball.reverseX();
      this.ball.reverseY();
    }
  }

  initGameRenderer() {
    this.rendererTimerRef = setInterval(() => {
      if (this.gameState === GameState.PLAYING) {
        this.ball.moveBall();
        this.ball.collisionDetector();
        this.racketLeft.collisionDetector();
        this.racketRight.collisionDetector();

        if (
          this.gameMode === GameMode.COMPUTER_VS_COMPUTER ||
          this.gameMode === GameMode.COMPUTER_VS_RIGHT
        ) {
          this.racketLeft.autoMove();
        }

        if (
          this.gameMode === GameMode.COMPUTER_VS_COMPUTER ||
          this.gameMode === GameMode.LEFT_VS_COMPUTER
        ) {
          this.racketRight.autoMove();
        }
      }

      this.canvas.renderAll();
    }, 10);
  }

  playGame() {
    this.setGameState(GameState.PLAYING);
  }

  pauseGame() {
    this.setGameState(GameState.PAUSE);
  }

  prepareForNowTurn() {
    this.racketLeft.moveToStart();
    this.racketRight.moveToStart();
    this.moveBallToStart();
    this.playerTurn = whoWillStartFirst(this.gameMode);
  }

  resetGame() {
    this.pauseGame();
    this.setScore(0, 0);
    this.prepareForNowTurn();
    this.setGameState(GameState.RESET);
  }

  dispose() {
    clearInterval(this.rendererTimerRef);
    this.canvas.dispose();
    window.removeEventListener("keydown", this.keyDownEventListener);
  }

  ballTouchedToSide(side: PlayerType) {
    this.setGameState(GameState.OVER);

    if (side === PlayerType.Left) {
      this.setScore(this.playerLeftScore, this.playerRightScore + 1);
      this.playerTurn = PlayerType.Left;
    } else {
      this.setScore(this.playerLeftScore + 1, this.playerRightScore);
      this.playerTurn = PlayerType.Right;
    }

    setTimeout(() => this.prepareForNowTurn(), 500);
  }

  handleUserKeyPress(event: globalThis.KeyboardEvent) {
    const { code } = event;

    if (code === "Space") {
      switch (this.gameState) {
        case GameState.OVER: {
          this.playGame();
          break;
        }
        case GameState.RESET: {
          this.playGame();
          break;
        }
        case GameState.PLAYING: {
          this.pauseGame();
          break;
        }
        case GameState.PAUSE: {
          this.playGame();
          break;
        }
        default:
          break;
      }
    }

    if (this.gameState === GameState.PLAYING) {
      if (code === "ArrowLeft" || code === "ArrowUp") {
        this.racketRight.moveUp();
      }
      if (code === "ArrowRight" || code === "ArrowDown") {
        this.racketRight.moveDown();
      }

      if (code === "KeyA" || code === "KeyW") {
        this.racketLeft.moveUp();
      }
      if (code === "KeyD" || code === "KeyS") {
        this.racketLeft.moveDown();
      }
    }
  }
}

export default GameEngine;
