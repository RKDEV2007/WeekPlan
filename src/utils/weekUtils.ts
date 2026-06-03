import type {
    DayPlan,
    DayStatus,
    WeekDay,
    WeekPlan,
    FixedEvent
  } from "../types/planner";
  
  export const WEEK_DAYS: WeekDay[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  
  export function createEmptyWeek(): WeekPlan {
    return WEEK_DAYS.map((day) => ({
      day,
      fixedEvents: [],
      flexibleTasks: [],
      totalEnergy: 0,
      status: "rest",
    }));
  }
  
  export function getDayStatus(totalEnergy: number): DayStatus {
    if (totalEnergy <= 2) return "rest";
    if (totalEnergy <= 5) return "light";
    if (totalEnergy <= 7) return "normal";
    if (totalEnergy <= 10) return "heavy";
  
    return "overloaded";
  }
  
  export function calculateDayEnergy(day: DayPlan): number {
    const fixedEnergy = day.fixedEvents.reduce(
      (sum, event) => sum + event.energyCost,
      0
    );
  
    const flexibleEnergy = day.flexibleTasks.reduce(
      (sum, task) => sum + task.energyCost,
      0
    );
  
    return fixedEnergy + flexibleEnergy;
  }
  
  export function updateDayStats(day: DayPlan): DayPlan {
    const totalEnergy = calculateDayEnergy(day);
    const status = getDayStatus(totalEnergy);
  
    return {
      ...day,
      totalEnergy,
      status,
    };
  }

  export function addFixedEventsToWeek(
    week: WeekPlan,
    events: FixedEvent[]
  ): WeekPlan {
    return week.map((dayPlan) => {
      const eventsForDay = events.filter(
        (event) => event.day === dayPlan.day
      );
  
      const updatedDay = {
        ...dayPlan,
        fixedEvents: [...dayPlan.fixedEvents, ...eventsForDay],
      };
  
      return updateDayStats(updatedDay);
    });
  }