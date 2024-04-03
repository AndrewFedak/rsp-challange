import { WsResponse } from '@nestjs/websockets';
import { IsEnum, IsString } from 'class-validator';
import { GameChoice } from 'src/game/domain/player/Player';

export class MakeChoiceEventDto {
  @IsString()
  userId: string;

  @IsString()
  gameId: string;

  @IsEnum(GameChoice)
  choice: GameChoice;
}

export class MakeChoiceEventResponseDto implements WsResponse {
  constructor(
    public event: string,
    public data: string,
  ) {}
}
