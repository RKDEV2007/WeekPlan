import { useEffect, useState } from "react";
import "./TimeSelect.css";

const HOURS = Array.from({ length: 24 }, (_, i) =>
  String(i).padStart(2, "0")
);

const MINUTES = Array.from({ length: 12 }, (_, i) =>
  String(i * 5).padStart(2, "0")
);

type TimeSelectProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function parseTime(value: string) {
  if (!value) {
    return { hour: "", minute: "" };
  }

  const [hour, minute] = value.split(":");
  return { hour: hour ?? "", minute: minute ?? "" };
}

export function TimeSelect({ id, label, value, onChange }: TimeSelectProps) {
  const parsed = parseTime(value);
  const [hour, setHour] = useState(parsed.hour);
  const [minute, setMinute] = useState(parsed.minute);

  useEffect(() => {
    const next = parseTime(value);
    setHour(next.hour);
    setMinute(next.minute);
  }, [value]);

  function emitTime(nextHour: string, nextMinute: string) {
    if (nextHour && nextMinute) {
      onChange(`${nextHour}:${nextMinute}`);
      return;
    }

    onChange("");
  }

  function handleHourChange(nextHour: string) {
    setHour(nextHour);
    emitTime(nextHour, minute);
  }

  function handleMinuteChange(nextMinute: string) {
    setMinute(nextMinute);
    emitTime(hour, nextMinute);
  }

  return (
    <div className="form-row">
      <span id={`${id}-label`}>{label}</span>
      <div
        className="time-select"
        role="group"
        aria-labelledby={`${id}-label`}
      >
        <select
          id={`${id}-hour`}
          className="time-select__field"
          value={hour}
          aria-label={`${label}: часы`}
          onChange={(e) => handleHourChange(e.target.value)}
        >
          <option value="">Часы</option>
          {HOURS.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        <span className="time-select__separator" aria-hidden="true">
          :
        </span>

        <select
          id={`${id}-minute`}
          className="time-select__field"
          value={minute}
          aria-label={`${label}: минуты`}
          onChange={(e) => handleMinuteChange(e.target.value)}
        >
          <option value="">Мин</option>
          {MINUTES.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
