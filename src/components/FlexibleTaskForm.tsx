import { useState } from "react";
import "./Form.css";
import type { FlexibleTask, Priority, WeekDay } from "../types/planner";

type FlexibleTaskFormProps = {
  onAddFlexibleTask: (task: FlexibleTask) => void;
};

export function FlexibleTaskForm({
  onAddFlexibleTask,
}: FlexibleTaskFormProps) {
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [energyCost, setEnergyCost] = useState("");
  const [frequencyPerWeek, setFrequencyPerWeek] = useState("");
  const [deadlineDay, setDeadlineDay] = useState<WeekDay | "">("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Укажите название");
      return;
    }

    const duration = Number(durationMinutes);
    const energy = Number(energyCost);
    const frequency = frequencyPerWeek
      ? Number(frequencyPerWeek)
      : undefined;

    if (duration <= 0) {
      setError("Длительность должна быть больше 0");
      return;
    }

    if (energy <= 0) {
      setError("Энергия должна быть больше 0");
      return;
    }

    if (frequency !== undefined && frequency <= 0) {
      setError("Частота должна быть больше 0");
      return;
    }

    const newTask: FlexibleTask = {
      id: crypto.randomUUID(),
      title: title.trim(),
      durationMinutes: duration,
      priority,
      energyCost: energy,
      frequencyPerWeek: frequency,
      deadlineDay: deadlineDay || undefined,
    };

    onAddFlexibleTask(newTask);

    setTitle("");
    setDurationMinutes("");
    setPriority("medium");
    setEnergyCost("");
    setFrequencyPerWeek("");
    setDeadlineDay("");
    setError("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="flexible-task-title">Название</label>
        <input
          id="flexible-task-title"
          type="text"
          placeholder="Например: Прочитать главу"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label htmlFor="flexible-task-duration">Длительность (мин)</label>
        <input
          id="flexible-task-duration"
          type="number"
          placeholder="30"
          min="1"
          value={durationMinutes}
          onChange={(e) => setDurationMinutes(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label htmlFor="flexible-task-priority">Приоритет</label>
        <select
          id="flexible-task-priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
        </select>
      </div>

      <div className="form-row">
        <label htmlFor="flexible-task-energy">Энергия</label>
        <input
          id="flexible-task-energy"
          type="number"
          placeholder="1"
          min="1"
          value={energyCost}
          onChange={(e) => setEnergyCost(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label htmlFor="flexible-task-frequency">Частота в неделю</label>
        <input
          id="flexible-task-frequency"
          type="number"
          placeholder="1"
          min="1"
          value={frequencyPerWeek}
          onChange={(e) => setFrequencyPerWeek(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label htmlFor="flexible-task-deadline">Дедлайн</label>
        <select
          id="flexible-task-deadline"
          value={deadlineDay}
          onChange={(e) => setDeadlineDay(e.target.value as WeekDay | "")}
        >
          <option value="">Без дедлайна</option>
          <option value="monday">Понедельник</option>
          <option value="tuesday">Вторник</option>
          <option value="wednesday">Среда</option>
          <option value="thursday">Четверг</option>
          <option value="friday">Пятница</option>
          <option value="saturday">Суббота</option>
          <option value="sunday">Воскресенье</option>
        </select>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

      <div className="form-actions">
        <button type="submit" className="btn-secondary">
          Добавить задачу
        </button>
      </div>
    </form>
  );
}
