import type { FixedEvent } from "./types/planner";
import { addFixedEventsToWeek, createEmptyWeek } from "./utils/weekUtils";

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
];

const emptyWeek = createEmptyWeek();
const weekWithFixedEvents = addFixedEventsToWeek(emptyWeek, fixedEvents);

console.log(weekWithFixedEvents);