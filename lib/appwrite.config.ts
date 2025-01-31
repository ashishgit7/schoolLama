import * as sdk from "node-appwrite";

const School_ID = process.env.NEXT_PUBLIC_SCHOOL_ID || "";
export const Teacher_DB = process.env.NEXT_PUBLIC_TEACHER_DB || "";
export const Teacher_Info_Collection_KEY = process.env.NEXT_PUBLIC_TEACHER_INFO_COLLECTION || "";
export const Student_Info_Collection_KEY = process.env.NEXT_PUBLIC_STUDENT_INFO_COLLECTION || "";
export const Classes_Info_Collection_KEY = process.env.NEXT_PUBLIC_CLASSES_INFO_COLLECTION || "";
export const Subject_Info_Collection_KEY = process.env.NEXT_PUBLIC_SUBJECT_INFO_COLLECTION || "";
export const User_Collection_KEY = process.env.NEXT_PUBLIC_USER_COLLECTION || "";   
export const OTP_Collection_KEY = process.env.NEXT_PUBLIC_OTP_STORE || "";
export const Email = process.env.NEXT_PUBLIC_EMAIL || "";
export const Password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD || "";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

const client = new sdk.Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject(School_ID).setKey(API_KEY);
export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
