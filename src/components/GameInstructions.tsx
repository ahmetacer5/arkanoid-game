const GameInstructions = () => {
  return (
    <>
      <p>
        <strong>The game has four modes: </strong>
      </p>
      <ul>
        <li>Computer vs Computer</li>
        <li>Computer vs Right</li>
        <li>Left vs Computer</li>
        <li>Left vs Right</li>
      </ul>
      <p>
        <strong>The game has three player types:</strong>
      </p>
      <ul>
        <li>
          <strong>Computer</strong> player plays automatically.
        </li>
        <li>
          <strong>Left</strong> player controls the game with{" "}
          <strong>A, W</strong> keys from keyboard to move the racket up and{" "}
          <strong>S, D</strong> keys to move down.
        </li>
        <li>
          <strong>Right</strong> player controls the game with{" "}
          <strong>ArrowLeft, ArrowUp</strong> keys from keyboard to move the
          racket up and <strong>ArrowRight, ArrowDown</strong> keys to move
          down.
        </li>
      </ul>

      <p>
        To start the game, you can either click on the <strong>Play</strong>{" "}
        button on the screen using your mouse, or press the{" "}
        <strong>Space</strong> bar on your keyboard. Once you have started the
        game, the ball will begin moving and you can start playing.
      </p>
      <p>
        Remember! in the game the objective is to keep the ball in play by
        hitting it back and forth with your racket. If you miss the ball and it
        goes past your racket, the other player scores a point.
      </p>
      <p>
        The game never ends!, once you had enough of playing you can check your
        score at the top of the screen and you can use <strong>Reset</strong>{" "}
        button to restart the game
      </p>
    </>
  );
};

export default GameInstructions;
