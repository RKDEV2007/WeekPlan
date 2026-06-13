import { useState } from "react";
import "./App.css";
import "./components/ItemList.css";
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
    setResult(null);
  }

  function handleAddFlexibleTask(task: FlexibleTask) {
    setFlexibleTasks((prev) => [...prev, task]);
    setResult(null);
  }

  function handleDeleteFixedEvent(id: string) {
    setFixedEvents((prev) => prev.filter((event) => event.id !== id));
    setResult(null);
  }

  function handleDeleteFlexibleTask(id: string) {
    setFlexibleTasks((prev) => prev.filter((task) => task.id !== id));
    setResult(null);
  }

  function handleGenerateWeek() {
    const generatedResult = generateWeekPlan(fixedEvents, flexibleTasks);
    setResult(generatedResult);
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>Week Planner</h1>
        <p className="app-subtitle">
          Добавьте события и задачи, затем сгенерируйте план на неделю
        </p>
      </header>

      <section className="app-section" aria-labelledby="fixed-event-heading">
        <h2 id="fixed-event-heading">Фиксированное событие</h2>
        <FixedEventForm onAddFixedEvent={handleAddFixedEvent} />
      </section>

      <section className="app-section" aria-labelledby="flexible-task-heading">
        <h2 id="flexible-task-heading">Гибкая задача</h2>
        <FlexibleTaskForm onAddFlexibleTask={handleAddFlexibleTask} />
      </section>

      <section className="app-section" aria-labelledby="fixed-events-list-heading">
        <h2 id="fixed-events-list-heading">События</h2>

        {fixedEvents.length === 0 ? (
          <p className="empty-state">Пока нет событий</p>
        ) : (
          <ul className="item-list">
            {fixedEvents.map((event) => (
              <li key={event.id} className="item-card">
                <div className="item-card__content">
                  <strong>{event.title}</strong>
                  <div className="item-card__meta">
                    {event.day}, {event.startTime || "—"} –{" "}
                    {event.endTime || "—"}, энергия: {event.energyCost}
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-danger"
                  aria-label={`Удалить событие ${event.title}`}
                  onClick={() => handleDeleteFixedEvent(event.id)}
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="app-section" aria-labelledby="flexible-tasks-list-heading">
        <h2 id="flexible-tasks-list-heading">Задачи</h2>

        {flexibleTasks.length === 0 ? (
          <p className="empty-state">Пока нет задач</p>
        ) : (
          <ul className="item-list">
            {flexibleTasks.map((task) => (
              <li key={task.id} className="item-card">
                <div className="item-card__content">
                  <strong>{task.title}</strong>
                  <div className="item-card__meta">
                    приоритет: {task.priority}, {task.durationMinutes} мин,
                    энергия: {task.energyCost}, частота:{" "}
                    {task.frequencyPerWeek ?? 1}
                    {task.deadlineDay
                      ? `, дедлайн: ${task.deadlineDay}`
                      : ""}
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-danger"
                  aria-label={`Удалить задачу ${task.title}`}
                  onClick={() => handleDeleteFlexibleTask(task.id)}
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="app-actions">
        <button
          type="button"
          className="btn-primary"
          onClick={handleGenerateWeek}
        >
          Сгенерировать неделю
        </button>
      </div>

      <section
        className="app-section app-section--result"
        aria-labelledby="result-heading"
      >
        <h2 id="result-heading">Результат</h2>

        {result === null ? (
          <p className="empty-state">Нажмите «Сгенерировать неделю»</p>
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
