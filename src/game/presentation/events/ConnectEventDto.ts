import { WsResponse } from '@nestjs/websockets';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConnectEventDto {
  @IsString()
  @IsNotEmpty()
  gameId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class ConnectEventResponseDto implements WsResponse {
  constructor(
    public event: string,
    public data: string,
  ) {}
}
