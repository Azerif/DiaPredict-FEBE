import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavbarAfter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Menutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className='w-full px-4 md:px-8 py-3 shadow-md bg-white'>
      <div className='flex items-center justify-between'>
        <Link to="/home" className='text-2xl font-bold'>
          Dia<span className='text-[#00B7E0]'>Predict</span>.
        </Link>

        {/* Hamburger Button - Mobile */}
        <button
          className='md:hidden text-3xl'
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        <nav className='hidden md:block'>
          <ul className='flex gap-4 text-lg font-medium'>
            <li><Link to="/home" className='hover:text-[#00B7E0] hover:border-b-2 hover:border-[#00B7E0] pb-1 transition-colors'>Home</Link></li>
            <li><Link to="/histori" className='hover:text-[#00B7E0] hover:border-b-2 hover:border-[#00B7E0] pb-1 transition-colors'>Histori</Link></li>
            <li><Link to="/education" className='hover:text-[#00B7E0] hover:border-b-2 hover:border-[#00B7E0] pb-1 transition-colors'>Artikel</Link></li>
          </ul>
        </nav>

        {/* LETAK DROPDOWN DISINI */}
        <div className="relative ml-4 hidden md:block" ref={dropdownRef}>
            <div className='flex items-center gap-3'>          
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                >
                    <span className="sr-only">Open user menu</span>
                    <img
                    className="w-8 h-8 rounded-full"
                    src="/assets/customers/1.jpg"
                    alt="user"
                    />
                </button>
                <p className='block font-medium text-base hover:text-[#00B7E0]'>John Doe</p>
            </div>

          {dropdownOpen && (
            <div className="absolute right-0 z-10 mt-3 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>Bonnie Green</div>
                <div className="font-medium truncate">name@flowbite.com</div>
              </div>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                </li>
              </ul>
              <div className="py-2">
                <Link to="/" className="block px-4 py-2 text-sm text-red-700 font-medium hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden mt-4 overflow-hidden transition-all duration-500 ease-in-out
          ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <ul className='flex flex-col gap-2 text-lg font-medium items-center'>
          <li><Link to="/dashboard" className='block px-2 py-1 hover:text-[#00B7E0]'><img src='/assets/customers/1.jpg' className='w-12 h-12 rounded-full'></img></Link></li>
          <li><Link to="/home" className='block px-2 py-1 hover:text-[#00B7E0]'>Home</Link></li>
          <li><Link to="/histori" className='block px-2 py-1 hover:text-[#00B7E0]'>Histori</Link></li>
          <li><Link to="/education" className='block px-2 py-1 hover:text-[#00B7E0]'>Artikel</Link></li>
        </ul>
        <Link to="/" className='block mt-2 text-center text-white bg-[#00B7E0] py-2 rounded-4xl hover:bg-[#0092b3]'>Logout</Link>
      </div>
    </header>
  );
};

export default NavbarAfter;
