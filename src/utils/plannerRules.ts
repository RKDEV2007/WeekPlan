import type { DayPlan, ScheduledFlexibleTask } from "../types/planner";
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

