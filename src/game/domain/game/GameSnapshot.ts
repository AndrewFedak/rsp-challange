import { PlayerSnapshot } from '../player/PlayerSnapshot';

export class GameSnapshot {
  constructor(
    public id: string,
    public host: PlayerSnapshot,
    public opponent: PlayerSnapshot | null,
    public winner: PlayerSnapshot | null,
  ) {}
}
