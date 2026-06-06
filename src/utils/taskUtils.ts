import type {
    FlexibleTask,
    Priority,
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

  const priorityWeights: Record<Priority, number> = {
    low: 1,
    medium: 2,
    high: 3,
};

  export function sortTasksForScheduling(
    tasks: ScheduledFlexibleTask[]
  ): ScheduledFlexibleTask[] {
    const sortedTasks = [...tasks];
    return sortedTasks.sort((a, b) => {
        const priorityDiff = priorityWeights[b.priority] - priorityWeights[a.priority];
        return priorityDiff !== 0 ? priorityDiff : b.energyCost - a.energyCost;
    });
  }
  