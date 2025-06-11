import React from 'react';
import Navbar from './Navbar';
import NavbarAfter from './NavbarAfter';
import Footer from './Footer';

const LegalLayout = ({ children, title, description }) => {
  // Cek token di kedua storage
  const isLoggedIn = sessionStorage.getItem('token') !== null || localStorage.getItem('token') !== null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Gunakan NavbarAfter jika user sudah login, Navbar jika belum */}
      {isLoggedIn ? <NavbarAfter /> : <Navbar />}
      
      {/* Kurangi py-8 menjadi py-4 dan mt-16 menjadi mt-20 untuk lebih mepet */}
      <main className="py-10 mt-2">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className="flex flex-col justify-center items-center gap-3 mb-4">
                <div className="p-3 bg-[#CCF1F9] rounded-full">
                  <svg
                    className="w-6 h-6 text-[#00B7E0]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {title}
                </h1>
              </div>
              <p className="text-gray-600">
                {description}
              </p>
            </div>

            <div className="prose max-w-none text-gray-700">
              <p className="text-sm text-gray-500 mb-6">
                Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}
              </p>
              {children}
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer juga disesuaikan dengan status login */}
      <Footer showUserNav={isLoggedIn} />
    </div>
  );
};

export default LegalLayout;