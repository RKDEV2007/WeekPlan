import { useState } from "react";
import "./Form.css";
import type { FixedEvent } from "../types/planner";

type FixedEventFormProps = {
  onAddFixedEvent: (event: FixedEvent) => void;
};

const initialFixedEvent: FixedEvent = {
  id: "",
  title: "",
  day: "monday",
  energyCost: 0,
  startTime: "",
  endTime: "",
};

export function FixedEventForm({ onAddFixedEvent }: FixedEventFormProps) {
  const [error, setError] = useState("");
  const [fixedEvent, setFixedEvent] =
    useState<FixedEvent>(initialFixedEvent);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!fixedEvent.title.trim()) {
      setError("Укажите название");
      return;
    }

    if (!fixedEvent.day) {
      setError("Выберите день");
      return;
    }

    if (!fixedEvent.startTime) {
      setError("Укажите время начала");
      return;
    }

    if (!fixedEvent.endTime) {
      setError("Укажите время окончания");
      return;
    }

    if (fixedEvent.startTime >= fixedEvent.endTime) {
      setError("Время начала должно быть раньше окончания");
      return;
    }

    if (fixedEvent.energyCost <= 0) {
      setError("Энергия должна быть больше 0");
      return;
    }

    const newFixedEvent: FixedEvent = {
      ...fixedEvent,
      id: crypto.randomUUID(),
      title: fixedEvent.title.trim(),
    };

    onAddFixedEvent(newFixedEvent);

    setFixedEvent(initialFixedEvent);
    setError("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="fixed-event-title">Название</label>
        <input
          id="fixed-event-title"
          type="text"
          placeholder="Например: Встреча с командой"
          value={fixedEvent.title}
          onChange={(e) =>
            setFixedEvent({
              ...fixedEvent,
              title: e.target.value,
            })
          }
        />
      </div>

      <div className="form-row">
        <label htmlFor="fixed-event-day">День</label>
        <select
          id="fixed-event-day"
          value={fixedEvent.day}
          onChange={(e) =>
            setFixedEvent({
              ...fixedEvent,
              day: e.target.value as FixedEvent["day"],
            })
          }
        >
          <option value="monday">Понедельник</option>
          <option value="tuesday">Вторник</option>
          <option value="wednesday">Среда</option>
          <option value="thursday">Четверг</option>
          <option value="friday">Пятница</option>
          <option value="saturday">Суббота</option>
          <option value="sunday">Воскресенье</option>
        </select>
      </div>

      <div className="form-row">
        <label htmlFor="fixed-event-start">Начало</label>
        <input
          id="fixed-event-start"
          type="time"
          value={fixedEvent.startTime}
          onChange={(e) =>
            setFixedEvent({
              ...fixedEvent,
              startTime: e.target.value,
            })
          }
        />
      </div>

      <div className="form-row">
        <label htmlFor="fixed-event-end">Окончание</label>
        <input
          id="fixed-event-end"
          type="time"
          value={fixedEvent.endTime}
          onChange={(e) =>
            setFixedEvent({
              ...fixedEvent,
              endTime: e.target.value,
            })
          }
        />
      </div>

      <div className="form-row">
        <label htmlFor="fixed-event-energy">Энергия</label>
        <input
          id="fixed-event-energy"
          type="number"
          placeholder="1"
          min="1"
          value={fixedEvent.energyCost || ""}
          onChange={(e) =>
            setFixedEvent({
              ...fixedEvent,
              energyCost: Number(e.target.value),
            })
          }
        />
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

      <div className="form-actions">
        <button type="submit" className="btn-secondary">
          Добавить событие
        </button>
      </div>
    </form>
  );
}
