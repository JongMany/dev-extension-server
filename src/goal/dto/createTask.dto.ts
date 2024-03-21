import { IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  // @IsDateString()
  @IsString()
  dueDate: string;

  // @IsDateString()
  @IsString()
  createdAt: string;

  @IsString()
  @MinLength(1)
  projectName: string;

  @IsString()
  @MinLength(1)
  task: string;

  @IsString()
  @MinLength(1)
  owner: string;
}
