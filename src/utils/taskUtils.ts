import type {
    FlexibleTask,
    ScheduledFlexibleTask,
  } from "../types/planner";

  export function expandFlexibleTasks(
    tasks: FlexibleTask[]
  ): ScheduledFlexibleTask[] {
    const scheduledTasks: ScheduledFlexibleTask[] = [];
  
    for (const task of tasks) {
      const frequency = task.frequencyPerWeek ?? 1;
      const { frequencyPerWeek, ...taskWithoutFrequency } = task;
  
      for (let i = 0; i < frequency; i++) {
        const scheduledTask: ScheduledFlexibleTask = {
          ...taskWithoutFrequency,
          sourceTaskId: task.id,
          instanceId: `${task.id}-${i + 1}`,
        };
  
        scheduledTasks.push(scheduledTask);
      }
    }
  
    return scheduledTasks;
  }