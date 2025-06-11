import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Cek apakah user sedang berada di halaman legal
  const isOnLegalPage = ['/eula', '/privacy-policy', '/terms'].includes(location.pathname);

  const handleNavClick = (sectionId) => {
    if (isOnLegalPage) {
      // Jika di halaman legal, arahkan ke landing page dan scroll ke section
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Jika sudah di landing page, langsung scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false); // Tutup mobile menu
  };

  return (
    <header className='w-full px-4 md:px-8 py-3 shadow-md bg-white sticky top-0 z-999'>
      <div className='flex items-center justify-between'>
        <Link to="/" className='text-2xl font-bold'>
          Dia<span className='text-[#00B7E0]'>Predict</span>.
        </Link>

        {/* Hamburger Button - Mobile*/}
        <button
          className='md:hidden text-3xl'
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        <nav className='hidden md:block'>
          <ul className='flex gap-4 text-lg font-medium'>
            <li>
              <button 
                onClick={() => handleNavClick('about')}
                className='hover:text-[#00B7E0] hover:border-b-2 hover:border-[#00B7E0] pb-1 transition-colors cursor-pointer'
              >
                Tentang
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavClick('services')}
                className='hover:text-[#00B7E0] hover:border-b-2 hover:border-[#00B7E0] pb-1 transition-colors cursor-pointer'
              >
                Layanan
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavClick('testimoni')}
                className='hover:text-[#00B7E0] hover:border-b-2 hover:border-[#00B7E0] pb-1 transition-colors cursor-pointer'
              >
                Ulasan
              </button>
            </li>
            <li>
              <Link to="/education" className='hover:text-[#00B7E0] hover:border-b-2 hover:border-[#00B7E0] pb-1 transition-colors'>
                Artikel
              </Link>
            </li>
          </ul>
        </nav>

        <Link to="/login" className='hidden md:inline-block text-lg font-medium text-white bg-[#00B7E0] px-5 py-2 rounded-4xl hover:bg-[#0092b3] transition-colors shadow-md'>
          LOGIN
        </Link>
      </div>

      {/* Mobile Navigation*/}
      <div
        className={`md:hidden mt-4 overflow-hidden transition-all duration-500 ease-in-out
          ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <ul className='flex flex-col gap-2 text-lg font-medium items-center'>
          <li>
            <button 
              onClick={() => handleNavClick('about')}
              className='block px-2 py-1 hover:text-[#00B7E0] cursor-pointer'
            >
              Tentang
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavClick('services')}
              className='block px-2 py-1 hover:text-[#00B7E0] cursor-pointer'
            >
              Layanan
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavClick('testimoni')}
              className='block px-2 py-1 hover:text-[#00B7E0] cursor-pointer'
            >
              Ulasan
            </button>
          </li>
          <li>
            <Link to="/education" className='block px-2 py-1 hover:text-[#00B7E0]' onClick={() => setIsOpen(false)}>
              Artikel
            </Link>
          </li>
        </ul>
        <Link to="/login" className='block mt-2 text-center text-white bg-[#00B7E0] py-2 rounded-4xl hover:bg-[#0092b3]' onClick={() => setIsOpen(false)}>
          LOGIN
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
