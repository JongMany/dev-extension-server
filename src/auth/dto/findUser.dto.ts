import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class FindUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  apiKey: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  email: string;
}
