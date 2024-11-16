export class CreateHabitDto {
    title: string;
    description: string;
    goal: string;
    priority: 'High' | 'Medium' | 'Low';
  }
  
  export class UpdateHabitDto {
    title?: string;
    description?: string;
    goal?: string;
    priority?: 'High' | 'Medium' | 'Low';
    isArchived?: boolean;
  }
  
  export class CompleteHabitDto {
    date: Date;
  }
  