import "./Form.css";

const TIME_SLOTS = Array.from({ length: 24 * 4 }, (_, index) => {
  const totalMinutes = index * 15;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
});

type TimeSelectProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export function TimeSelect({ id, label, value, onChange }: TimeSelectProps) {
  return (
    <div className="form-row">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Выберите время</option>
        {TIME_SLOTS.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );
}
