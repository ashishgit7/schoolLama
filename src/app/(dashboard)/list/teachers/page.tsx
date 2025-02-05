/* eslint-disable @next/next/no-img-element */
'use client'
import FormModal from "@/components/FormModal";
import AppLoader from "@/components/AppLoader";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, teachersData } from "@/lib/data";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { Teacher } from "@/types/Teacher";
import { DataTable } from "@/components/DataTable";


const columns = [
  {
    header: ({ column }: any) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
        </button>
      );
    },
    accessorKey: "name",
  },
  {
    header: ({ column }: any) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Class
        </button>
      );
    },
    accessorKey: "class",
  },
  {
    header: ({ column }: any) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
        </button>
      );
    },
    accessorKey: "email",
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },

  {
    header: "action",
    accessorKey: "action",
    cell: ({ row }: any) => {
      const studentId = row.original.id;
      return (
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${studentId}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <FormModal table="student" type="delete" id={studentId} />
          )}
        </div>
      );
    },
  },
  {
    header: "combinedData",
    accessorKey: "combinedData",
    visible: false,
  },
];

const TeacherListPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await axios.get(`${baseUrl}/api/teachers`);
      const teachersData = response.data.documents.map((info:any)=>{
        return {
          name: `${info.FirstName} ${info.LastName}`,
          email: info.email,
          id: info.$id,
          class: `${info?.Class.join(',')}`,
          phone: info.PhoneNumber,
          action: "action",
          combinedData: `${info.PhoneNumber} ${info.FirstName} ${info.$id} ${
            info.LastName
          } ${info.email} ${info?.Class.join(',')}`,
        };
      });
      setTeachers(teachersData)
      setLoading(false);
    }
    fetchTeachers();
  },[])
  return loading ? <AppLoader /> : (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              //   <Image src="/plus.png" alt="" width={14} height={14} />
              // </button>
              <FormModal table="teacher" type="create"/>
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <DataTable columns={columns} data={teachers} />
      {/* PAGINATION */}
    </div>
  )
  
};

export default TeacherListPage;
