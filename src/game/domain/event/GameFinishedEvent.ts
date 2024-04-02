import { IEvent } from '@nestjs/cqrs';

export class GameFinishedEvent implements IEvent {
  constructor(
    readonly accountId: string,
    readonly email: string,
  ) {}
}
