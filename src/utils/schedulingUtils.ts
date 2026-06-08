import type { DayPlan, ScheduledFlexibleTask, ScheduleTaskResult, WeekPlan } from "../types/planner";
import {
  canAddTaskToDay,
  canAddTaskToLightDay,
  canAddTaskToRestDay,
} from "./plannerRules";
import { addFlexibleTaskToDay, calculateDayEnergy } from "./weekUtils";

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

  export function scheduleTaskInWeek(
    week: WeekPlan,
    task: ScheduledFlexibleTask
  ): ScheduleTaskResult {
    const bestDay = findBestDayForTask(week, task);
  
    if (!bestDay) {
      return {
        week,
        scheduled: false,
      };
    }
  
    const updatedWeek = week.map((day) => {
      if (day.day === bestDay.day) {
        return addFlexibleTaskToDay(day, task);
      }
  
      return day;
    });
  
    return {
      week: updatedWeek,
      scheduled: true,
    };
  }