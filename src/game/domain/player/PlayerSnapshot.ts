import { GameChoice, PlayerStatus } from './Player';

export class PlayerSnapshot {
  constructor(
    public gameId: string,
    public userId: string,
    public status: PlayerStatus,
    public choice: GameChoice | null,
  ) {}
}
