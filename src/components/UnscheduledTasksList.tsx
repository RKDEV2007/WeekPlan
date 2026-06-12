import type { ScheduledFlexibleTask } from "../types/planner";

type UnscheduledTasksListProps = {
  tasks: ScheduledFlexibleTask[];
};

export function UnscheduledTasksList({ tasks }: UnscheduledTasksListProps) {
  return (
    <section>
      <h2>Unscheduled Tasks</h2>

      {tasks.length === 0 ? (
        <p>No unscheduled tasks</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.instanceId}>
              <strong>{task.title}</strong>{" "}
              <span>Duration: {task.durationMinutes} min</span>{" "}
              <span>Priority: {task.priority}</span>{" "}
              <span>Energy: {task.energyCost}</span>{" "}
              <span>Instance: {task.instanceId}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}