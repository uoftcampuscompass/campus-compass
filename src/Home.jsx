import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function home() {
  const { currentUser } = useSelector(state => state.user);
  return (
    <main>
      <div className='pb-20 z-10'>
      {/* top */}
        <div className='flex flex-col gap-6 p-40 px-3 max-w-6xl mx-auto'>
          <h1 className='text-slate-900 font-bold text-3xl lg:text-5xl'>
            Welcome to Campus Compass.
          </h1>
          <div className='text-slate-800 text-md font-bold sm:text-lg'>
            Campus Compass will help you find current and upcoming events in our University of Toronto.
          </div>

          <div>
          {/* {
            currentUser ? 
              <Link to={'/create-new-todo'} className='text-sm sm:text-lg text-blue-700 font-bold hover:underline'>
                Click here to create a new todo.
              </Link> : 
              <div className='flex flex-col gap-4'>
                <Link to={'/login'} className='text-sm sm:text-lg text-blue-700 font-bold hover:underline'>
                  Click here to login.
                </Link>
                <Link to={'/registration'} className='text-sm sm:text-lg text-blue-700 font-bold hover:underline'>
                  Click here to register.
                </Link>
              </div>
          } */}
          </div>
        </div>
      </div>
    </main>
  )
}
