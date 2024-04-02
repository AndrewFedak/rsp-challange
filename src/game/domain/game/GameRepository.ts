import { Game } from './Game';

export const GAME_REPOSITORY_TOKEN = 'GAME_REPOSITORY_TOKEN';

export interface IGameRepository {
  newId: () => string;
  findById: (id: string) => Promise<Game | null>;
  create: (game: Game) => Promise<void>;
  save: (account: Game | Game[]) => Promise<void>;
}
