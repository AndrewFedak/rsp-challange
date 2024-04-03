import { AggregateRoot } from '@nestjs/cqrs';

import { ChoiceMadeEvent } from 'src/game/application/event/ChoiceMadeEvent';

import { PlayerSnapshot } from './PlayerSnapshot';

export enum GameChoice {
  Rock = 'Rock',
  Paper = 'Paper',
  Scissors = 'Scissors',
}

export enum PlayerStatus {
  InGame = 'InGame',
  OutOfGame = 'OutOfGame',
}

export class Player extends AggregateRoot {
  constructor(
    private gameId: string,
    private userId: string,
    private status: PlayerStatus = PlayerStatus.InGame,
    private choice: GameChoice | null = null,
  ) {
    super();
  }

  setChoice(choice: GameChoice) {
    this.choice = choice;
    this.apply(new ChoiceMadeEvent(this.gameId));
  }

  getChoice() {
    return this.choice;
  }

  resetChoice() {
    this.choice = null;
  }

  disconnect() {
    this.status = PlayerStatus.OutOfGame;
  }

  connect() {
    this.status = PlayerStatus.InGame;
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
