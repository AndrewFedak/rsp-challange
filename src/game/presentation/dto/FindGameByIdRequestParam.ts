import { IsString } from 'class-validator';

export class FindGameByIdRequestParam {
  @IsString()
  readonly gameId: string;
}
