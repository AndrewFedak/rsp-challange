import { Game } from 'src/game/domain/game/Game';

export class CreateGameResponseDto {
  public gameId: string;
  public static fromGame(game: Game): CreateGameResponseDto {
    const gameSnapshot = game.getSnapshot();
    const createdGame = new CreateGameResponseDto();
    createdGame.gameId = gameSnapshot.id;
    return createdGame;
  }
}
