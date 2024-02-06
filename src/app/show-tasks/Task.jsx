import UserContext from '@/context/userContext'
// import { deleteTask } from '@/services/taskService';
import React, { useContext } from 'react'
import { RxCross1 } from "react-icons/rx";


const Task = ({ task, deleteTaskParent }) => {
  const { user } = useContext(UserContext);
  function DeleteTask(taskid) {
    deleteTaskParent(taskid);
  }
  return (
    <div
      className={`shadow-lg mt-2 rounded-md ${task.status == "completed" ? "bg-green-800" : "bg-gray-800"
        }`}
    >
      <div className='p-5 text-white'>
        <div className="flex justify-between">
          <h1 className='text-md font-semibold'>{task.title}</h1>
          <span
            onClick={() => {
              DeleteTask(task._id)
            }}
            className='shadow-lg hover:bg-gray-900 bg-gray-950 rounded-full w-6 h-6 flex justify-center text-sm items-center cursor-pointer'>
            <RxCross1 />
          </span>
        </div>
        <p className='text-base'>{task.content}</p>
        <div className='flex justify-between'>
          <p className="text-left text-base">Status: <span className='text-sm'>{task.status.toUpperCase()}</span> </p>
          <p className="text-right text-base">Author: <span className='font-semibold text-sm'>{user?.name}</span> </p>
        </div>
        <p className='text-base'>Created at: <span className='text-sm'>{task.createdAt}</span> </p>
      </div>
    </div>
  )
}

export default Task