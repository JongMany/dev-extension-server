import { Module, forwardRef } from '@nestjs/common';
import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';
import { GoalRepository } from 'src/goal/goal.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Goal, GoalSchema } from 'src/goal/goal.schema';
import { UserModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/user/user.schema';
// import { User, UserSchema } from 'src/user/user.schema';

@Module({
  imports: [
    forwardRef(() => UserModule),
    MongooseModule.forFeature([
      {
        name: Goal.name,
        schema: GoalSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [GoalController],
  providers: [GoalService, GoalRepository],
})
export class GoalModule {}
