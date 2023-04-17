import { GameMode, PlayerType } from "../../enums";
import whoWillStartFirst from "../whoWillStartFirst";

describe("whoWillStartFirst", () => {
  it("should return Right when mode is COMPUTER_VS_RIGHT", () => {
    const mode = GameMode.COMPUTER_VS_RIGHT;
    const result = whoWillStartFirst(mode);
    expect(result).toEqual(PlayerType.Right);
  });

  it("should return Left when mode is not COMPUTER_VS_RIGHT", () => {
    const mode = GameMode.COMPUTER_VS_COMPUTER;
    const result = whoWillStartFirst(mode);
    expect(result).toEqual(PlayerType.Left);
  });
});
