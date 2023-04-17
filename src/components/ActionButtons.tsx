import { GameState } from "../enums";

export interface Props {
  gameState: GameState;
  onPlayClick?: () => void;
  onPauseClick?: () => void;
  onResetClick?: () => void;
}

const ActionButtons = ({
  gameState,
  onPauseClick,
  onPlayClick,
  onResetClick,
}: Props) => (
  <div>
    <button onClick={onPlayClick} disabled={gameState === GameState.PLAYING}>
      play
    </button>
    <button onClick={onPauseClick} disabled={gameState !== GameState.PLAYING}>
      pause
    </button>
    <button onClick={onResetClick} disabled={gameState === GameState.PLAYING}>
      reset
    </button>
  </div>
);

export default ActionButtons;
