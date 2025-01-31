import { DaysOfWeek } from "./Other";


export type Subject = {
    $id: string;
    Name: string;
    Frequency : DaysOfWeek[];
    TimeSlot: string[];
}