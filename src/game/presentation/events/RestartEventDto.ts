import { WsResponse } from '@nestjs/websockets';
import { IsNotEmpty, IsString } from 'class-validator';

export class RestartEventDto {
  @IsString()
  @IsNotEmpty()
  gameId: string;
}

export class RestartEventResponseDto implements WsResponse {
  constructor(
    public event: string,
    public data: string,
  ) {}
}
