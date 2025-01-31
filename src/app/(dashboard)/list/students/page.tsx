"use client";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { userContext } from "@/app/(dashboard)/layout";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Student } from "@/types/Student";
import AppLoader from "@/components/AppLoader";

import { DataTable } from "@/components/DataTable";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
          <Link href={`/list/students/${studentId}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <FormModal table="student" type="delete" id={studentId} />
          )}
          {
            role === "admin" && <FormModal table="student" type="update" data={row.original} />
          }
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

const StudentListPage = () => {
  const user = useContext(userContext);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchStudents = async () => {
      const res = await axios.get(`${baseUrl}/api/students`);
      const studentData = res.data.documents.map((info: any) => {
        return {
          name: `${info.FirstName} ${info.LastName}`,
          firstName: info.FirstName,
          lastName: info.LastName,
          address: info.Address,
          bloodType: info.BloodGroup,
          birthday: info.BirthData,
          email: info.email,
          sex: info.Gender,
          username: info.userName,
          password:'12345',
          id: info.$id,
          class: `${info?.classInfo?.Standard || ""} ${
            info?.classInfo?.Section || ""
          }`,
          phone: info.PhoneNumber,
          action: "action",
          combinedData: `${info.PhoneNumber} ${info.FirstName} ${info.$id} ${
            info.LastName
          } ${info.email} ${info?.classInfo?.Standard || ""} ${
            info?.classInfo?.Section || ""
          } `,
        };
      });
      setStudents(studentData);
      setLoading(false);
    };
    fetchStudents();
  }, []);

  return loading ? (
    <AppLoader />
  ) : (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            {role === "admin" && <FormModal table="student" type="create" />}
            
          </div>
        </div>
      </div>
      <DataTable columns={columns} data={students} />
    </div>
  );
};

export default StudentListPage;
