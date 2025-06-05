import React, { useState } from 'react';
import RegisterImage from '../assets/loginRegist-img/register.png';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';
import { alertSuccess, alertError } from "../lib/alerts";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('Semua field harus diisi');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('kata sandi dan konfirmasi kata sandi harus sama');
      return;
    }

    try {
      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password
      });

      alertSuccess('Registrasi berhasil! Silakan masuk ke akun Anda.');
      navigate('/login');
    } catch (err) {
      alertError(err.message || 'Registrasi gagal. Silakan coba lagi.');
    }
  };

  return (
    <section className="flex flex-col h-screen md:flex-row md:h-screen">
      <div className="w-full md:w-1/2">
        <img
          src={RegisterImage}
          alt="Register"
          className="w-full h-[100px] md:h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-center text-4xl text-[#00B7E0] font-bold mb-10">
            Daftar
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="font-medium">Nama Lengkap</label>
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
              <label htmlFor="email" className="font-medium">Email</label>
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
              <label htmlFor="password" className="font-medium">Kata Sandi</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Masukkan Kata Sandi"
                  className="w-full p-2 border rounded pr-10"
                  required
                  value={form.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-[#00B7E0]"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.973 9.973 0 011.875-5.825M21.125 5.175A9.973 9.973 0 0122 9c0 5.523-4.477 10-10 10a10.05 10.05 0 01-1.875-.175M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="font-medium">Konfirmasi Kata Sandi</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Konfirmasi Kata Sandi"
                  className="w-full p-2 border rounded pr-10"
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-[#00B7E0]"
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.973 9.973 0 011.875-5.825M21.125 5.175A9.973 9.973 0 0122 9c0 5.523-4.477 10-10 10a10.05 10.05 0 01-1.875-.175M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
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
