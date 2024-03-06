import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { GoalService } from 'src/goal/goal.service';
import { JwtDto } from 'src/types/jwtDto.types';

@Controller('goal')
@UseGuards(AuthGuard('access'))
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Get('/all')
  async getAllGoals(@Req() req: JwtDto, @Res() res: Response) {
    const { email } = req.user;
    const goals = await this.goalService.getAllGoals(email);

    return res.status(HttpStatus.OK).json({ goals });
  }

  @Get('/:date')
  getGoalByDate(@Req() req: JwtDto, @Res() res: Response) {
    const { email } = req.user;
  }

  @Post('/create')
  createGoal(@Req() req: JwtDto, @Res() res: Response) {
    const { email } = req.user;
    return 'create goal';
  }
}
