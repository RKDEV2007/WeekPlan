import { useState } from "react";
import type {
  FixedEvent,
  FlexibleTask,
  GenerateWeekResult,
} from "./types/planner";

import { FixedEventForm } from "./components/FixedEventForm";
import { FlexibleTaskForm } from "./components/FlexibleTaskForm";
import { WeekView } from "./components/WeekView";
import { WarningsList } from "./components/WarningsList";
import { UnscheduledTasksList } from "./components/UnscheduledTasksList";

import { generateWeekPlan } from "./utils/generateWeekPlan";

function App() {
  const [fixedEvents, setFixedEvents] = useState<FixedEvent[]>([]);
  const [flexibleTasks, setFlexibleTasks] = useState<FlexibleTask[]>([]);
  const [result, setResult] = useState<GenerateWeekResult | null>(null);

  function handleAddFixedEvent(event: FixedEvent) {
    setFixedEvents((prev) => [...prev, event]);
  }

  function handleAddFlexibleTask(task: FlexibleTask) {
    setFlexibleTasks((prev) => [...prev, task]);
  }

  function handleGenerateWeek() {
    const generatedResult = generateWeekPlan(fixedEvents, flexibleTasks);
    setResult(generatedResult);

    console.log("Generated week result:", generatedResult);
  }

  return (
    <main>
      <h1>Week Planner MVP</h1>

      <section>
        <h2>Add fixed event</h2>
        <FixedEventForm onAddFixedEvent={handleAddFixedEvent} />
      </section>

      <section>
        <h2>Add flexible task</h2>
        <FlexibleTaskForm onAddFlexibleTask={handleAddFlexibleTask} />
      </section>

      <section>
        <h2>Fixed events</h2>

        {fixedEvents.length === 0 ? (
          <p>No fixed events yet</p>
        ) : (
          <ul>
            {fixedEvents.map((event) => (
              <li key={event.id}>
                <strong>{event.title}</strong> — {event.day},{" "}
                {event.startTime || "no start time"} -{" "}
                {event.endTime || "no end time"}, energy: {event.energyCost}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Flexible tasks</h2>

        {flexibleTasks.length === 0 ? (
          <p>No flexible tasks yet</p>
        ) : (
          <ul>
            {flexibleTasks.map((task) => (
              <li key={task.id}>
                <strong>{task.title}</strong> — priority: {task.priority},
                duration: {task.durationMinutes} min, energy:{" "}
                {task.energyCost}, frequency: {task.frequencyPerWeek ?? 1}
                {task.deadlineDay ? `, deadline: ${task.deadlineDay}` : ""}
              </li>
            ))}
          </ul>
        )}
      </section>

      <button type="button" onClick={handleGenerateWeek}>
        Generate Week
      </button>

      <section>
        <h2>Generated result</h2>

        {result === null ? (
          <p>No generated result yet</p>
        ) : (
          <>
            <WarningsList warnings={result.warnings} />
            <WeekView weekPlan={result.weekPlan} />
            <UnscheduledTasksList tasks={result.unscheduledTasks} />
          </>
        )}
      </section>
    </main>
  );
}

export default App;