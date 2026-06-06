import type { DayPlan, ScheduledFlexibleTask, WeekPlan } from "../types/planner";
import {
  canAddTaskToDay,
  canAddTaskToLightDay,
  canAddTaskToRestDay,
} from "./plannerRules";
import { calculateDayEnergy } from "./weekUtils";

function canAddTaskRespectingDayMode(
    day: DayPlan,
    task: ScheduledFlexibleTask
  ): boolean {
    if (day.isRestDay) {
        return canAddTaskToRestDay(day, task);
    }
    if (day.isLightDay) {
        return canAddTaskToLightDay(day, task);
    }
    return canAddTaskToDay(day, task);
  }

  export function findBestDayForTask(
    week: WeekPlan,
    task: ScheduledFlexibleTask
  ): DayPlan | undefined {
    const availableDays = week.filter((day) =>
      canAddTaskRespectingDayMode(day, task)
    );
  
    if (availableDays.length === 0) {
      return undefined;
    }
  
    return availableDays.reduce((bestDay, currentDay) => {
      const bestDayEnergy = calculateDayEnergy(bestDay);
      const currentDayEnergy = calculateDayEnergy(currentDay);
  
      return currentDayEnergy < bestDayEnergy ? currentDay : bestDay;
    });
  }