import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHabitDto, UpdateHabitDto } from './dto/habit.dto';
import { Habit, HabitDocument } from './schemas/habit.schema';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HabitRepository {
    constructor(@InjectModel(Habit.name) private habitModel: Model<HabitDocument>, private readonly configService: ConfigService) {
        const googleAIKey = this.configService.get<string>('GOOGLEAIAPI');

        console.log(googleAIKey)
        this.genAI = new GoogleGenerativeAI(googleAIKey);
    }
    private genAI: GoogleGenerativeAI;
    async create(createHabitDto: CreateHabitDto): Promise<Habit> {
        const newHabit = new this.habitModel(createHabitDto);
        return newHabit.save();
    }

    async findAll(): Promise<Habit[]> {
        return this.habitModel.find({ isArchived: false }).exec();
    }

    async fetchAll(): Promise<Habit[]> {
        return this.habitModel.find().exec();
    }

    async findById(id: string): Promise<Habit> {
        return this.habitModel.findById(id).exec();
    }

    async update(id: string, updateHabitDto: UpdateHabitDto): Promise<Habit> {
        return this.habitModel.findByIdAndUpdate(id, updateHabitDto, { new: true }).exec();
    }

    async archive(id: string): Promise<Habit> {
        return this.update(id, { isArchived: true });
    }

    // Mark completion of a habit
    async markCompletion(id: string, date: Date): Promise<Habit> {
        const habit = await this.habitModel.findById(id).exec();

        // Add the completion date to the habit's completedDates
        habit.completedDates.push(date);

        // Calculate and update the streak
        habit.streak = this.calculateStreak(habit.completedDates);

        // Save the updated habit
        return habit.save();
    }

    // Calculate streak based on completed dates
    private calculateStreak(completedDates: Date[]): number {
        // Sort the dates in ascending order
        completedDates.sort((a, b) => a.getTime() - b.getTime());

        let streak = 0;
        let currentStreak = 0;

        // Iterate through the sorted completedDates and calculate streak
        for (let i = 0; i < completedDates.length; i++) {
            // If it's the first date or if the current date is the previous date + 1 day
            if (i === 0 || this.isConsecutive(completedDates[i], completedDates[i - 1])) {
                currentStreak++;
            } else {
                // Reset streak if dates are not consecutive
                currentStreak = 1; // Start new streak
            }

            streak = Math.max(streak, currentStreak); // Keep track of the longest streak
        }

        return streak;
    }

    // Helper function to check if two dates are consecutive
    private isConsecutive(currentDate: Date, previousDate: Date): boolean {
        const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in one day
        return currentDate.getTime() - previousDate.getTime() === oneDay;
    }

    async searchAndSort(query: string, sortBy: keyof Habit): Promise<Habit[]> {
        return this.habitModel.find({ title: new RegExp(query, 'i') }).sort({ [sortBy]: 1 }).exec();
    }

    async message(promt: string): Promise<string> {
        const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const maxRetries = 5;
        let attempt = 0;

        while (attempt < maxRetries) {
            try {
                const result = await model.generateContent(promt);
                return result.response.text();
            } catch (error) {
                if (error.message.includes('503 Service Unavailable')) {
                    attempt++;
                    const waitTime = Math.pow(2, attempt) * 100; // Exponential backoff
                    await this.delay(waitTime);
                } else {
                    throw new HttpException('Error generating content', HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
        }

        throw new HttpException('Model is overloaded, please try again later.', HttpStatus.SERVICE_UNAVAILABLE);
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
