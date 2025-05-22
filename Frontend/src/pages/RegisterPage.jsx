import React from 'react'
import RegisterImage from '../assets/loginRegist-img/register.png'

const RegisterPage = () => {
  return (
    <section className="flex flex-col-reverse min-h-screen md:flex-row md:h-screen">
         {/* BOX GAMBAR */}
        <div className="w-full md:w-1/2">
            <img
            src={RegisterImage}
            alt="Login"
            className="w-full h-auto md:h-full object-cover"
            />
        </div>

        {/* BOX CONTENT */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 bg-white">
            <div className="w-full max-w-md">
                <h1 className="text-center text-4xl text-[#00B7E0] font-bold mb-10">
                    Daftar
                </h1>

                <form>
                    <div className="mb-4">
                        <label htmlFor="" className='font-medium'>Nama Lengkap</label>
                        <input 
                            type="text" 
                            placeholder='Your Name' 
                            className="w-full p-2 border rounded" 
                            required
                        />
                    </div>


                    <div className="mb-4">
                        <label className='font-medium'>Email</label>
                        <input
                            type="email"
                            placeholder="example@gmail.com"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className='font-medium'>Kata Sandi</label>
                        <input
                            type="password"
                            placeholder="*******************"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className='font-medium'>Konfirmasi Kata Sandi</label>
                        <input
                            type="password"
                            placeholder="*******************"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <button
                    type="submit"
                    className="w-full py-2 text-white font-semibold bg-[#00B7E0] hover:bg-[#0092b3] rounded-full"
                    >
                    Log in
                    </button>

                    <p className="text-sm text-center mt-4">
                    Sudah Punya Akun?{" "}
                        <a href="#" className="font-semibold hover:text-[#00B7E0]">Masuk</a>
                    </p>
                </form>
            </div>
        </div>
    </section>
  )
}

export default RegisterPage