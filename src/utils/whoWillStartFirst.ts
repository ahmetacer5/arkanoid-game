import GameMode from "../enums/GameMode.enum";
import PlayerType from "../enums/PlayerType.enum";

function whoWillStartFirst(mode: GameMode) {
  if (mode === GameMode.COMPUTER_VS_RIGHT) {
    return PlayerType.Right;
  }

  return PlayerType.Left;
}

export default whoWillStartFirst;
