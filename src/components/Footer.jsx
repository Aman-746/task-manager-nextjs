"use client";

import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-sky-400 text-white p-5 h-40 mt-5'>
      <div className='flex justify-around text-center'>
        <div className='flex flex-col justify-center'>
          <h1>Welcome to Work manager</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, minima?
          </p>
        </div>
        <div>
          <h1>Imortant Links</h1>
          <ul>
            <li>facebook</li>
            <li>instagram</li>
            <li>linkedin</li>
            <li>youtube</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer