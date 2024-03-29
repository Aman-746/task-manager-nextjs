"use client";
import UserContext from '@/context/userContext';
import { deleteTask, getTasksOfUser } from '@/services/taskService';
import React, { useContext, useEffect, useState } from 'react'
import Task from './Task';
import { toast } from 'react-toastify';

const ShowTasks = () => {

  const [tasks, setTasks] = useState([]);
  const context = useContext(UserContext);
  // console.log(context.user._id);
  async function loadTasks(userid) {
    try {
      const tasks = await getTasksOfUser(userid);
      setTasks([...tasks].reverse());
      console.log(tasks);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (context.user) {
      loadTasks(context.user._id);
    }
  }, [context.user]);

  async function deleteTaskParent(taskid) {
    try {
      const result = await deleteTask(taskid);
      console.log(result);
      const newTasks = tasks.filter((item) => item._id != taskid);
      setTasks(newTasks);
      toast.success("Task deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting task");
    }
  }

  return (
    <div className='container grid mt-3 grid-cols-12'>
      <div className='text-lg col-span-6 col-start-4'>
        <h1 className='m-3 text-center text-2xl'>Your tasks ( {tasks.length} )</h1>

        {tasks.map((task) => (
          <Task task={task} key={task._id} deleteTaskParent={deleteTaskParent} />
        ))}
      </div>
    </div>
  )
}

export default ShowTasks