import type { DayPlan, ScheduledFlexibleTask, WeekPlan } from "../types/planner";
import { calculateDayEnergy } from "./weekUtils";

export function canAddTaskToDay(
    day: DayPlan,
    task: ScheduledFlexibleTask
  ): boolean {
    const currentEnergy = calculateDayEnergy(day);
    const energyAfterAddingTask = currentEnergy + task.energyCost;
    return energyAfterAddingTask <= 10;
  }

  export function canAddTaskToRestDay(
    day: DayPlan,
    task: ScheduledFlexibleTask
  ): boolean {
    const currentEnergy = calculateDayEnergy(day);
    const energyAfterAddingTask = currentEnergy + task.energyCost;
  
    return energyAfterAddingTask <= 2;
  }
  
  export function canAddTaskToLightDay(
    day: DayPlan,
    task: ScheduledFlexibleTask
  ): boolean {
    const currentEnergy = calculateDayEnergy(day);
    const energyAfterAddingTask = currentEnergy + task.energyCost;
  
    return energyAfterAddingTask <= 5;
  }

  export function isDayOverloaded(day: DayPlan): boolean {
    return calculateDayEnergy(day) > 10;
  }

  export function getOverloadedFixedDaysWarnings(week: WeekPlan): string[] {
    return week
      .filter((day) => {
        const fixedEnergy = day.fixedEvents.reduce(
          (sum, event) => sum + event.energyCost,
          0
        );
  
        return fixedEnergy > 10;
      })
      .map((day) => `Fixed events on ${day.day} exceed energy limit`);
  }