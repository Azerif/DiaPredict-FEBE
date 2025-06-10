import React from 'react';
import LegalLayout from '../components/LegalLayout';

export default function EULA() {
  return (
    <LegalLayout 
      title={<>End User License Agreement <span className="text-[#00B7E0]">(EULA)</span></>}
      description="Perjanjian Lisensi Pengguna Akhir untuk DiaPredict"
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">1. Penerimaan Ketentuan</h2>
          <p>Dengan menggunakan aplikasi DiaPredict, Anda menyetujui untuk terikat dengan ketentuan EULA ini.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">2. Lisensi Penggunaan</h2>
          <p>DiaPredict memberikan Anda lisensi terbatas, non-eksklusif, dan tidak dapat dipindahtangankan untuk menggunakan aplikasi ini sesuai dengan ketentuan yang berlaku.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">3. Penggunaan yang Dilarang</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Menggunakan aplikasi untuk tujuan ilegal</li>
            <li>Memodifikasi, mendistribusikan, atau menjual aplikasi</li>
            <li>Melakukan reverse engineering pada aplikasi</li>
            <li>Menggunakan aplikasi untuk merugikan pihak lain</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">4. Privasi dan Data</h2>
          <p>Penggunaan data pribadi Anda diatur dalam Kebijakan Privasi kami yang terpisah.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">5. Penafian Jaminan</h2>
          <p>DiaPredict disediakan "sebagaimana adanya" tanpa jaminan apapun. Hasil prediksi bukan merupakan diagnosis medis profesional.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">6. Pembatasan Tanggung Jawab</h2>
          <p>Kami tidak bertanggung jawab atas kerugian yang timbul dari penggunaan aplikasi ini.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">7. Perubahan Ketentuan</h2>
          <p>Kami berhak mengubah EULA ini sewaktu-waktu dengan pemberitahuan yang wajar.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#00B7E0] mb-3">8. Kontak</h2>
          <p>Untuk pertanyaan mengenai EULA ini, hubungi kami di DiaPredict@gmail.com</p>
        </section>
      </div>
    </LegalLayout>
  );
}