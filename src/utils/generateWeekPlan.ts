import type {
    FixedEvent,
    FlexibleTask,
    GenerateWeekResult,
    ScheduledFlexibleTask,
  } from "../types/planner";

  import {
    addFixedEventsToWeek,
    createEmptyWeek,
  } from "./weekUtils";
  
  import { getOverloadedFixedDaysWarnings } from "./plannerRules";
  
  import {
    expandFlexibleTasks,
    sortTasksForScheduling,
  } from "./taskUtils";
  
  import { scheduleTaskInWeek } from "./schedulingUtils";

  export function generateWeekPlan(
    fixedEvents: FixedEvent[],
    flexibleTasks: FlexibleTask[]
  ): GenerateWeekResult {
    const emptyWeek = createEmptyWeek();
    const weekWithFixedEvents = addFixedEventsToWeek(emptyWeek, fixedEvents);
  
    const fixedWarnings = getOverloadedFixedDaysWarnings(weekWithFixedEvents);
    const warnings = [...fixedWarnings];
  
    const expandedTasks = expandFlexibleTasks(flexibleTasks);
    const sortedTasks = sortTasksForScheduling(expandedTasks);
  
    let currentWeek = weekWithFixedEvents;
    const unscheduledTasks: ScheduledFlexibleTask[] = [];
  
    for (const task of sortedTasks) {
      const result = scheduleTaskInWeek(currentWeek, task);
  
      if (result.scheduled) {
        currentWeek = result.week;
      } else {
        unscheduledTasks.push(task);
      }
    }
  
    if (unscheduledTasks.length > 0) {
      const taskTitles = unscheduledTasks
        .map((task) => task.title)
        .join(", ");
  
      warnings.push(
        `Не удалось запланировать ${unscheduledTasks.length} задач: ${taskTitles}`
      );
    }
  
    return {
      weekPlan: currentWeek,
      unscheduledTasks,
      warnings,
    };
  }