import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export type CheckDuplicate =
  | CheckEmailDuplicateDto
  | CheckNicknameDuplicateDto
  | CheckApiKeyDuplicateDto;

export class CheckEmailDuplicateDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  email: string;
}

export class CheckNicknameDuplicateDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  nickname: string;
}

export class CheckApiKeyDuplicateDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  apiKey: string;
}
