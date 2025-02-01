"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
// import { calendarEvents } from "@/lib/data";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { Class } from "@/types/Class";
import { Slot } from "@/types/Other";
import { nanoid } from "nanoid";

type Event = {
  title: string;
  id: string;
}
const localizer = momentLocalizer(moment);
const formats = {
  eventTimeRangeFormat: () => { 
    return "";
  },
};
const BigCalendar = ({calendarEvents , setCalenderEvents, data} : {calendarEvents: any,setCalenderEvents : any, data:Event}) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const onSelectSlot = (slotInfo: Slot) => {
    const event:Slot = {
      title : data.title,
      resourceId : nanoid(),
      newEvent: true,
      allDay: false,
      start : slotInfo.start,
      end : slotInfo.end
    }
    setCalenderEvents([...calendarEvents,event])
  }
  const onSelectEvent = (slotInfo:Slot) =>{
    if(!slotInfo?.newEvent){
      return ;
    }
    const filterEvent = calendarEvents.filter((slots:Slot)=> slots.resourceId!==slotInfo.resourceId)
    setCalenderEvents(filterEvent)
  }
  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };
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
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => handleNavigate('PREV')}>Previous Week</button>
        <button onClick={() => handleNavigate('NEXT')}>Next Week</button>
      </div>
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      // @ts-ignore 
      onSelectSlot={onSelectSlot}
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
      formats={formats} 
      step = {60}
      timeslots={1}
      onSelectEvent={onSelectEvent}
    />
    </>
  );
};

export default BigCalendar;