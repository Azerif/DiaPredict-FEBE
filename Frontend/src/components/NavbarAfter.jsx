import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const NavbarAfter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, isLoading, clearUser } = useUser();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    // Handle close tab - hapus sessionStorage jika user tidak centang "Tetap Masuk"
    const handleBeforeUnload = () => {
      // Jika token ada di sessionStorage (artinya user tidak centang "Tetap Masuk")
      if (sessionStorage.getItem('token')) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("beforeunload", handleBeforeUnload);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleLogout = async () => {
    // Hapus token dari kedua storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    
    await clearUser();
    setDropdownOpen(false);
    navigate("/");
  };

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className="hover:text-[#00B7E0] hover:border-b-2 hover:border-[#00B7E0] pb-1 transition-colors"
    >
      {children}
    </Link>
  );

  return (
    <header className="w-full px-4 md:px-20 py-3 shadow-md bg-white sticky top-0 z-999">
      <div className="flex items-center justify-between">
        <Link to="/home" className="text-2xl font-bold">
          Dia<span className="text-[#00B7E0]">Predict</span>.
        </Link>

        <button
          className="md:hidden text-3xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-4 text-lg font-medium">
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/histori">Histori</NavLink>
            </li>
            <li>
              <NavLink to="/education">Artikel</NavLink>
            </li>
          </ul>
        </nav>

        {/* Profile Dropdown */}
        <div className="relative ml-4 hidden md:block" ref={dropdownRef}>
          <div
            className="flex items-center gap-3 cursor-pointer w-[140px]"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {/* Avatar - ukuran tetap */}
            <div className="w-8 h-8 flex-shrink-0">
              {isLoading ? (
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
              ) : user.image ? (
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={user.image}
                  alt={user.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/default-user-icon.png";
                  }}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A9 9 0 1119 12a9 9 0 01-13.879 5.804z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Nama - ukuran tetap */}
            <div className="w-[88px] h-5 flex items-center">
              {isLoading ? (
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              ) : (
                <p className="font-medium text-base hover:text-[#00B7E0] truncate w-full">
                  {user.name || "User"}
                </p>
              )}
            </div>
          </div>

          {dropdownOpen && !isLoading && (
            <div className="absolute right-0 z-10 mt-3 w-70 bg-white divide-y divide-gray-100 rounded-lg shadow-sm">
              <div className="px-5 py-3 text-sm text-gray-900">
                <div className="font-semibold ">{user.name}</div>
                <div className="truncate">{user.email}</div>
              </div>
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <Link
                    to="/dashboard"
                    className="block px-5 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
              <div className="py-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-5 py-2 text-sm text-red-700 font-medium hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden mt-4 overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-2 text-lg font-medium items-center">
          <li className="w-12 h-12 flex justify-center items-center">
            <Link to="/dashboard" className="block hover:text-[#00B7E0]">
              {isLoading ? (
                <div className="w-12 h-12 rounded-full bg-gray-200"></div>
              ) : user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A9 9 0 1119 12a9 9 0 01-13.879 5.804z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              )}
            </Link>
          </li>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/histori">Histori</NavLink>
          </li>
          <li>
            <NavLink to="/education">Artikel</NavLink>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="block mt-2 w-full text-center text-white bg-[#00B7E0] py-2 rounded-4xl hover:bg-[#0092b3]"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default NavbarAfter;
