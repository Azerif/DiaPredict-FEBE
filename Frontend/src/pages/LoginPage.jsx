import React from 'react'
import LoginImage from '../assets/loginRegist-img/login.png'

const LoginPage = () => {
  return (
    <section className="flex flex-col-reverse min-h-screen md:flex-row md:h-screen">
        {/* BOX CONTENT */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 bg-white">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold mb-2">
                    Selamat datang di Dia<span className="text-[#00B7E0]">Predict</span>
                </h1>
                <p className="mb-6 text-gray-600 text-center">Kenali Risiko, Kendalikan Hidup.</p>

                <form>
                    <div className="mb-4">
                        <label className='font-medium'>Email</label>
                        <input
                            type="email"
                            placeholder="example@gmail.com"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-2">
                        <label className='font-medium'>Kata Sandi</label>
                        <input
                            type="password"
                            placeholder="*******************"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="flex justify-between text-sm mb-4">
                        <a href="#" className="font-medium hover:text-[#00B7E0]">Lupa Kata Sandi?</a>
                    </div>

                     <div className="flex items-center justify-between mb-4 gap-2">
                        <label htmlFor="remember">Tetap Masuk</label>
                        <input
                            type="checkbox"
                            defaultChecked
                            className="toggle border-white bg-[#7E99A3] checked:bg-[#00B7E0] checked:text-white"
                        />
                    </div>

                    <button
                    type="submit"
                    className="w-full py-2 text-white font-semibold bg-[#00B7E0] hover:bg-[#0092b3] rounded-full"
                    >
                    Log in
                    </button>

                    <p className="text-sm text-center mt-4">
                    Belum memiliki akun?{" "}
                        <a href="#" className="font-semibold hover:text-[#00B7E0]">Daftar</a>
                    </p>
                </form>
            </div>
        </div>

        {/* BOX GAMBAR */}
        <div className="w-full md:w-1/2">
            <img
            src={LoginImage}
            alt="Login"
            className="w-full h-auto md:h-full object-cover"
            />
        </div>
    </section>
  )
}

export default LoginPage