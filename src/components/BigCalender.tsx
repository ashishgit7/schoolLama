"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
// import { calendarEvents } from "@/lib/data";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { Class } from "@/types/Class";
import { generateEvents } from "@/lib/common";


const localizer = momentLocalizer(moment);

const BigCalendar = ({calendarEvents} : {calendarEvents: any}) => {
  const clickRef = useRef(null)
  const [events,setEvents] = useState(calendarEvents)
  const [view, setView] = useState<View>(Views.WORK_WEEK);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };
  // const useEffect (() => {
  // //  const eventData = generateEvents(calendarEvents);
  // //  setEvents(eventData)
  // }, [])
  const handleNavigate = (action: 'PREV' | 'NEXT') => {
    setCurrentDate(prevDate => {

      const newDate = new Date(prevDate);
      if (action === 'PREV') {
        newDate.setDate(newDate.getDate() - 7);
      } else {
        newDate.setDate(newDate.getDate() + 7);
      }
      return newDate;
    });
  };
  return (
    <>
      {/* <div style={{ marginBottom: '10px' }}>
        <button onClick={() => handleNavigate('PREV')}>Previous Week</button>
        <button onClick={() => handleNavigate('NEXT')}>Next Week</button>
      </div> */}
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      min={new Date(2024, 8, 9, 8, 0, 0)}
      max={new Date(2024, 9, 9, 17, 0, 0)}
      date={currentDate}
      onNavigate={(date) => setCurrentDate(date)}
      selectable
    />
    </>
  );
};

export default BigCalendar;