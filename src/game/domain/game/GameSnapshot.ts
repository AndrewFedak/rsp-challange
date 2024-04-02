import { PlayerSnapshot } from '../player/PlayerSnapshot';
import { GameState } from './Game';

export class GameSnapshot {
  constructor(
    public id: string,
    public host: PlayerSnapshot,
    public opponent: PlayerSnapshot | null,
    public winner: PlayerSnapshot | null,
    public state: GameState,
  ) {}
}
