import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CreateTaskDto } from 'src/goal/dto/createTask.dto';
import { UpdateTaskDto } from 'src/goal/dto/updateTask.dto';
import { GoalService } from 'src/goal/goal.service';
import { JwtDto } from 'src/types/jwtDto.types';

@Controller('goal')
@UseGuards(AuthGuard('access'))
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Get('/all')
  async getAllTasks(@Req() req: JwtDto, @Res() res: Response) {
    const { email } = req.user;
    const tasks = await this.goalService.getAllTasks(email);

    return res.status(HttpStatus.OK).json({ tasks });
  }

  @Get('/:email')
  async getGoalByEmail(@Param('email') email: string, @Res() res: Response) {
    // const { email } = req.user;
    const tasks = await this.goalService.getAllTasks(email);
    return res.status(HttpStatus.OK).json({ tasks });
  }

  @Get('/:date')
  getGoalByDate(@Req() req: JwtDto, @Res() res: Response) {
    const { email } = req.user;
    return res.status(HttpStatus.OK).json({ email });
  }

  @Post('/')
  async createTask(
    @Req() req: JwtDto,
    @Body(ValidationPipe) createTaskDto: CreateTaskDto,
    @Res() res: Response,
  ) {
    const { email } = req.user;
    // console.log(email);
    try {
      const task = await this.goalService.createTask(createTaskDto, email);
      return res.status(HttpStatus.OK).json({ task });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error });
    }
  }

  @Patch('/:id')
  async updateTask(
    @Req() req: JwtDto,
    @Body(ValidationPipe) taskForm: UpdateTaskDto,
    @Param('id') taskId: string,
    @Res() res: Response,
  ) {
    const { email } = req.user;
    try {
      const task = await this.goalService.updateTask(taskForm, taskId);
      return res.status(HttpStatus.OK).json({ task });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error });
    }
  }

  @Delete('/:id')
  removeTask(
    @Req() req: JwtDto,
    @Param('id') taskId: string,
    @Res() res: Response,
  ) {
    const { email } = req.user;
    try {
      const removedTask = this.goalService.removeTask(taskId);
      return res.status(HttpStatus.OK).json({ email });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error });
    }
    // const
    // return res.status(HttpStatus.OK).json({ email });
  }
}
