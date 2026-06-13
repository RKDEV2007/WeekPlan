import type { DayPlan } from "../types/planner";
import "./DayCard.css";

function getStatusClass(status: DayPlan["status"]) {
  if (status === "overloaded") return "status-badge--overloaded";
  if (status === "heavy") return "status-badge--warning";
  if (status === "light" || status === "rest") return "status-badge--ok";
  return "status-badge--neutral";
}

export function DayCard({ dayPlan }: { dayPlan: DayPlan }) {
  return (
    <article className="day-card">
      <header className="day-card__header">
        <h3>{dayPlan.day}</h3>
        <div className="day-card__stats">
          <span>Энергия: {dayPlan.totalEnergy}</span>
          <span
            className={`status-badge ${getStatusClass(dayPlan.status)}`}
          >
            {dayPlan.status}
          </span>
        </div>
      </header>

      <section className="day-card__block">
        <h4>События</h4>
        {dayPlan.fixedEvents.length === 0 ? (
          <p className="empty-state">Нет событий</p>
        ) : (
          <ul>
            {dayPlan.fixedEvents.map((event) => (
              <li key={event.id} className="day-card__item">
                <strong>{event.title}</strong>
                {event.startTime || event.endTime
                  ? ` — ${event.startTime || "—"} – ${event.endTime || "—"}`
                  : ""}
                , энергия: {event.energyCost}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="day-card__block">
        <h4>Задачи</h4>
        {dayPlan.flexibleTasks.length === 0 ? (
          <p className="empty-state">Нет задач</p>
        ) : (
          <ul>
            {dayPlan.flexibleTasks.map((task) => (
              <li key={task.instanceId} className="day-card__item">
                <strong>{task.title}</strong> — {task.priority},{" "}
                {task.durationMinutes} мин, энергия: {task.energyCost}
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
