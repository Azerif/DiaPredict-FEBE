import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseLargeFill } from "react-icons/ri";

export default function NavbarLogin() {
  const [username, setUsername] = useState("John Doe");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="pt-4 shadow-md relative z-50 bg-white mb-20">
      {/* Navbar Desktop */}
      <nav className="flex h-full items-center justify-between px-9 pb-4">
        <h1 className="text-2xl ">
          Dia<span className="text-blueFigma ">Predict</span>.
        </h1>

        <ul className="md:flex gap-10 hidden">
          <li className="hover:border-b-4 border-blueFigma">
            <a
              className="text-lg  hover:text-blueFigma transition-colors"
              href="#"
            >
              Home
            </a>
          </li>
          <li className="hover:border-b-4 border-blueFigma">
            <a
              className="text-lg  hover:text-blueFigma transition-colors"
              href="#"
            >
              Prediksi
            </a>
          </li>
          <li className="hover:border-b-4 border-blueFigma">
            <a
              className="text-lg  hover:text-blueFigma transition-colors"
              href="#"
            >
              Artikel
            </a>
          </li>
        </ul>
        <section className="md:flex justify-center items-center gap-3 hidden">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            className="h-auto max-h-[45px]"
          ></img>
          <p>{username}</p>
        </section>

        {/* Hamburger */}
        <div className="cursor-pointer md:hidden z-20 transition-transform duration-300">
          {menuOpen ? (
            <RiCloseLargeFill
              size={30}
              className="transform rotate-180 transition-transform duration-300"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          ) : (
            <GiHamburgerMenu
              size={30}
              className="transform rotate-0 transition-transform duration-300"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          )}
        </div>
      </nav>

      {/* Navbar Mobile */}
      <nav
        className={`overflow-hidden transition-all duration-500 ease-in-out md:hidden ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="shadow-lg flex gap-6 flex-col justify-center items-center pt-4 pb-4 transition-opacity duration-300 ease-in-out">
          <li className="w-full">
            <a className="block text-lg text-center py-1 text-black " href="#">
              Home
            </a>
          </li>
          <li className="w-full">
            <a className="block text-center text-lg py-1 text-black" href="#">
              Prediksi
            </a>
          </li>
          <li className="w-full">
            <a className="block text-center text-lg py-1 text-black" href="#">
              Artikel
            </a>
          </li>
          <section className="flex justify-center items-center gap-3 w-9/10 bg-blueFigma px-10 py-2 rounded-2xl">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              className="h-auto max-h-[28px]"
            ></img>
            <p className="text-black">{username}</p>
          </section>
        </ul>
      </nav>
    </header>
 );
}