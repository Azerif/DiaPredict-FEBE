import React from "react";

const ServicesSection = ({ id }) => {
  return (
    <section
      id={id}
      className="max-w-[350px] mx-auto sm:max-w-[550px] md:max-w-[1200px] mb-30 bg-[#CCF1F9] py-10 px-10 md:px-8 text-center shadow-xl rounded-xl"
    >
      <h2 className="text-4xl font-bold text-[#00B7E0] text-center mb-20 intersect:motion-preset-slide-down motion-delay-300">
        Layanan Kami
      </h2>
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="intersect:motion-preset-slide-down motion-delay-400">
          <h3 className="text-xl font-bold mb-2">Prediksi Resiko Diabetes</h3>
          <p className="text-lg">
            Masukkan data kesehatan dasar Anda dan dapatkan hasil prediksi yang
            akurat & tepat
          </p>
        </div>

        <div className="intersect:motion-preset-slide-down motion-delay-600">
          <h3 className="text-xl font-bold mb-2">Riwayat Pemeriksaan</h3>
          <p className="text-lg">
            Lihat riwayat hasil prediksi Anda sebelumnya guna memantau kondisi
            dari waktu ke waktu
          </p>
        </div>

        <div className="intersect:motion-preset-slide-down motion-delay-800">
          <h3 className="text-xl font-bold mb-2">Edukasi Diabetes</h3>
          <p className="text-lg">
            Temukan informasi seputar Penyakit Diabetes mulai dari gejala,
            penyebab, hingga tips pencegahan dan gaya hidup sehat
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
