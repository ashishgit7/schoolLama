"use client";
import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalender";
import FormModal from "@/components/FormModal";
import Performance from "@/components/Performance";
import { role } from "@/lib/data";
import Image from "next/image";
import { Teacher } from "@/types/Teacher";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import AppLoader from "@/components/AppLoader";
import { generateEvents } from "@/lib/common";

interface Event {
  title: string;
  resourceId: string;
  allDay: boolean;
  start: Date;
  end: Date;
}

const SingleTeacherPage = () => {
  const { id } = useParams() as { id: string };
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [calendarEvents, setCalendarEvents] = useState<Event[]>([]);
 
  useEffect(() => {
    const fetchTeacher = async () => {
      const res = await axios.get(`/api/teachers/${id}`);
      setTeacher(res.data);
      const events = res.data.subjectsInfo.reduce((acc: any, subject: any) => {
        const SubjectSchdule = JSON.parse(subject.Schedule.replace(/'/g, '"'))
        acc = [...acc, ...generateEvents(subject.Name, SubjectSchdule)]
        return acc;
      },[])
      
      setCalendarEvents(events);
      setLoading(false);
    };
    fetchTeacher();
  }, [id]);

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

  return (
    loading ? <AppLoader /> :
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4 items-center">
            <div className="w-1/3">
              <Image
                src={teacher?.ImageURL || "/default-profile.png"}
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">Leonard Snyder</h1>
                {role === "admin" && (
                  <FormModal
                    table="teacher"
                    type="update"
                    data={{
                      id: 1,
                      username: "deanguerrero",
                      email: "deanguerrero@gmail.com",
                      password: "password",
                      firstName: "Dean",
                      lastName: "Guerrero",
                      phone: "+1 234 567 89",
                      address: "1234 Main St, Anytown, USA",
                      bloodType: "A+",
                      dateOfBirth: "2000-01-01",
                      sex: "male",
                      img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200",
                    }}
                  />
                )}
              </div>
              <p className="text-sm text-gray-500">{teacher?.Description}</p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium ">
                <div className="w-full flex items-center gap-2">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>{teacher?.BloodGroup}</span>
                </div>
                <div className="w-full  flex items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>{ConvertDate(teacher?.BirthData)}</span>
                </div>
                <div className="w-full  flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>{teacher?.email}</span>
                </div>
                <div className="w-full flex items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>{teacher?.PhoneNumber}</span>
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
                <h1 className="text-xl font-semibold">2</h1>
                <span className="text-sm text-gray-400">Branches</span>
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
                <h1 className="text-xl font-semibold">6</h1>
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
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Teacher&apos;s Schedule</h1>
          <BigCalendar calendarEvents={calendarEvents}/>
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Subjects</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            {teacher?.Subject.map((subject) => (
              <p className="p-3 rounded-md bg-lamaSkyLight" key={subject}>
                {subject}
              </p>
            ))}
            
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleTeacherPage;

