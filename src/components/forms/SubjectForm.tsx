"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDate, generateEvents } from "@/lib/common";
import { Class } from "@/types/Class";
import WeekCalenderForm from "../WeekCalenderForm";
import { nanoid } from 'nanoid'
import AppLoader from "../AppLoader";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const schema = z.object({
  Name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long!" })
    .max(20, { message: "Name must be at most 20 characters long!" }),
  classInfo: z.string().min(1),
  TeacherInfo: z.string().min(1),
});

type Inputs = z.infer<typeof schema>;

const SubjectForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const [classInfo,setClassesInfo] = useState<any>([])
  const [className,setClassName] = useState<string>()
  const [calenderEvents,setCalenderEvents] = useState<any>()
  const [teacherInfo, setTeacherInfo] = useState<any>([])
  const [name,setName] = useState<string>()
  const [subjectData,setSubjectData] = useState<any>()
  const [loading,setLoading] = useState<boolean>(true)
  useEffect(()=>{
    const fetchData = async () => {
        const classResponse = await axios.get(`${baseUrl}/api/classes`)
        const resp = classResponse.data.documents.map((classData:Class) => {
            const key = `${classData.Standard} ${classData.Section}`
            return {
                id : classData.$id,
                value : `${classData.Standard} ${classData.Section}`,
                [key] : classData.subjectsInfo
            }
        })
        const teacherResponse = await axios.get(`${baseUrl}/api/teachers`);
        const teacherData = teacherResponse.data.documents.map((teacherData:any) => {
          return {
            id : teacherData.$id,
            value : `${teacherData.FirstName} ${teacherData.LastName} (${teacherData.userName})`,
          }
        })
        setTeacherInfo(teacherData);
        setClassesInfo(resp)        
    }
    fetchData();
    if(type==='update' && data){
      data.TeacherName = data.TeacherInfo[0].$id;
      data.ClassName = data.classInfo.$id;
      setName(data.Name)
      setClassName(data.classInfo.$id)
    }
    setLoading(false)
  },[])

  useEffect(()=>{
    if(className && name){
      setLoading(true)
        setSubjectData({
          title: name,
          id : nanoid()
        })
        if(!classInfo.length) return ;
        const classSubjectData = classInfo.find((classInfoData:any)=> classInfoData.id === className)
        const calenderInfo = classSubjectData[classSubjectData.value].reduce((acc: any, subject: any) => {
          const SubjectSchdule = JSON.parse(subject.Schedule.replace(/'/g, '"'))
          let isNewEvent = false;
          if(type==='update' && subject.Name === data.Name ){
            isNewEvent = true;
          }
          const subjectEvent = generateEvents(subject.Name, SubjectSchdule, isNewEvent);
          acc = [...acc, ...subjectEvent]
          return acc;
        },[])
        setCalenderEvents(calenderInfo)
        setLoading(false)
    }
  },[classInfo, className, name])

  const onSubmit =  handleSubmit(async (subjectData) => {
    const newSubjectSchdule = calenderEvents.filter((event:any) => event.newEvent)
    const newSubject = {
    } as any
    newSubjectSchdule.forEach((event:any) => {
      const startTime = formatDate(event.start);
      const endTime = formatDate(event.end);
      const day = startTime.day
      if(!newSubject.hasOwnProperty(day)){
        newSubject[day] = [];
      }
      newSubject[day].push(`${startTime.time}-${endTime.time}`)
    })
    const jsonString = JSON.stringify(newSubject);
    const SubjectInfo = {
      Name : subjectData.Name,
      Schedule : jsonString,
      TeacherInfo : [subjectData.TeacherInfo],
      classInfo : subjectData.classInfo
    };
    let response;
    // if(type==='update' && data.$id){
    //   const id = data.$id
    //   response = await axios.patch(`${baseUrl}/api/subjects/${id}`,{SubjectInfo: SubjectInfo})
    // }
    // else{
    // response = await axios.post(`${baseUrl}/api/subjects`,{SubjectInfo: SubjectInfo})
    // }
    // console.log(response)
    // window.location.reload()
    
  });
  const handleClassChange = (event: any) => {
    setValue("classInfo",event)
    setClassName(event)
  }
  const handleTeacherNameChange = (event: any) => {
    setValue("TeacherInfo",event)
  }
  
  const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCalenderEvents(calenderEvents?.filter((event:any)=> !event.newEvent))
    setName(event.target.value)
  }
  return loading ? <AppLoader/> : (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <InputField
        label="Teacher"
        name="TeacherInfo"
        type="select"
        defaultValue={data?.TeacherName}
        register={register}
        error={errors?.Name}
        options={teacherInfo}
        handleChange={handleTeacherNameChange}
        />
        <InputField
        label="Name"
        name="Name"
        defaultValue={data?.Name}
        register={register}
        error={errors?.Name}
        handleChange={handleNameChange}
        />
        <InputField
        label="Class"
        name="classInfo"
        type="select"
        defaultValue={data?.ClassName}
        register={register}
        error={errors?.Name}
        options = {classInfo}
        handleChange = {handleClassChange}
        /> 
        {
            calenderEvents && <WeekCalenderForm calendarEvents = {calenderEvents} setCalenderEvents = {setCalenderEvents} data = {subjectData}/>
        }
        <button type="submit" className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
        
    </form>
  );
};

export default SubjectForm;


