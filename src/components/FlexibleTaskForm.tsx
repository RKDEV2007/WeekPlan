import { useState } from "react";
import type { FlexibleTask, Priority, WeekDay } from "../types/planner";

type FlexibleTaskFormProps = {
  onAddFlexibleTask: (task: FlexibleTask) => void;
};

export function FlexibleTaskForm({
  onAddFlexibleTask,
}: FlexibleTaskFormProps) {
  const [title, setTitle] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [energyCost, setEnergyCost] = useState("");
  const [frequencyPerWeek, setFrequencyPerWeek] = useState("");
  const [deadlineDay, setDeadlineDay] = useState<WeekDay | "">("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    const duration = Number(durationMinutes);
    const energy = Number(energyCost);
    const frequency = frequencyPerWeek ? Number(frequencyPerWeek) : undefined;

    if (duration <= 0 || energy <= 0) {
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
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Duration minutes"
        value={durationMinutes}
        onChange={(e) => setDurationMinutes(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        <option value="low">Low priority</option>
        <option value="medium">Medium priority</option>
        <option value="high">High priority</option>
      </select>

      <input
        type="number"
        placeholder="Energy cost"
        value={energyCost}
        onChange={(e) => setEnergyCost(e.target.value)}
      />

      <input
        type="number"
        placeholder="Frequency per week"
        value={frequencyPerWeek}
        onChange={(e) => setFrequencyPerWeek(e.target.value)}
      />

      <select
        value={deadlineDay}
        onChange={(e) => setDeadlineDay(e.target.value as WeekDay | "")}
      >
        <option value="">No deadline</option>
        <option value="monday">Monday</option>
        <option value="tuesday">Tuesday</option>
        <option value="wednesday">Wednesday</option>
        <option value="thursday">Thursday</option>
        <option value="friday">Friday</option>
        <option value="saturday">Saturday</option>
        <option value="sunday">Sunday</option>
      </select>

      <button type="submit">Add flexible task</button>
    </form>
  );
}