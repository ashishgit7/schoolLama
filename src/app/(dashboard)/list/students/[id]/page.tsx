"use client"
import Announcements from "@/components/Announcements";
import AppLoader from "@/components/AppLoader";
import BigCalendar from "@/components/BigCalender";
import Performance from "@/components/Performance";
import { generateEvents } from "@/lib/common";
import { Student } from "@/types/Student";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect,useState } from "react";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const SingleStudentPage = () => {
  const [student, setStudent] = useState<Student>();
  const [loading, setLoading] = useState(true);
  const [calendarEvents, setCalendarEvents] = useState<Event[]>([]);
  const { id } = useParams() as { id: string };
  const ConvertDate = (date: string | undefined) => {
    const newDate = new Date(date || "");

    // Ensure the date is valid
    if (isNaN(newDate.getTime())) {
      return "Invalid Date";
    }

    // Get day, month, and year
    const day = newDate.getDate().toString().padStart(2, "0");
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0"); // getMonth() returns 0-11
    const year = newDate.getFullYear();

    // Return formatted date
    return `${day}-${month}-${year}`;
  };
  useEffect(() => {
    const fetchStudent = async () => {
      const res = await axios.get(`${baseUrl}/api/students/${id}`);
      const data = res.data;
      const subjectsInfo = data.classInfo.subjectsInfo;
      const events = subjectsInfo.reduce((acc: any, subject: any) => {
        const SubjectSchdule = JSON.parse(subject.Schedule.replace(/'/g, '"'))
        acc = [...acc, ...generateEvents(subject.Name, SubjectSchdule)]
        return acc;
      },[])
      setCalendarEvents(events);
      setStudent(data);
      setLoading(false);
    };
    fetchStudent();
  }, [id]);

  return loading ? <AppLoader /> : (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3 items-center flex">
              <Image
                src="https://images.pexels.com/photos/5414817/pexels-photo-5414817.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold">Cameron Moran</h1>
              <p className="text-sm text-gray-500">
                {student?.Description}
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full items-center flex gap-2">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>A+</span>
                </div>
                <div className="w-full flex items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>{ConvertDate(student?.BirthData)}</span>
                </div>
                <div className="w-full flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>{student?.email}</span>
                </div>
                <div className="w-full flex items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>{student?.PhoneNumber}</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">{student?.classInfo?.Standard} {student?.classInfo?.Section}</h1>
                <span className="text-sm text-gray-400">Grade</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleLesson.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">18</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">6A</h1>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Student&apos;s Schedule</h1>
          <BigCalendar calendarEvents={calendarEvents} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link className="p-3 rounded-md bg-lamaSkyLight" href="/">
              Student&apos;s Lessons
            </Link>
            <Link className="p-3 rounded-md bg-lamaPurpleLight" href="/">
              Student&apos;s Teachers
            </Link>
            <Link className="p-3 rounded-md bg-pink-50" href="/">
              Student&apos;s Exams
            </Link>
            <Link className="p-3 rounded-md bg-lamaSkyLight" href="/">
              Student&apos;s Assignments
            </Link>
            <Link className="p-3 rounded-md bg-lamaYellowLight" href="/">
              Student&apos;s Results
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleStudentPage;