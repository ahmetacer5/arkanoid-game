import { useEffect, useState } from "react";
import type GameEngine from "../core/GameEngine";

interface Props {
  gameEngine?: GameEngine;
}

const ScoreIndicator = ({ gameEngine }: Props) => {
  const [scoreBoard, setScoreBoard] = useState<string>("0 - 0");

  useEffect(() => {
    if (gameEngine) {
      gameEngine.onScoreUpdate = (left, right) =>
        setScoreBoard(`${left} - ${right}`);
    }
  }, [gameEngine]);

  return (
    <>
      <p>
        <strong>Score: </strong> {scoreBoard}
      </p>
    </>
  );
};

export default ScoreIndicator;
