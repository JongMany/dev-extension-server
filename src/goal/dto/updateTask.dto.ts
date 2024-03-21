import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateTaskDto {
  // @IsDateString()
  @IsOptional()
  @IsString()
  dueDate: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  projectName: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  task: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  owner: string;

  @IsOptional()
  @IsBoolean()
  isCompleted: boolean;
}
