import type { FlexibleTask } from "./types/planner";
import {
  expandFlexibleTasks,
  sortTasksForScheduling,
} from "./utils/taskUtils";

function App() {
  const flexibleTasks: FlexibleTask[] = [
    {
      id: "japanese",
      title: "Japanese",
      durationMinutes: 30,
      priority: "medium",
      energyCost: 2,
      frequencyPerWeek: 3,
    },
    {
      id: "pdd",
      title: "PDD",
      durationMinutes: 45,
      priority: "high",
      energyCost: 3,
    },
    {
      id: "design",
      title: "Design practice",
      durationMinutes: 60,
      priority: "low",
      energyCost: 4,
    },
    {
      id: "interview",
      title: "Interview preparation",
      durationMinutes: 60,
      priority: "high",
      energyCost: 5,
    },
  ];

  const expandedTasks = expandFlexibleTasks(flexibleTasks);
  const sortedTasks = sortTasksForScheduling(expandedTasks);

  console.log("expandedTasks:", expandedTasks);
  console.log("sortedTasks:", sortedTasks);

  return (
    <main>
      <h1>Week Planner MVP</h1>
      <p>Open the browser console to check sorted flexible tasks.</p>
    </main>
  );
}

export default App;