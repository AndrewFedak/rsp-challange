import { WsResponse } from '@nestjs/websockets';
import { IsNotEmpty, IsString } from 'class-validator';

export class DisconnectEventDto {
  @IsString()
  @IsNotEmpty()
  gameId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class DisconnectEventResponseDto implements WsResponse {
  constructor(
    public event: string,
    public data: string,
  ) {}
}
