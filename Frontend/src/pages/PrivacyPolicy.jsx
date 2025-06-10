import React from 'react';
import LegalLayout from '../components/LegalLayout';

export default function PrivacyPolicy() {
  return (
    <LegalLayout 
      title={<>Kebijakan <span className="text-[#00B7E0]">Privasi</span></>}
      description="Bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">1. Informasi yang Kami Kumpulkan</h2>
          <p>Kami mengumpulkan informasi yang Anda berikan secara langsung, seperti nama, email, dan data kesehatan untuk keperluan prediksi diabetes.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">2. Bagaimana Kami Menggunakan Informasi</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Menyediakan layanan prediksi diabetes</li>
            <li>Meningkatkan kualitas layanan</li>
            <li>Berkomunikasi dengan Anda</li>
            <li>Mematuhi kewajiban hukum</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">3. Keamanan Data</h2>
          <p>Kami menggunakan langkah-langkah keamanan yang sesuai untuk melindungi informasi pribadi Anda dari akses yang tidak sah, perubahan, pengungkapan, atau penghancuran.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">4. Berbagi Informasi</h2>
          <p>Kami tidak menjual, memperdagangkan, atau mentransfer informasi pribadi Anda kepada pihak ketiga tanpa persetujuan Anda, kecuali sebagaimana dijelaskan dalam kebijakan ini.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">5. Hak Anda</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Mengakses informasi pribadi Anda</li>
            <li>Memperbarui atau mengoreksi informasi</li>
            <li>Menghapus akun Anda</li>
            <li>Membatasi pemrosesan data</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">6. Cookies</h2>
          <p>Kami menggunakan cookies untuk meningkatkan pengalaman pengguna dan menganalisis traffic website.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">7. Data Kesehatan</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="font-semibold text-blue-800 mb-2">🔒 Perlindungan Data Kesehatan:</p>
            <ul className="list-disc pl-6 space-y-1 text-blue-700">
              <li>Data kesehatan Anda dienkripsi dan disimpan dengan aman</li>
              <li>Akses terbatas hanya untuk keperluan prediksi</li>
              <li>Tidak dibagikan untuk tujuan komersial</li>
              <li>Dapat dihapus atas permintaan Anda</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">8. Perubahan Kebijakan</h2>
          <p>Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan akan diberitahukan melalui aplikasi atau email.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">9. Kontak</h2>
          <p>Untuk pertanyaan mengenai kebijakan privasi ini, hubungi kami:</p>
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