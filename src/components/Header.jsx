import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNavOpen, setIsNavOpen] = useState(false);
  useEffect(() =>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }
  }, [location.search]);

  return (
    <div className="flex items-center justify-between bg-[rgb(7,57,106)] p-4 shadow-md">
      <Link to="/">
        <h1 className='font-medium text-2xl flex flex-wrap'>
          <span className='text-white'>Campus Compass</span>
        </h1>
      </Link>
      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div className="HAMBURGER-ICON space-y-2" onClick={() => setIsNavOpen((prev) => !prev)} >
            <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div className="absolute top-0 right-0 px-8 py-8" onClick={() => setIsNavOpen(false)} >
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            
            {
              currentUser ? (
                <ul className='flex flex-col items-center min-h-[250px] gap-4'>
                    <Link to='/' className="border-b border-gray-400 uppercase" onClick={() => setIsNavOpen(false)} >
                      <li className='text-xl text-white'>Home</li>
                    </Link>
                    <Link to='/about' className="border-b border-gray-400 uppercase" onClick={() => setIsNavOpen(false)} >
                        <li className='text-xl text-white'>About</li>
                    </Link>
                    <Link to={"/create-new-event"} className="border-b border-gray-400 uppercase" onClick={() => setIsNavOpen(false)} >
                      <li className='text-xl text-white'>Create New Event</li>
                    </Link>
                    <Link to={"/all-events"} className="border-b border-gray-400 uppercase" onClick={() => setIsNavOpen(false)} >
                      <li className='text-xl text-white'>All Events</li>
                    </Link>
                    <Link to={"/my-events"} className="border-b border-gray-400 uppercase" onClick={() => setIsNavOpen(false)} >
                      <li className='text-xl text-white'>My Events</li>
                    </Link>
                    <Link to={"/profile"} className="border-b border-gray-400 uppercase" onClick={() => setIsNavOpen(false)} >
                      <li className='text-xl text-white'>Profile</li>
                    </Link>
                </ul>
              ):(
                <ul className='flex flex-col items-center min-h-[250px] gap-6'>
                    <Link to='/' className="border-b border-gray-400 uppercase" onClick={() => setIsNavOpen(false)} >
                      <li className='text-xl text-white'>Home</li>
                    </Link>
                    <Link to='/about' className="border-b border-gray-400 uppercase" onClick={() => setIsNavOpen(false)} >
                        <li className='text-xl text-white'>About</li>
                    </Link>
                    <Link to={"/all-events"} className="border-b border-gray-400 uppercase" onClick={() => setIsNavOpen(false)} >
                      <li className='text-xl text-white'>All Events</li>
                    </Link>
                    <Link to='/login' className="border-b border-gray-400 uppercase" onClick={() => setIsNavOpen(false)} >
                      <li className='text-xl text-white'>Login</li>
                    </Link>
                    <Link to={"/registration"} className="border-b border-gray-400 uppercase" onClick={() => setIsNavOpen(false)} >
                      <li className='text-xl text-white'>Register</li>
                    </Link>
                </ul>
              )
            }
          </div>
        </section>
        {
          currentUser ? (
            <ul className='DESKTOP-MENU hidden space-x-8 lg:flex mx-10 sm:text-lg'>
                <Link to='/' className="border-b border-gray-400 uppercase">
                  <li className='text-white'>Home</li>
                </Link>
                <Link to='/about' className="border-b border-gray-400 uppercase">
                    <li className='text-white'>About</li>
                </Link>
                <Link to={"/create-new-event"} className="border-b border-gray-400 uppercase">
                  <li className='text-white'>Create New Event</li>
                </Link>
                <Link to={"/all-events"} className="border-b border-gray-400 uppercase">
                  <li className='text-white'>All Events</li>
                </Link>
                <Link to={"/my-events"} className="border-b border-gray-400 uppercase" onClick={() => setIsNavOpen(false)} >
                  <li className='text-xl text-white'>My Events</li>
                </Link>
                <Link to={"/profile"} className="border-b border-gray-400 uppercase">
                  <li className='text-white'>Profile</li>
                </Link>
            </ul>
          ):(
            <ul className='DESKTOP-MENU hidden space-x-8 lg:flex mx-10 sm:text-lg'>
                <Link to='/' className="border-b border-gray-400 text-white uppercase">
                  <li>Home</li>
                </Link>
                <Link to='/about' className="border-b border-gray-400 text-white uppercase">
                    <li>About</li>
                </Link>
                <Link to={"/all-events"} className="border-b border-gray-400 uppercase" onClick={() => setIsNavOpen(false)} >
                  <li className='text-xl text-white'>All Events</li>
                </Link>
                <Link to='/login' className="border-b border-gray-400 text-white uppercase">
                  <li>Login</li>
                </Link>
                <Link to={"/registration"} className="border-b border-gray-400 text-white uppercase">
                  <li>Register</li>
                </Link>
            </ul>
          )
        }
      </nav>
      <style>
      {`
        .hideMenuNav {
          display: none;
        }
        .showMenuNav {
          display: block;
          background:rgb(7,57,106);
          position: absolute;
          width: 100%;
          height: 80vh;
          top: 0;
          left: 0;
          // background: white;
          z-index: 12;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
        }
    ` }
      </style>
    </div>
  )
}