import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Habit extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  goal: string;

  @Prop({ default: 0 })
  streak: number;

  @Prop({ default: 'Medium' })
  priority: 'High' | 'Medium' | 'Low';

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: false })
  isArchived: boolean;

  @Prop({ type: [Date], default: [] })
  completedDates: Date[];
}

export const HabitSchema = SchemaFactory.createForClass(Habit);
export type HabitDocument = Habit & Document;
