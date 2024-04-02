import { GameChoice } from '../game/EvaluateWinner';
import { PlayerSnapshot } from './PlayerSnapshot';

export enum PlayerStatus {
  InGame = 'InGame',
  MadeChoice = 'MadeChoice',
  OutOfGame = 'OutOfGame',
}

export class Player {
  constructor(
    private gameId: string,
    private userId: string,
    private status: PlayerStatus = PlayerStatus.InGame,
    private choice: GameChoice | null = null,
  ) {}

  setChoice(choice: GameChoice) {
    this.choice = choice;
  }

  getChoice() {
    return this.choice;
  }

  doesMadeChoice() {
    return !!this.choice;
  }

  isEqual(otherPlayer: Player) {
    return this.userId === otherPlayer.userId;
  }

  getSnapshot(): PlayerSnapshot {
    return new PlayerSnapshot(
      this.gameId,
      this.userId,
      this.status,
      this.choice,
    );
  }
}
