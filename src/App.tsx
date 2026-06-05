import type { FixedEvent } from "./types/planner";
import { addFixedEventsToWeek, createEmptyWeek } from "./utils/weekUtils";
import { getOverloadedFixedDaysWarnings } from "./utils/plannerRules";

function App() {
  const fixedEvents: FixedEvent[] = [
    {
      id: "fixed-1",
      title: "Driving lesson",
      day: "monday",
      startTime: "12:00",
      endTime: "13:30",
      energyCost: 3,
    },
    {
      id: "fixed-2",
      title: "College classes",
      day: "tuesday",
      startTime: "09:00",
      endTime: "14:00",
      energyCost: 5,
    },
    {
      id: "fixed-3",
      title: "Exam",
      day: "friday",
      startTime: "10:00",
      endTime: "12:00",
      energyCost: 6,
    },
    {
      id: "fixed-4",
      title: "Hard meeting",
      day: "friday",
      startTime: "15:00",
      endTime: "17:00",
      energyCost: 5,
    },
  ];

  const emptyWeek = createEmptyWeek();
  const weekWithFixedEvents = addFixedEventsToWeek(emptyWeek, fixedEvents);
  const warnings = getOverloadedFixedDaysWarnings(weekWithFixedEvents);

  console.log("weekWithFixedEvents:", weekWithFixedEvents);
  console.log("warnings:", warnings);

  return (
    <main>
      <h1>Week Planner MVP</h1>
      <p>Open the browser console to check generated week data.</p>
    </main>
  );
}

export default App;