import React from "react";
import Hero from "../assets/img/Hero.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-3 flex flex-col intersect:motion-preset-slide-up motion-delay-0 md:flex-row items-center justify-between border-b border-gray-300">
      <div className="w-full md:w-[600px] mb-8 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Kenali Risiko Diabetes Anda Lebih Dini Bersama Dia
          <span className="text-[#00B7E0]">Predict</span>
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Kami menyediakan layanan prediksi risiko diabetes berbasis data dan AI
          untuk membantu Anda menjaga kesehatan lebih baik.
        </p>
        <Link
          to="/login"
          className="text-lg font-medium text-white bg-[#00B7E0] px-5 py-2 rounded-4xl hover:bg-[#0092b3] transition-colors delay-200 ease-in-out shadow-md"
        >
          Mulai Cek Risiko
        </Link>
      </div>

      <img
        src={Hero}
        alt="Hero"
        className="w-full md:w-auto max-w-[600px] object-contain"
      />
    </section>
  );
};

export default HeroSection;
