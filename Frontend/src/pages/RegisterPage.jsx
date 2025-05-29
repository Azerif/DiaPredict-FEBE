import React, { useState } from 'react';
import RegisterImage from '../assets/loginRegist-img/register.png';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi input
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('Semua field harus diisi');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Password dan konfirmasi password harus sama');
      return;
    }

    // TODO: Integrasi ke backend register di sini (fetch API, axios, dll)
    // Contoh sederhana redirect jika berhasil register:
    navigate('/login');
  };

  return (
    <section className="flex flex-col h-screen md:flex-row md:h-screen">
      {/* BOX GAMBAR */}
      <div className="w-full md:w-1/2">
        <img
          src={RegisterImage}
          alt="Register"
          className="w-full h-[100px] md:h-full object-cover"
        />
      </div>

      {/* BOX CONTENT */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-center text-4xl text-[#00B7E0] font-bold mb-10">
            Daftar
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="font-medium">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-2 border rounded"
                required
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                className="w-full p-2 border rounded"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="font-medium">
                Kata Sandi
              </label>
              <input
                type="password"
                name="password"
                placeholder="Masukkan Kata Sandi"
                className="w-full p-2 border rounded"
                required
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="font-medium">
                Konfirmasi Kata Sandi
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Konfirmasi Kata Sandi"
                className="w-full p-2 border rounded"
                required
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {error && (
              <p className="mb-4 text-red-600 font-semibold text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-2 text-white font-semibold bg-[#00B7E0] hover:bg-[#0092b3] rounded-full"
            >
              Daftar Akun
            </button>

            <p className="text-sm text-center mt-4">
              Sudah Punya Akun?{' '}
              <Link to="/login" className="font-semibold hover:text-[#00B7E0]">
                Masuk
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
