import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword, verifyResetCode, resetPassword } from "../api/auth";
import { alertSuccess, alertError } from "../lib/alerts";
import { motion } from "framer-motion";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1); // 1: email, 2: code, 3: password
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      alertError("Email harus diisi!");
      return;
    }

    setIsLoading(true);
    try {
      await forgotPassword({ email });
      setStep(2);
      alertSuccess("Kode reset password telah dikirim ke email Anda!");
    } catch (err) {
      alertError(err.response?.data?.message || "Gagal mengirim kode reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    
    if (!code) {
      alertError("Kode verifikasi harus diisi!");
      return;
    }

    setIsLoading(true);
    try {
      await verifyResetCode({ email, code });
      setStep(3);
      alertSuccess("Kode verifikasi valid!");
    } catch (err) {
      alertError(err.response?.data?.message || "Kode verifikasi tidak valid.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (password.length < 6) {
      alertError("Password minimal 6 karakter!");
      return;
    }

    if (password !== confirmPassword) {
      alertError("Konfirmasi password tidak cocok!");
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword({ email, code, password });
      alertSuccess("Password berhasil direset! Silakan login dengan password baru.");
      // Redirect ke login page
      window.location.href = "/login";
    } catch (err) {
      alertError(err.response?.data?.message || "Gagal reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      await forgotPassword({ email });
      alertSuccess("Kode reset password baru telah dikirim!");
    } catch (err) {
      alertError(err.response?.data?.message || "Gagal mengirim ulang kode.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 rounded-lg shadow-md"
      >
        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 1 ? 'bg-[#00B7E0] text-white' : 'bg-gray-200 text-gray-600'}`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-[#00B7E0]' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 2 ? 'bg-[#00B7E0] text-white' : 'bg-gray-200 text-gray-600'}`}>
              2
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-[#00B7E0]' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 3 ? 'bg-[#00B7E0] text-white' : 'bg-gray-200 text-gray-600'}`}>
              3
            </div>
          </div>
        </div>

        {/* Step 1: Email */}
        {step === 1 && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold">Lupa Kata Sandi?</h2>
              <p className="text-gray-600 mt-2">
                Masukkan email Anda untuk menerima kode reset password
              </p>
            </div>

            <form onSubmit={handleEmailSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#00B7E0] focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#00B7E0] text-white font-semibold rounded-full hover:bg-[#0092b3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Mengirim..." : "Kirim Kode Reset"}
              </button>
            </form>
          </>
        )}

        {/* Step 2: Verification Code */}
        {step === 2 && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold">Masukkan Kode Verifikasi</h2>
              <p className="text-gray-600 mt-2">
                Kami telah mengirim kode 6 digit ke <strong>{email}</strong>
              </p>
            </div>

            <form onSubmit={handleCodeSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Kode Verifikasi</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                  className="w-full p-3 border rounded-lg text-center text-2xl font-bold letter-spacing-wider focus:ring-2 focus:ring-[#00B7E0] focus:border-transparent"
                  maxLength={6}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#00B7E0] text-white font-semibold rounded-full hover:bg-[#0092b3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-4"
              >
                {isLoading ? "Memverifikasi..." : "Verifikasi Kode"}
              </button>

              <div className="text-center space-y-2">
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isLoading}
                  className="text-sm text-[#00B7E0] hover:underline disabled:opacity-50"
                >
                  Kirim Ulang Kode
                </button>
                <br />
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm text-gray-600 hover:underline"
                >
                  Kembali ke Email
                </button>
              </div>
            </form>
          </>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold">Buat Password Baru</h2>
              <p className="text-gray-600 mt-2">
                Masukkan password baru untuk akun Anda
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Password Baru</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password baru"
                    className="w-full p-3 border rounded-lg pr-10 focus:ring-2 focus:ring-[#00B7E0] focus:border-transparent"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-[#00B7E0]"
                    aria-label="Toggle Password Visibility"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.973 9.973 0 011.875-5.825M21.125 5.175A9.973 9.973 0 0122 9c0 5.523-4.477 10-10 10a10.05 10.05 0 01-1.875-.175M3 3l18 18"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Konfirmasi Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Konfirmasi password baru"
                    className="w-full p-3 border rounded-lg pr-10 focus:ring-2 focus:ring-[#00B7E0] focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-[#00B7E0]"
                    aria-label="Toggle Confirm Password Visibility"
                  >
                    {showConfirmPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.973 9.973 0 011.875-5.825M21.125 5.175A9.973 9.973 0 0122 9c0 5.523-4.477 10-10 10a10.05 10.05 0 01-1.875-.175M3 3l18 18"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#00B7E0] text-white font-semibold rounded-full hover:bg-[#0092b3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Memproses..." : "Reset Password"}
              </button>
            </form>
          </>
        )}

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="text-sm text-[#00B7E0] hover:underline"
          >
            Kembali ke Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;