import { useState } from "react";
import type { FixedEvent } from "../types/planner";

type FixedEventFormProps = {
  onAddFixedEvent: (event: FixedEvent) => void;
};

export function FixedEventForm({ onAddFixedEvent }: FixedEventFormProps) {
  const [fixedEvent, setFixedEvent] = useState<FixedEvent>({
    id: "",
    title: "",
    day: "monday",
    energyCost: 0,
    startTime: "",
    endTime: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fixedEvent.title.trim()) {
      return;
    }

    const newFixedEvent: FixedEvent = {
      ...fixedEvent,
      id: crypto.randomUUID(),
    };

    onAddFixedEvent(newFixedEvent);

    setFixedEvent({
      id: "",
      title: "",
      day: "monday",
      energyCost: 0,
      startTime: "",
      endTime: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={fixedEvent.title}
        onChange={(e) =>
          setFixedEvent({ ...fixedEvent, title: e.target.value })
        }
      />

      <select
        value={fixedEvent.day}
        onChange={(e) =>
          setFixedEvent({
            ...fixedEvent,
            day: e.target.value as FixedEvent["day"],
          })
        }
      >
        <option value="monday">Monday</option>
        <option value="tuesday">Tuesday</option>
        <option value="wednesday">Wednesday</option>
        <option value="thursday">Thursday</option>
        <option value="friday">Friday</option>
        <option value="saturday">Saturday</option>
        <option value="sunday">Sunday</option>
      </select>

      <input
        type="text"
        placeholder="Start Time"
        value={fixedEvent.startTime}
        onChange={(e) =>
          setFixedEvent({ ...fixedEvent, startTime: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="End Time"
        value={fixedEvent.endTime}
        onChange={(e) =>
          setFixedEvent({ ...fixedEvent, endTime: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Energy Cost"
        value={fixedEvent.energyCost}
        onChange={(e) =>
          setFixedEvent({
            ...fixedEvent,
            energyCost: Number(e.target.value),
          })
        }
      />

      <button type="submit">Add fixed event</button>
    </form>
  );
}