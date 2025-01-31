import { DaysOfWeek } from "@/types/Other";
import { nanoid } from "nanoid";

interface Event {
  title: string;
  resourceId: string;
  allDay: boolean;
  start: Date;
  end: Date;
  newEvent?: boolean
}

export function generateEvents(
  title:string,
  schedule:any,
  isNewEvent:boolean = false,
  offset:number = 0
): Event[] {
  const events: Event[] = [];
  const startDate = new Date(); 
  const currentDay = startDate.getDay();

  const mondayOffset = (currentDay === 0 ? 0 : 1) - currentDay + (offset*7); 
    const monday = new Date(startDate);
  monday.setDate(startDate.getDate() + mondayOffset);

  const saturday = new Date(monday);
  saturday.setDate(monday.getDate() + 5);

  for (
    let date = new Date(monday);
    date <= saturday;
    date.setDate(date.getDate() + 1)
  ) {
    const dayOfWeek = date.toLocaleDateString("en-US", {
      weekday: "long",
    }) as unknown as DaysOfWeek;
    const dayEvents = !!schedule[dayOfWeek] ?  schedule[dayOfWeek] : []

    dayEvents.forEach((dayEvent:string) => {
      const [startTime, endTime] = dayEvent.split("-");
        const [startHour, startMinute] = parseTime(startTime);
        const [endHour, endMinute] = parseTime(endTime);

        const start = new Date(date);
        start.setHours(startHour, startMinute, 0, 0);

        const end = new Date(date);
        end.setHours(endHour, endMinute, 0, 0);

        events.push({
          title,
          resourceId: nanoid(),
          newEvent: isNewEvent,
          allDay: false,
          start,
          end,
        });

    });
  }

  return events;
}

function parseTime(time: string): [number, number] {
  const newTime = time.slice(0, -2);
  let [hours, minutes] = newTime.split(":").map(Number);
  if (time.endsWith("PM")) {
    if (hours !== 12) {
      hours += 12;
    }
  }
  return [hours, minutes];
}

export const formatDate = (date: Date) => {
  const options = { weekday: "long" as const }; // Get the full name of the day
  const day = date.toLocaleDateString("en-US", options);

  // Get hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensure two digits
  const ampm = hours >= 12 ? "PM" : "AM"; // Determine AM/PM

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  return { day, time: `${hours}:${minutes}${ampm}` };
};
