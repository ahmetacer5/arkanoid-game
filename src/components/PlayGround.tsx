import { useEffect, useState } from "react";
import GameEngine from "../core/GameEngine";
import { GameMode, GameState } from "../enums";
import ActionButtons from "./ActionButtons";
import GameInstructions from "./GameInstructions";
import GameModeSelector from "./GameModeSelector";
import ScoreIndicator from "./ScoreIndicator";

const canvasId = "game-canvas";

const PlayGround = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.RESET);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.LEFT_VS_COMPUTER);
  const [gameEngine, setGameEngine] = useState<GameEngine>();

  useEffect(() => {
    const engine = new GameEngine(canvasId, gameMode);
    engine.onGameStateChange = setGameState;
    setGameEngine(engine);
    setGameState(engine.gameState);
    return () => {
      engine.dispose();
    };
  }, [gameMode]);

  return (
    <>
      <ScoreIndicator gameEngine={gameEngine} />
      <canvas id={canvasId} />
      <GameModeSelector value={gameMode} onChange={setGameMode} />
      <ActionButtons
        gameState={gameState}
        onPauseClick={() => gameEngine?.pauseGame()}
        onPlayClick={() => gameEngine?.playGame()}
        onResetClick={() => gameEngine?.resetGame()}
      />
      <GameInstructions />
    </>
  );
};
export default PlayGround;
