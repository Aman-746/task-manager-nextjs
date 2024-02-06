"use client";

import React, { useContext, useState } from 'react'
import loginIcon from "@/assets/loginIcon.svg"
import Image from 'next/image';
import { toast } from 'react-toastify';
import { login } from '@/services/signupService';
import { useRouter } from 'next/navigation';
import UserContext from '@/context/userContext';

const Login = () => {

  const router=useRouter();
  const context=useContext(UserContext);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    // console.log(loginData);

    if (loginData.email.trim() === "" || loginData.password.trim() === "") {
      toast.info('Invalid details !!', {
        position: "top-center",
      });
      return;
    }

    try {
      const result = await login(loginData);
      console.log(result);
      toast.success("Login success !!", {
        position: "top-center",
      });
      // redirect
      context.setUser(result.user);
      router.push("/profile/user");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  }


  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-4 col-start-5 p-5'>
        <div className='my-5 flex justify-center'>
          <Image src={loginIcon} style={{ width: "70%" }} alt='sign up icon' priority />
        </div>
        <h1 className='text-lg text-center mb-2'>Login here !!</h1>
        <form action="#!" onSubmit={handleLogin}>
          <div className='mb-6'>
            <div className="mb-3">
              <label htmlFor="email" className='className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"'>Email</label>
              <input
                type="email"
                id='email'
                name='email'
                onChange={(event) => {
                  setLoginData({
                    ...loginData,
                    email: event.target.value,
                  })
                }}
                value={loginData.email}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter here"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className='className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"'>Password</label>
              <input
                type="password"
                id='password'
                name='password'
                onChange={(event) => {
                  setLoginData({
                    ...loginData,
                    password: event.target.value,
                  })
                }}
                value={loginData.password}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter here"
              />
            </div>
          </div>

          <div className='flex gap-2 justify-center'>
            <button type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Login</button>
            <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900">Reset</button>
          </div>

          {/* {JSON.stringify(loginData)} */}

        </form>
      </div>
    </div>
  )
}

export default Login