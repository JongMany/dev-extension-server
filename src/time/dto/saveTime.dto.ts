import { IsString, MaxLength, MinLength } from 'class-validator';

export class SaveTimeDto {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  apiKey: string;
  payload: TimePayload;
}

export class TimePayload {
  type: string;
  entity: string;
  extensionName: string;
  docs: string[];
  fileName: string;
  currentTime: string;
  lineNo: string; // Number
  lines: string; // Number
  cursorPos: string; // Number
  is_write: boolean;
  programmingTime: number; // 1000 = 1초
  project: string;
  project_root_count: number;
}
