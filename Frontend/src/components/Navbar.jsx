import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='w-full px-4 md:px-8 py-3 shadow-md bg-white'>
      <div className='flex items-center justify-between'>
        <a href="#" className='text-2xl font-bold'>
          Dia<span className='text-[#00B7E0]'>Predict</span>.
        </a>

        {/* Hamburger Button - Mobile*/}
        <button
          className='md:hidden text-3xl'
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        <nav className='hidden md:block'>
          <ul className='flex gap-4 text-lg font-medium'>
            <li><a href="#about" className='hover:text-[#00B7E0] hover:border-b-2 hover:border-[#00B7E0] pb-1 transition-colors'>Tentang</a></li>
            <li><a href="#services" className='hover:text-[#00B7E0] hover:border-b-2 hover:border-[#00B7E0] pb-1 transition-colors'>Layanan</a></li>
            <li><a href="#testimoni" className='hover:text-[#00B7E0] hover:border-b-2 hover:border-[#00B7E0] pb-1 transition-colors'>Ulasan</a></li>
            <li><a href="#" className='hover:text-[#00B7E0] hover:border-b-2 hover:border-[#00B7E0] pb-1 transition-colors'>Artikel</a></li>
          </ul>
        </nav>

        <a href="#" className='hidden md:inline-block text-lg font-medium text-white bg-[#00B7E0] px-5 py-2 rounded-4xl hover:bg-[#0092b3] transition-colors shadow-md'>
          LOGIN
        </a>
      </div>

      {/* Mobile Navigation*/}
      <div
        className={`md:hidden mt-4 overflow-hidden transition-all duration-500 ease-in-out
          ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <ul className='flex flex-col gap-2 text-lg font-medium items-center'>
          <li><a href="#about" className='block px-2 py-1 hover:text-[#00B7E0]'>Tentang</a></li>
          <li><a href="#services" className='block px-2 py-1 hover:text-[#00B7E0]'>Layanan</a></li>
          <li><a href="#testimoni" className='block px-2 py-1 hover:text-[#00B7E0]'>Ulasan</a></li>
          <li><a href="#" className='block px-2 py-1 hover:text-[#00B7E0]'>Artikel</a></li>
        </ul>
        <a href="#" className='block mt-2 text-center text-white bg-[#00B7E0] py-2 rounded-4xl hover:bg-[#0092b3]'>LOGIN</a>
      </div>
    </header>
  );
};

export default Navbar;
