import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Habit, HabitSchema } from './schemas/habit.schema';
import { HabitRepository } from './habit.repository';
import { HabitService } from './habit.service';
import { HabitController } from './habit.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Habit.name, schema: HabitSchema }])],
  providers: [HabitRepository, HabitService],
  controllers: [HabitController],
})
export class HabitModule {}
