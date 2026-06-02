export type WeekDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type EnergyCost = number;

export type Priority = 'low' | 'medium' | 'high';

export type DayStatus = 'rest' | 'light' | 'normal' | 'heavy' | 'overloaded';

export type FixedEvent = {
  id: string;
  title: string;
  day: WeekDay;
  startTime?: string;
  endTime?: string;
  energyCost: EnergyCost;
};

export type FlexibleTask = {
  id: string;
  title: string;
  durationMinutes: number;
  priority: Priority;
  energyCost: EnergyCost;
  frequencyPerWeek?: number;
  deadlineDay?: WeekDay;
};

export type ScheduledFlexibleTask = Omit<
  FlexibleTask,
  'frequencyPerWeek'
> & {
  sourceTaskId: string;
  instanceId: string;
};

export type DayPlan = {
  day: WeekDay;
  fixedEvents: FixedEvent[];
  flexibleTasks: ScheduledFlexibleTask[];
  totalEnergy: number;
  status: DayStatus;
  isRestDay?: boolean;
  isLightDay?: boolean;
};

export type WeekPlan = DayPlan[];

export type GenerateWeekResult = {
  weekPlan: WeekPlan;
  unscheduledTasks: ScheduledFlexibleTask[];
  warnings: string[];
};