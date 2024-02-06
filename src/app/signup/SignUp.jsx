"use client";

import React, { useState } from 'react'
import signup from '@/assets/signup.svg'
import Image from 'next/image'
import { toast } from 'react-toastify';
import { Signup } from '@/services/signupService'

const SignUp = () => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  })

  const handleSignup = async (event) => {
    event.preventDefault();
    console.log(user);

    // validate user data
    // if (user.name === '' || user.email === '' || user.password === '' || user.about === '') {
    //   alert('Please fill in all fields');
    //   return;
    // }

    try {
      const data = await Signup(user);
      console.log(data);
      toast.success("Successfully signed up", {
        position: "top-center",
      });

      setUser({
        name: "",
        email: "",
        password: "",
        about: "",
      })
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: "top-center",
      });
    }
  }

  const resetForm = () => {
    setUser({
      name:"",
      email:"",
      password:"",
      about:"",
    });
  }

  return (
    <div className='grid grid-cols-12 justify-center'>
      <div className='col-span-4 col-start-5 p-5'>
        <div>
          <div className='my-5 flex justify-center'>
            <Image src={signup} style={{ width: "70%" }} alt='sign up icon' priority />
          </div>
          <h1 className='text-lg text-center mb-2'>Signup here</h1>
          <form action="#!" onSubmit={handleSignup}>
            <div className='mb-6'>
              {/* name */}
              <div className="mt-3">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={(event) => {
                    setUser({
                      ...user,
                      name: event.target.value,
                    })
                  }}
                  value={user.name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Aman"
                  required />
              </div>
              {/* email  */}
              <div className="mt-3">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={(event) => {
                    setUser({
                      ...user,
                      email: event.target.value,
                    })
                  }}
                  value={user.email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email.com"
                  required />
              </div>
              {/* password  */}
              <div className="mt-3">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(event) => {
                    setUser({
                      ...user,
                      password: event.target.value,
                    })
                  }}
                  value={user.password}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""
                  required />
              </div>
              {/* about */}
              <div className="mt-3">
                <label htmlFor="about" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About me</label>
                <textarea

                  id="about"
                  name="about"
                  onChange={(event) => {
                    setUser({
                      ...user,
                      about: event.target.value,
                    })
                  }}
                  value={user.about}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""
                  required
                  rows={4}>
                </textarea>
              </div>
            </div>

            <div className='flex gap-2 justify-center'>
              <button type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Sign up</button>
              <button onClick={resetForm} type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900">Reset</button>
            </div>

            {/* {JSON.stringify(user)} */}

          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp