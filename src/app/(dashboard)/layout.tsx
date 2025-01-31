'use client'
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const userContext = createContext(null);

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      const id = localStorage.getItem('id');
      const role = localStorage.getItem('role');
      if (id && role) {
        switch (role) {
          case 'Teacher':
            const teacher:any = await axios.get(`${baseURL}/api/teachers/${id}`);
            setUser(teacher);
            break;
          case 'Student':
            const student:any = await axios.get(`${baseURL}/api/students/${id}`);
            setUser(student);
            break;
          default:
            break;
        }
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-bold">SchooLama</span>
        </Link>
        <Menu />
      </div>
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
        <userContext.Provider value={user}>
        <Navbar />
          {children}
        </userContext.Provider>
      </div>
    </div>
  );
}