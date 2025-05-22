import React from 'react'

const Footer = () => {
  return (
    <footer class="bg-[#CCF1F9] text-black pt-10">
        <div class="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
            {/* Logo Dan Deskripsi */}
            <div className='mb-10'>
                <h2 class="text-2xl font-bold">Dia<span class="text-sky-500">Predict.</span></h2>
                <p class="mt-2 text-base leading-relaxed">
                    Prediksi dini dengan DiaPredict,<br />
                    untuk masa depan yang lebih<br />
                    sehat, aman, dan bebas dari<br />
                    komplikasi diabetes.
                </p>
            </div>

            {/* Navigasi */}
            <div className='mb-10'>
                <h3 class="font-semibold mb-2">Navigasi</h3>
                <ul class="space-y-1">
                    <li><a href="#" class="hover:underline">Tentang</a></li>
                    <li><a href="#" class="hover:underline">Layanan</a></li>
                    <li><a href="#" class="hover:underline">Ulasan</a></li>
                    <li><a href="#" class="hover:underline">Kontak</a></li>
                </ul>
            </div>

            {/* Hubungi Kami */}
            <div>
                <h3 class="font-semibold mb-2">Hubungi Kami</h3>
                <ul class="space-y-2 text-sm">
                    <li>📍 123 Lenteng, Jakarta, 2231</li>
                    <li>📞 +62 123 4567 890</li>
                    <li>✉️ DiaPredict@gmail.com</li>
                </ul>
            </div>

            {/* Buletin */}
            <div>
                <h3 class="font-semibold mb-2">Berlangganan Buletin</h3>
                <p class="text-sm mb-2">Dapatkan Berita Terkini mengenai DiaPredict</p>
                <input
                    type="email"
                    placeholder="Alamat Email Anda"
                    class="w-full px-3 py-2 border rounded-md mb-2 bg-white"
                />
                <button class="w-full bg-sky-400 hover:bg-sky-500 text-white py-2 rounded-md">
                    Berlangganan
                </button>
            </div>
        </div>

        {/* Copyright */}
        <div class="bg-[#00B7E0] text-white text-center py-3 mt-6">
            ©Copyright | All Rights Reserved
        </div>
    </footer>
  )
}

export default Footer