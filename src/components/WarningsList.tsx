import "./WarningsList.css";

export function WarningsList({ warnings }: { warnings: string[] }) {
  if (warnings.length === 0) {
    return null;
  }

  return (
    <section className="warnings-section" aria-labelledby="warnings-heading">
      <h2 id="warnings-heading">Предупреждения</h2>
      <ul className="warning-list">
        {warnings.map((warning, index) => (
          <li key={`${warning}-${index}`} className="warning-item">
            {warning}
          </li>
        ))}
      </ul>
    </section>
  );
}
