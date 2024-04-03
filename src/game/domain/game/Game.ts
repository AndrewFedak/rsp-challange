import { GameSnapshot } from './GameSnapshot';
import { Player } from '../player/Player';

export class Game {
  constructor(
    private id: string,
    private host: Player,
    private opponent: Player,
    private winner: Player | null = null,
  ) {}

  setWinner(winner: Player) {
    this.winner = winner;
  }

  restart() {
    if (!this.isFinished()) {
      throw new Error("Can't reset game that is InProgress");
    }
    this.reset();
  }

  reset() {
    this.winner = null;
    this.host.resetChoice();
    this.opponent.resetChoice();
  }

  getHost() {
    return this.host;
  }

  getOpponent() {
    return this.opponent;
  }

  isFinished(): boolean {
    return !!this.winner;
  }

  getSnapshot(): GameSnapshot {
    return new GameSnapshot(
      this.id,
      this.host.getSnapshot(),
      this.opponent?.getSnapshot(),
      this.winner?.getSnapshot(),
    );
  }
}
