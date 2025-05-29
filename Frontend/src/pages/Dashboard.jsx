import { useState } from "react";
import { alertSuccess, alertError } from "../lib/alerts";
import Footer from "../components/Footer";
import NavbarAfter from "../components/NavbarAfter";

export default function Dashboard() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password && form.password !== form.confirmPassword) {
      alertError("Password tidak cocok");
      return;
    }

    console.log("Form submitted:", form);
    alertSuccess("Profil berhasil diperbarui");
  };

  return (
    <div>
      <NavbarAfter />
      <main>
        <h1 className="text-center mt-10 font-medium text-3xl">Edit Profil</h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto grid md:grid-cols-2 place-items-center gap-6 p-6"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            className="h-auto max-h-[300px] justify-self-center items-center"
          />
          <section className="max-w-md justify-self-start">
            <label className="block font-semibold mb-1">Nama Anda</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full border rounded-md px-3 py-2 mb-4 outline-none"
            />

            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="JohnDoe@gmail.com"
              className="w-full border rounded-md px-3 py-2 mb-4 outline-none"
            />

            <p className="font-semibold mt-6 mb-2">Ganti Password (Opsional)</p>

            <label className="block mb-1">Password Baru</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 mb-4 outline-none"
            />

            <label className="block mb-1">Konfirmasi Password Baru</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 mb-4 outline-none"
            />

            <label className="block font-semibold mb-1">
              Unggah Gambar Profil
            </label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <input
                type="file"
                name="image"
                onChange={handleChange}
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

            <button
              type="submit"
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Simpan Perubahan
            </button>
          </section>
        </form>
      </main>
      <Footer />
    </div>
  );
}
