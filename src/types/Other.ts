import { boolean } from "zod";

export enum DaysOfWeek {
    Sunday,    // 0
    Monday,    // 1
    Tuesday,   // 2
    Wednesday, // 3
    Thursday,  // 4
    Friday,    // 5
    Saturday   // 6
  }

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type Slot =  {
  title: string;
  resourceId : string;
  allDay: boolean;
  start : Date;
  end : Date;
  newEvent?: boolean
}