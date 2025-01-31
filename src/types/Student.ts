import { Gender } from "./Other";

export type Student = {
    $id: string;
    FirstName: string;
    LastName: string;
    userName: string;
    email: string;
    PhoneNumber: string;
    Address: string;
    BloodGroup: string;
    BirthData: string; 
    ImageURL: string;
    Gender: Gender;
    Grade?: number; 
    Class?: string; 
    Description?: string;
    classInfo: {
      Standard: string;
      Section: string;
    };
  };
  
  // You might also want to create types for API responses:
  export type StudentListResponse = {
    students: Student[];
    total: number;
  };