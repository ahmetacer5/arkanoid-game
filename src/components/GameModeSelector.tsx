import { GameMode } from "../enums";

interface Props {
  value: GameMode;
  onChange: (mode: GameMode) => void;
}

const GameModeSelector = ({ value, onChange }: Props) => {
  const onSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) =>
    onChange(event.target.value as GameMode);

  return (
    <div>
      <label htmlFor="game-mode-selector">Game mode:</label>
      <select id="game-mode-selector" value={value} onChange={onSelectHandler}>
        <option value={GameMode.COMPUTER_VS_COMPUTER}>
          {GameMode.COMPUTER_VS_COMPUTER}
        </option>
        <option value={GameMode.COMPUTER_VS_RIGHT}>
          {GameMode.COMPUTER_VS_RIGHT}
        </option>
        <option value={GameMode.LEFT_VS_COMPUTER}>
          {GameMode.LEFT_VS_COMPUTER}
        </option>
        <option value={GameMode.LEFT_VS_RIGHT}>{GameMode.LEFT_VS_RIGHT}</option>
      </select>
    </div>
  );
};

export default GameModeSelector;
