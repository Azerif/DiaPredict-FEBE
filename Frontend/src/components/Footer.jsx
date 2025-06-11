import React from 'react'
import { Link } from 'react-router-dom'

const Footer = ({ showUserNav = false }) => {
  return (
    <footer className="bg-[#CCF1F9] text-black pt-10">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {/* Logo Dan Deskripsi */}
            <div className='mb-10'>
                <h2 className="text-2xl font-bold">Dia<span className="text-sky-500">Predict.</span></h2>
                <p className="mt-2 text-base leading-relaxed">
                    Prediksi dini dengan DiaPredict,<br />
                    untuk masa depan yang lebih<br />
                    sehat, aman, dan bebas dari<br />
                    komplikasi diabetes.
                </p>
            </div>

            {/* Navigasi */}
            <div className='mb-10'>
                <h3 className="font-semibold mb-2">Navigasi</h3>
                <ul className="space-y-1 mt-4">
                    {showUserNav ? (
                        // Navigasi untuk user yang sudah login
                        <>
                            <li><Link to="/home" className="hover:underline">Home</Link></li>
                            <li><Link to="/histori" className="hover:underline">Histori</Link></li>
                            <li><Link to="/education" className="hover:underline">Artikel</Link></li>
                        </>
                    ) : (
                        // Navigasi untuk landing page
                        <>
                            <li><a href="#about" className="hover:underline">Tentang</a></li>
                            <li><a href="#services" className="hover:underline">Layanan</a></li>
                            <li><a href="#testimoni" className="hover:underline">Ulasan</a></li>
                        </>
                    )}
                </ul>
            </div>

            {/* Hubungi Kami */}
            <div>
                <h3 className="font-semibold mb-2">Hubungi Kami</h3>
                <ul className="space-y-2 text-sm">
                    <li>📍 123 Lenteng, Jakarta, 2231</li>
                    <li>📞 +62 123 4567 890</li>
                    <li>✉️ DiaPredict@gmail.com</li>
                </ul>
            </div>

            {/* Buletin */}
            <div>
                <h3 className="font-semibold mb-2">Berlangganan Buletin</h3>
                <p className="text-sm mb-2">Dapatkan Berita Terkini mengenai DiaPredict</p>
                <input
                    type="email"
                    placeholder="Alamat Email Anda"
                    className="w-full px-3 py-2 border rounded-md mb-2 bg-white"
                />
                <button className="w-full bg-sky-400 hover:bg-sky-500 text-white py-2 rounded-md">
                    Berlangganan
                </button>
            </div>
        </div>

        {/* Copyright */}
        <div className="bg-[#00B7E0] text-white text-center py-3 mt-6">
            <div className="max-w-[1200px] mx-auto px-6">
                <p className="mb-2">©Copyright | All Rights Reserved</p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                    <Link to="/eula" className="hover:underline">
                        EULA
                    </Link>
                    <Link to="/privacy-policy" className="hover:underline">
                        Kebijakan Privasi
                    </Link>
                    <Link to="/terms" className="hover:underline">
                        Syarat & Ketentuan
                    </Link>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer