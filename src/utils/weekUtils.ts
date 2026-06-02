import type { WeekDay, WeekPlan, DayStatus, DayPlan} from "../types/planner";

export const WEEK_DAYS: WeekDay[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export function createEmptyWeek(): WeekPlan {
    return WEEK_DAYS.map((day) => ({
        day,
        fixedEvents: [],
        flexibleTasks: [],
        totalEnergy: 0,
        status: 'rest'
    }));
}
//export type DayStatus = 'rest' | 'light' | 'normal' | 'heavy' | 'overloaded';
export function getDayStatus(totalEnergy: number): DayStatus {
    if (totalEnergy <= 2) return 'rest';
    if (totalEnergy <= 5) return 'light';
    if (totalEnergy <= 7) return 'normal';
    if (totalEnergy <= 10) return 'heavy';
    return 'overloaded';
}

export function calculateDayEnergy(day: DayPlan): number {
    return day.fixedEvents.reduce((sum, event) => sum + event.energyCost, 0) + day.flexibleTasks.reduce((sum, task) => sum + task.energyCost, 0);
}