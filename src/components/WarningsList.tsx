export function WarningsList({ warnings }: { warnings: string[] }) {
    return (
      <section>
        <h2>Warnings</h2>
  
        {warnings.length === 0 ? (
          <p>No warnings</p>
        ) : (
          <ul>
            {warnings.map((warning, index) => (
              <li key={`${warning}-${index}`}>{warning}</li>
            ))}
          </ul>
        )}
      </section>
    );
  }