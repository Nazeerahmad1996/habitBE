import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { HabitService } from './habit.service';
import { CreateHabitDto, UpdateHabitDto, CompleteHabitDto } from './dto/habit.dto';
import { Habit } from './schemas/habit.schema';

@Controller('habits')
export class HabitController {
  constructor(private readonly habitService: HabitService) {}

  @Post()
  createHabit(@Body() createHabitDto: CreateHabitDto) {
    return this.habitService.createHabit(createHabitDto);
  }

  @Get()
  getAllHabits() {
    return this.habitService.getAllHabits();
  }

  @Get('/message')
  motivationalMessage(@Query('query') query: string,) {
    console.log('query: ', query);
    return this.habitService.motivationalMessage(query);
  }

  @Get('/all')
  getAllHabitsWithArchieve() {
    return this.habitService.getAllHabitsWithArchieve();
  }

  @Put(':id/archive')
  archiveHabit(@Param('id') id: string) {
    return this.habitService.archiveHabit(id);
  }

  @Put(':id/complete')
  markHabitComplete(@Param('id') id: string, @Body() completeHabitDto: CompleteHabitDto) {
    return this.habitService.markHabitComplete(id, completeHabitDto);
  }

  @Get('search')
  searchAndSortHabits(@Query('query') query: string, @Query('sortBy') sortBy: keyof Habit) {
    return this.habitService.searchAndSortHabits(query, sortBy);
  }

  @Get(':id')
  getHabitById(@Param('id') id: string) {
    return this.habitService.getHabitById(id);
  }

  @Put(':id')
  updateHabit(@Param('id') id: string, @Body() updateHabitDto: UpdateHabitDto) {
    return this.habitService.updateHabit(id, updateHabitDto);
  }
}
