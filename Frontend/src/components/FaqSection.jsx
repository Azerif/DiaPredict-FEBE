import React, { useState } from "react";

const faqList = [
  {
    question: "Apa itu DiaPredict?",
    answer:
      "DiaPredict adalah layanan digital berbasis AI yang membantu Anda memprediksi risiko diabetes secara cepat dan akurat.",
  },
  {
    question: "Data apa saja yang dibutuhkan untuk melakukan prediksi?",
    answer:
      "Beberapa data yang dibutuhkan antara lain usia, berat badan, tinggi badan, hipertensi, kadar gula darah, bmi dan riwayat kesehatan lainnya.",
  },
  {
    question: "Apakah data saya aman di aplikasi ini?",
    answer:
      "Ya. DiaPredict berkomitmen untuk menjaga privasi dan keamanan data pengguna sesuai standar keamanan data yang berlaku.",
  },
  {
    question: "Apakah DiaPredict bisa digunakan secara gratis?",
    answer:
      "Ya. Saat ini DiaPredict dapat digunakan secara gratis oleh pengguna dengan cukup masuk ke aplikasi DiaPredict.",
  },
  {
    question: "Apakah saya harus mengisi semua data untuk bisa prediksi?",
    answer:
      "Idealnya, ya. Semakin lengkap data yang kamu isi, semakin akurat hasil prediksinya. Namun, kamu tetap bisa mencoba dengan data standar.",
  },
];

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="max-w-[350px] intersect:motion-preset-bounce motion-delay-500 mx-auto sm:max-w-[600px] md:max-w-[1200px] space-y-4 mb-20 py-10">
      <h2 className="text-4xl font-bold text-[#00B7E0] text-center mb-10">
        FAQ
      </h2>
      {faqList.map((faq, index) => (
        <div key={index} className="bg-[#CCF1F9] rounded-md">
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-[#00B7E0] p-4 text-left text-gray-900 "
          >
            <h2 className="text-xl font-medium">{faq.question}</h2>
            <svg
              className={`size-5 shrink-0 transition-transform duration-300 ${
                activeIndex === index ? "-rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              activeIndex === index ? "max-h-40 py-4 px-4" : "max-h-0 py-0 px-4"
            }`}
          >
            <p className="text-gray-800">{faq.answer}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FaqSection;
