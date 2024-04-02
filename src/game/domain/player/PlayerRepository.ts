import { Game } from '../game/Game';
import { Player } from './Player';

export const PLAYER_REPOSITORY_TOKEN = 'PLAYER_REPOSITORY_TOKEN';

export interface IPlayerRepository {
  create: (player: Player) => Promise<void>;
  save: (player: Player) => Promise<void>;
  find: (game: Game, userId: string) => Promise<Player | null>;
}
