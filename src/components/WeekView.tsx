import type { WeekPlan } from "../types/planner";
import "./WeekView.css";
import { DayCard } from "./DayCard";

export function WeekView({ weekPlan }: { weekPlan: WeekPlan }) {
  return (
    <div className="week-view">
      {weekPlan.map((dayPlan) => (
        <DayCard key={dayPlan.day} dayPlan={dayPlan} />
      ))}
    </div>
  );
}