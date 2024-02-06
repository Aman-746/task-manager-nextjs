"use client";

import React, { useContext, useState } from 'react'
import todosvg from '@/assets/todo.svg';
import Image from 'next/image';
import { addTask } from '@/services/taskService';
import {toast} from 'react-toastify';
import UserContext from '@/context/userContext';


const AddTask = () => {

  // const context=useContext(UserContext);
  // const userid={context.user._id};

  const [task, setTask] = useState({
    title: " ",
    content: " ",
    status: "none",
    // temp solution
    userrr: "",
  });

  const handleAddTask = async (event) => {
    event.preventDefault();
    console.log(task);

    // validate task data
    // if (task.title === '' || task.content === '' || task.status === 'none' || task.userId === '') {
    //   alert('Please fill in all fields');
    //   return;
    // }

    try {
      const result = await addTask(task);
      console.log(result);
      toast.success("Your task is added !!",{
        position: "top-center",
      });

      setTask({
        title:"",
        content:"",
        status:"none",
      })
    } catch (error) {
      console.log(error);
      toast.error("Task not added !!",{
        postition: "top-center",
      });
    }


  }

  return (
    <div className='grid grid-cols-12 justify-center'>
      <div className=' col-span-6 col-start-4 p-5'>
        <div className='my-5 flex justify-center'>
          <Image src={todosvg} style={{ width: "50%" }} alt='todo icon' priority />
        </div>
        <h1 className='text-lg text-center mb-2'>Add your task here!!</h1>
        <form action="#!" onSubmit={handleAddTask}>
          <div className="mb-6">
            <div className='mb-3'>
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={(event) => {
                  setTask({
                    ...task,
                    title: event.target.value,
                  });
                }}
                value={task.title}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="React js"
                required />
            </div>
            <div className='mb-3'>
              <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
              <textarea
                type="text"
                id="content"
                name="content"
                onChange={(event) => {
                  setTask({
                    ...task,
                    content: event.target.value,
                  });
                }}
                value={task.content}
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="I have to complete it in 3 days"
                required />
            </div>
            <div className="mb-3">
              <label htmlFor="task_status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select task status</label>
              <select
                id="task_status"
                name="task_status"
                onChange={(event) => {
                  setTask({
                    ...task,
                    status: event.target.value,
                  })
                }}
                value={task.status}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="none" disabled>Choose status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className='flex gap-2 justify-center'>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>

            <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Clear</button>
          </div>

          {/* {JSON.stringify(task)} */}

        </form>
      </div>
    </div>
  )
}

export default AddTask