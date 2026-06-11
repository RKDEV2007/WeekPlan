import type { DayPlan } from "../types/planner";

export function DayCard({ dayPlan }: { dayPlan: DayPlan }) {
  return (
    <article className="day-card">
      <h3>{dayPlan.day}</h3>
      <p>Energy: {dayPlan.totalEnergy}</p>
      <p>Status: {dayPlan.status}</p>

      <section>
        <h4>Fixed events</h4>
        {dayPlan.fixedEvents.length === 0 ? (
          <p>No fixed events</p>
        ) : (
          <ul>
            {dayPlan.fixedEvents.map((event) => (
              <li key={event.id}>
                <strong>{event.title}</strong>
                {event.startTime || event.endTime
                  ? ` — ${event.startTime || "no start time"} - ${event.endTime || "no end time"}`
                  : ""}
                , energy: {event.energyCost}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h4>Flexible tasks</h4>
        {dayPlan.flexibleTasks.length === 0 ? (
          <p>No flexible tasks</p>
        ) : (
          <ul>
            {dayPlan.flexibleTasks.map((task) => (
              <li key={task.instanceId}>
                <strong>{task.title}</strong> — priority: {task.priority},
                duration: {task.durationMinutes} min, energy: {task.energyCost}
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
