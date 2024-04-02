import { GameSnapshot } from './GameSnapshot';
import { Player } from '../player/Player';

export enum GameState {
  InProgress = 'InProgress',
  Finished = 'Finished',
}

export class Game {
  constructor(
    private id: string,
    private host: Player,
    private opponent: Player | null = null,
    private winner: Player | null = null,
    private state: GameState = GameState.InProgress,
  ) {}

  setWinner(winner: Player) {
    this.state = GameState.Finished;
    this.winner = winner;
  }

  setOpponent(userId: string) {
    this.opponent = new Player(this.id, userId);
  }

  restart() {
    if (!this.isFinished()) {
      throw new Error("Can't reset game that is InProgress");
    }
    this.reset();
  }

  reset() {
    this.state = GameState.InProgress;
    this.winner = null;
  }

  getHost() {
    return this.host;
  }

  getOpponent() {
    return this.opponent;
  }

  isFinished(): boolean {
    return this.state === GameState.Finished;
  }

  isRoomFull() {
    return this.host && this.opponent;
  }

  getSnapshot(): GameSnapshot {
    return new GameSnapshot(
      this.id,
      this.host.getSnapshot(),
      this.opponent?.getSnapshot(),
      this.winner?.getSnapshot(),
      this.state,
    );
  }
}
