import { IsString } from 'class-validator';

export class CreateGameRequestDto {
  @IsString()
  public opponentId: string;
}
