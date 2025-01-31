'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const Homepage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSecondDiv, setShowSecondDiv] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const id = localStorage.getItem('id');
    const role = localStorage.getItem('role');
    const fetchUser = async ()=>{
      if (id && role) {
        switch (role) {
          case 'Teacher':
            const teacher = await axios.get(`${baseURL}/api/teachers/${id}`);
            if (teacher) {
              router.push('/list/teachers');
            }

            break;
          case 'Student':
            const student = await axios.get(`${baseURL}/api/students/${id}`);
            if (student) {
              router.push('/list/students');
            }
            break;
          default:
              router.push('/');
        }
      }
    }
    fetchUser();
  
  },[router])
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${baseURL}/api/auth/user`, {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('id', response.data.id);
      router.push('/list/students');      
    } catch (error) {
      console.log(error);
    }
  }
  const handleResetPassword = async ()=>{
    const response = await fetch(`${baseURL}/api/password-recovery`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: resetEmail })
    });
    if (response.status === 404) {
      setErrorMsg(true);
    }
    else{
      router.push(`/password-recovery/otpverify?email=${encodeURIComponent(resetEmail)}`);
    }

  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='relative'>
        <div className={`bg-white p-8 rounded-lg shadow-md w-96 transition-transform duration-500 ${showSecondDiv ? '-translate-x-full invisible' : 'translate-x-0'}`}>
          <div className='flex justify-center mb-6'>
        <Image src="/logo.png" alt="SchooLama Logo" width={64} height={64} />
          </div>
          <h1 className='text-2xl font-bold text-center mb-6'>Welcome to SchooLama</h1>
          <form className='space-y-4' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
          <input type='email' id='email' name='email' onChange={(e) => setEmail(e.target.value)} required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lamaPurpleLight focus:border-lamaPurpleLight' />
        </div>
        <div>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
          <input type='password' id='password' onChange={(e) => setPassword(e.target.value)} name='password' required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lamaPurpleLight focus:border-lamaPurpleLight' />
        </div>
        <div>
          <button type='submit' className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lamaPurple'>
            Log in
          </button>
          <button type='button' onClick={() => setShowSecondDiv(true)} className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium mt-4 text-white bg-red-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lamaPurple'>
            Forget password
          </button>
        </div>
          </form>
        </div>
        <div className={`bg-white p-8 rounded-lg shadow-md w-96 absolute top-0 transition-transform duration-500 ${showSecondDiv ? 'translate-x-0' : 'translate-x-full invisible'}`}>
          <div className='flex justify-center mb-6'>
        <Image src="/logo.png" alt="SchooLama Logo" width={64} height={64} />
          </div>
          <h1 className='text-2xl font-bold text-center mb-6'>Reset Password</h1>
          <form className='space-y-4' onSubmit={handleResetPassword}>
        <div>
          <label htmlFor='reset-email' className='block text-sm font-medium text-gray-700'>Email</label>
          <input type='email' id='reset-email' name='reset-email' onChange={(e) => setResetEmail(e.target.value)} required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lamaPurpleLight focus:border-lamaPurpleLight' />
        </div>
        <div>
          <div>
            {errorMsg && <p className='text-red-500 mb-2'>email is not regiested</p>}
          </div>
          <button type='button' onClick={handleResetPassword} className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lamaPurple'>
            Reset Password
          </button>
          <button type='button' onClick={() => setShowSecondDiv(false)} className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium mt-4 text-white bg-red-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lamaPurple'>
            Back to Login
          </button>
        </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Homepage