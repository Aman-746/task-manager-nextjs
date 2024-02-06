"use client";
import UserContext from '@/context/userContext';
import { logout } from '@/services/signupService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { toast } from 'react-toastify';

const CustomNavbar = () => {
  const context = useContext(UserContext);
  console.log(context);
  
  const router=useRouter();

  async function doLogOut() {
    try {
      const result= await logout();
      console.log(result);
      context.setUser(undefined);
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Logout error");
    }
  }

  return (
    <nav className='bg-sky-400 h-12 py-3 px-2 flex justify-between items-center'>
      <div>
        <h1 className='font-semibold text-2xl '>
          <a href="#!">Work Manager</a>
        </h1>
      </div>
      <div>
        <ul className='flex space-x-3 '>
          <li>
            <Link href={'/'} className='hover:text-blue-600'>Home</Link>
          </li>
          <li>
            <Link href={'/add-task'} className='hover:text-blue-600 cursor-pointer'>Add Task</Link>
          </li>
          <li>
            <Link href={'/show-tasks'} className='hover:text-blue-600 cursor-pointer'>Show tasks</Link>
          </li>
        </ul>
      </div>
      <div>
        <ul className='flex space-x-2'>
          {
            context.user && (
              <>
                <Link href={'#!'}>{context.user.name}</Link>
                <button onClick={doLogOut}>Log out</button>
              </>
            )
          }

          {
            !context.user && (
              <>
                <Link href={'/login'}>Log in</Link>
                <Link href={'/signup'}>Sign up</Link>
              </>
            )
          }

        </ul>
      </div>
    </nav>
  )
}

export default CustomNavbar