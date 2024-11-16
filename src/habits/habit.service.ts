import { Injectable } from '@nestjs/common';
import { HabitRepository } from './habit.repository';
import { CreateHabitDto, UpdateHabitDto, CompleteHabitDto } from './dto/habit.dto';
import { Habit } from './schemas/habit.schema';

@Injectable()
export class HabitService {
  constructor(private readonly habitRepository: HabitRepository) {}

  createHabit(createHabitDto: CreateHabitDto) {
    return this.habitRepository.create(createHabitDto);
  }

  getAllHabits() {
    return this.habitRepository.findAll();
  }

  getAllHabitsWithArchieve() {
    return this.habitRepository.fetchAll();
  }

  getHabitById(id: string) {
    return this.habitRepository.findById(id);
  }

  updateHabit(id: string, updateHabitDto: UpdateHabitDto) {
    return this.habitRepository.update(id, updateHabitDto);
  }

  archiveHabit(id: string) {
    return this.habitRepository.archive(id);
  }

  markHabitComplete(id: string, completeHabitDto: CompleteHabitDto) {
    return this.habitRepository.markCompletion(id, completeHabitDto.date);
  }

  searchAndSortHabits(query: string, sortBy: keyof Habit) {
    return this.habitRepository.searchAndSort(query, sortBy);
  }

  motivationalMessage(promt: string) {
    return this.habitRepository.message(promt);
  }

}
