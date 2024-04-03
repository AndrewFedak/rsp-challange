import { IEvent } from '@nestjs/cqrs';

export class ChoiceMadeEvent implements IEvent {
  constructor(readonly gameId: string) {}
}
