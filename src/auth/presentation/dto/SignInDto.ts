import { IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  name: string;
}
