import { IQuery } from '@nestjs/cqrs';

export class FindGameByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
