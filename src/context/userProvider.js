"use client";

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { CurrentUser } from '@/services/signupService';
import UserContext from './userContext';

const UserProvider = ({ children }) => {

  const [user, setUser] = useState();


  useEffect(() => {
    async function load() {
      try {
        const currentUser = await CurrentUser();
        console.log(currentUser);
        setUser({ ...currentUser });
      } catch (error) {
        console.log(error);
        // toast.error("Error in loading current user");
        setUser(undefined);
      }
    }
    load();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider