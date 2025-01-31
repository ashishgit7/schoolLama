import { Gender } from "./Other";
import { Subject } from "./Subject";


export type Teacher = {
    $id: string;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    Description: string;
    Address: string;
    BloodGroup: string;
    BirthData: string; // Consider using Date if you parse this
    ImageURL: string;
    Gender: Gender[]; // Adjust based on your possible values
    userName: string;
    email: string;
    ImageID: string;
    Class: string[];
    Subject: string[];
    subjectsInfo: Subject[];
}