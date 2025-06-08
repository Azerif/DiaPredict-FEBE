import React from "react";

const AboutSection = ({ id }) => {
  return (
    <section
      id={id}
      className="max-w-[1200px] mx-auto mb-30 pt-10 intersect:motion-preset-slide-down motion-delay-200 scroll-mt-20"
    >
      <h2 className="text-4xl font-bold text-[#00B7E0] text-center mb-10">
        Tentang Kami
      </h2>
      <div className="grid grid-cols-1 px-10 md:grid-cols-2 gap-8 items-start relative">
        {/* Kolom Kiri */}
        <p className="text-xl text-center p-3 intersect:motion-preset-slide-right motion-delay-400">
          DiaPredict adalah platform digital berbasis kecerdasan buatan (AI)
          yang membantu masyarakat Indonesia mengenali risiko diabetes sejak
          dini Dengan memanfaatkan data kesehatan dan algoritma prediktif.
        </p>

        {/* Garis Pembatas */}
        <div className="hidden md:block absolute left-1/2 top-0 h-full border-1 transform -translate-x-1/2"></div>

        {/* kolom kanan */}
        <p className="text-xl text-center p-3 intersect:motion-preset-slide-left motion-delay-600">
          Kami hadir sebagai solusi preventif yang bertujuan untuk meningkatkan
          kesadaran masyarakat terhadap pentingnya deteksi dini diabetes. Dengan
          DiaPredict, pengguna dapat melakukan pemeriksaan risiko secara
          mandiri, menjaga privasi data kesehatan.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
