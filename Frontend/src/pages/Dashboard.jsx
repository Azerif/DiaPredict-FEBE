import Footer from "../components/Footer";
import NavbarAfter from "../components/NavbarAfter";

export default function Dashboard() {
  return (
    <div>
    <NavbarAfter />
    <main>
      <h1 className="text-center mt-10 font-medium text-3xl">Edit Profil</h1>
      <section className="max-w-3xl mx-auto md:grid grid-cols-2 items-center hidden">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          className="h-auto max-h-[300px] justify-self-center"
        ></img>
        <section className="max-w-md p-6 justify-self-start">
          {/* Nama */}
          <label className="block font-semibold mb-1">Nama Anda</label>
          <div className="flex items-center border rounded-md px-3 py-2 mb-4">
            <input
              type="text"
              placeholder="John Doe"
              className="flex-1 outline-none bg-transparent"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A4 4 0 0112 16h0a4 4 0 016.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>

          {/* Email */}
          <label className="block font-semibold mb-1">Email :</label>
          <div className="flex items-center border rounded-md px-3 py-2 mb-4">
            <input
              type="email"
              placeholder="JohnDoe@gmail.com"
              className="flex-1 outline-none bg-transparent"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v16h16V4H4zm4 4l4 4 4-4"
              />
            </svg>
          </div>

          {/* Ganti Password */}
          <p className="font-semibold mt-6 mb-2">Ganti Password (Opsional) :</p>

          <label className="block mb-1">Password Baru :</label>
          <input
            type="password"
            placeholder="johndoe123"
            className="w-full border rounded-md px-3 py-2 mb-4 outline-none"
          />

          <label className="block mb-1">Konfirmasi Password Baru :</label>
          <input
            type="password"
            placeholder="johndoe123"
            className="w-full border rounded-md px-3 py-2 mb-4 outline-none"
          />

          {/* Upload */}
          <label className="block font-semibold mb-1">
            Unggah Gambar Profil
          </label>
          <div className="flex items-center border rounded-md px-3 py-2">
            <input
              type="file"
              className="w-full text-sm text-gray-500 file:hidden"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12l-4 4m0 0l-4-4m4 4V8"
              />
            </svg>
          </div>
        </section>
      </section>
      <section>
        <section className="flex flex-col justify-center items-center mt-20 md:hidden">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            className="h-auto max-h-[250px] max-w-[250px]"
          ></img>
          <section className="max-w-md p-6 justify-self-start">
            {/* Nama */}
            <label className="block font-semibold mb-1">Nama Anda</label>
            <div className="flex items-center border rounded-md px-3 py-2 mb-4">
              <input
                type="text"
                placeholder="John Doe"
                className="flex-1 outline-none bg-transparent"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A4 4 0 0112 16h0a4 4 0 016.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>

            {/* Email */}
            <label className="block font-semibold mb-1">Email :</label>
            <div className="flex items-center border rounded-md px-3 py-2 mb-4">
              <input
                type="email"
                placeholder="JohnDoe@gmail.com"
                className="flex-1 outline-none bg-transparent"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v16h16V4H4zm4 4l4 4 4-4"
                />
              </svg>
            </div>

            {/* Ganti Password */}
            <p className="font-semibold mt-6 mb-2">
              Ganti Password (Opsional) :
            </p>

            <label className="block mb-1">Password Baru :</label>
            <input
              type="password"
              placeholder="johndoe123"
              className="w-full border rounded-md px-3 py-2 mb-4 outline-none"
            />

            <label className="block mb-1">Konfirmasi Password Baru :</label>
            <input
              type="password"
              placeholder="johndoe123"
              className="w-full border rounded-md px-3 py-2 mb-4 outline-none"
            />

            {/* Upload */}
            <label className="block font-semibold mb-1">
              Unggah Gambar Profil
            </label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <input
                type="file"
                className="w-full text-sm text-gray-500 file:hidden"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12l-4 4m0 0l-4-4m4 4V8"
                />
              </svg>
            </div>
          </section>
        </section>
      </section>
    </main>
  <Footer />
  </div>
  );
}

