import React from 'react';
import LegalLayout from '../components/LegalLayout';

export default function TermsAndConditions() {
  return (
    <LegalLayout 
      title={<>Syarat & <span className="text-[#00B7E0]">Ketentuan</span></>}
      description="Ketentuan penggunaan layanan DiaPredict"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">1. Penerimaan Syarat</h2>
          <p>Dengan mengakses dan menggunakan DiaPredict, Anda menyetujui untuk terikat dan mematuhi syarat dan ketentuan ini.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">2. Deskripsi Layanan</h2>
          <p>DiaPredict adalah aplikasi prediksi diabetes yang menyediakan estimasi risiko diabetes berdasarkan data kesehatan yang Anda masukkan. Layanan ini tidak menggantikan konsultasi medis profesional.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">3. Registrasi Akun</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Anda harus berusia minimal 18 tahun untuk menggunakan layanan ini</li>
            <li>Informasi yang Anda berikan harus akurat dan terkini</li>
            <li>Anda bertanggung jawab untuk menjaga keamanan akun Anda</li>
            <li>Satu orang hanya diperbolehkan memiliki satu akun</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">4. Penggunaan yang Diperbolehkan</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Menggunakan layanan untuk keperluan pribadi</li>
            <li>Memasukkan data kesehatan yang akurat</li>
            <li>Mengikuti panduan penggunaan yang disediakan</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">5. Penggunaan yang Dilarang</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Menggunakan layanan untuk tujuan komersial tanpa izin</li>
            <li>Membagikan akun dengan orang lain</li>
            <li>Memasukkan data palsu atau menyesatkan</li>
            <li>Menggunakan layanan untuk merugikan pihak lain</li>
            <li>Mencoba mengakses sistem secara tidak sah</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">6. Penafian Medis</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="font-semibold text-yellow-800 mb-2">⚠️ Penting untuk Diketahui:</p>
            <ul className="list-disc pl-6 space-y-1 text-yellow-700">
              <li>DiaPredict bukan alat diagnosis medis</li>
              <li>Hasil prediksi tidak menggantikan konsultasi dokter</li>
              <li>Selalu konsultasikan dengan tenaga medis profesional</li>
              <li>Jangan menggunakan hasil ini sebagai dasar pengobatan</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">7. Privasi Data</h2>
          <p>Penggunaan dan perlindungan data pribadi Anda diatur dalam Kebijakan Privasi kami yang terpisah.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">8. Pembatasan Tanggung Jawab</h2>
          <p>DiaPredict tidak bertanggung jawab atas kerugian langsung atau tidak langsung yang timbul dari penggunaan layanan ini.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">9. Hukum yang Berlaku</h2>
          <p>Syarat dan ketentuan ini tunduk pada hukum Republik Indonesia.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">10. Kontak</h2>
          <p>Untuk pertanyaan mengenai syarat dan ketentuan ini, hubungi kami:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Email: DiaPredict@gmail.com</li>
            <li>Telepon: +62 123 4567 890</li>
            <li>Alamat: 123 Lenteng, Jakarta, 2231</li>
          </ul>
        </section>
      </div>
    </LegalLayout>
  );
}