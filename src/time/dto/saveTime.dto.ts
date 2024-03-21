import { IsString, MaxLength, MinLength } from 'class-validator';

export class SaveTimeDto {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  apiKey: string;
}
