import { fireEvent, render, screen } from "@testing-library/react";
import { GameState } from "../../enums";
import ActionButtons from "../ActionButtons";

describe("ActionButtons", () => {
  it("should render the buttons with the correct disabled state when gameState is GameState.PLAYING", () => {
    render(<ActionButtons gameState={GameState.PLAYING} />);

    const playButton = screen.getByText("play");
    expect(playButton).toBeDisabled();

    const pauseButton = screen.getByText("pause");
    expect(pauseButton).not.toBeDisabled();

    const resetButton = screen.getByText("reset");
    expect(resetButton).toBeDisabled();
  });
  it("should render the buttons with the correct disabled state when gameState is not GameState.PLAYING", () => {
    render(<ActionButtons gameState={GameState.PAUSE} />);

    const playButton = screen.getByText("play");
    expect(playButton).not.toBeDisabled();

    const pauseButton = screen.getByText("pause");
    expect(pauseButton).toBeDisabled();

    const resetButton = screen.getByText("reset");
    expect(resetButton).not.toBeDisabled();
  });

  it("should call the correct callback function when buttons are clicked and on GameState.PLAYING mode", () => {
    const onPlayClick = jest.fn();
    const onPauseClick = jest.fn();
    const onResetClick = jest.fn();

    render(
      <ActionButtons
        gameState={GameState.PLAYING}
        onPlayClick={onPlayClick}
        onPauseClick={onPauseClick}
        onResetClick={onResetClick}
      />
    );

    fireEvent.click(screen.getByText("play"));
    expect(onPlayClick).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText("pause"));
    expect(onPauseClick).toHaveBeenCalled();

    fireEvent.click(screen.getByText("reset"));
    expect(onResetClick).not.toHaveBeenCalled();
  });

  it("should call the correct callback function when buttons are clicked and on not GameState.PLAYING mode", () => {
    const onPlayClick = jest.fn();
    const onPauseClick = jest.fn();
    const onResetClick = jest.fn();

    render(
      <ActionButtons
        gameState={GameState.PAUSE}
        onPlayClick={onPlayClick}
        onPauseClick={onPauseClick}
        onResetClick={onResetClick}
      />
    );

    fireEvent.click(screen.getByText("play"));
    expect(onPlayClick).toHaveBeenCalled();

    fireEvent.click(screen.getByText("pause"));
    expect(onPauseClick).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText("reset"));
    expect(onResetClick).toHaveBeenCalled();
  });
});
