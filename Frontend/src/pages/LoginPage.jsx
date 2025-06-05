import React, { useState } from 'react';
import LoginImage from '../assets/loginRegist-img/login.png';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { useUser } from '../contexts/UserContext';
import { alertSuccess, alertError } from "../lib/alerts";

const LoginPage = () => {
  const navigate = useNavigate();
  const { fetchUser } = useUser();
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!email || !password) {
      alert('Email dan password harus diisi!');
      return;
    }

    try {
      const res = await loginUser({ email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      await fetchUser();
      
      alertSuccess('Login berhasil! Selamat datang di DiaPredict.');
      navigate('/home');
    } catch (err) {
      alertError(err.message || 'Login gagal. Silakan coba lagi.');
    }
  };

  return (
    <section className="flex flex-col-reverse h-screen md:flex-row md:h-screen">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2">
            Selamat datang di Dia<span className="text-[#00B7E0]">Predict</span>
          </h1>
          <p className="mb-6 text-gray-600 text-center">Kenali Risiko, Kendalikan Hidup.</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className='font-medium'>Email</label>
              <input
                name="email"
                type="email"
                placeholder="example@gmail.com"
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-2">
              <label className='font-medium'>Kata Sandi</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan Kata Sandi"
                  className="w-full p-2 border rounded pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-[#00B7E0]"
                  aria-label="Toggle Password Visibility"
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

            <div className="flex justify-between text-sm mb-4">
              <a href="#" className="font-medium hover:text-[#00B7E0]">Lupa Kata Sandi?</a>
            </div>

            <div className="mb-4 flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
                className="w-4 h-4"
              />
              <label htmlFor="remember" className="text-sm">
                Tetap Masuk
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2 text-white font-semibold bg-[#00B7E0] hover:bg-[#0092b3] rounded-full"
            >
              Log in
            </button>

            <p className="text-sm text-center mt-4">
              Belum memiliki akun?{" "}
              <Link to="/register" className="font-semibold hover:text-[#00B7E0]">Daftar</Link>
            </p>
          </form>
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <img
          src={LoginImage}
          alt="Login"
          className="w-full h-[150px] md:h-full object-cover"
        />
      </div>
    </section>
  );
};

export default LoginPage;
