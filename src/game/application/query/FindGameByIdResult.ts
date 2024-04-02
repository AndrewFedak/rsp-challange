import { IQueryResult } from '@nestjs/cqrs';

export class FindGameByIdResult implements IQueryResult {
  public id: string;
  public host: ViewPlayer;
  public winner: ViewPlayer | null;
  public opponent: ViewPlayer | null;
  public state: string;
}

export class ViewPlayer {
  public choice: string;
  public name: string;
}
