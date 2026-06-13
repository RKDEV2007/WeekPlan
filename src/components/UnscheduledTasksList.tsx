import type { ScheduledFlexibleTask } from "../types/planner";
import "./ItemList.css";
import "./WarningsList.css";

type UnscheduledTasksListProps = {
  tasks: ScheduledFlexibleTask[];
};

export function UnscheduledTasksList({ tasks }: UnscheduledTasksListProps) {
  if (tasks.length === 0) {
    return null;
  }

  return (
    <section
      className="warnings-section"
      aria-labelledby="unscheduled-heading"
    >
      <h2 id="unscheduled-heading">Незапланированные задачи</h2>
      <ul className="item-list">
        {tasks.map((task) => (
          <li key={task.instanceId} className="item-card">
            <div className="item-card__content">
              <strong>{task.title}</strong>
              <div className="item-card__meta">
                {task.durationMinutes} мин, приоритет: {task.priority},
                энергия: {task.energyCost}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
