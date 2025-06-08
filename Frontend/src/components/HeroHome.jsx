import pict from "../assets/img/home.png";
import ObserverProvider from "../lib/ObserverProvider";
import { motion } from "framer-motion";

export default function HeroHome({ swiper }) {
  const handleNext = () => {
    swiper.current?.slideNext();
  };

  return (
    <ObserverProvider>
      <section className="min-h-screen bg-lightBlueFigma border-b border-gray-300">
        <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
          {/* Text Content /} */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 10 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full md:w-[600px] text-center md:text-left mb-8 md:mb-0"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Prediksi Dini, Hidup lebih Sehat Bersama Dia
              <span className="text-blueFigma">Predict</span>
            </h1>
            <p className="text-base md:text-xl mb-6">
              DiaPredict membantu Anda memahami risiko diabetes lebih awal agar
              Anda bisa hidup lebih tenang dan terarah.
            </p>
            <a
              onClick={handleNext}
              className="cursor-pointer text-lg font-medium text-white bg-[#00B7E0] px-5 py-2 rounded-4xl hover:bg-[#0092b3] transition-colors delay-200 ease-in-out shadow-md inline-block"
            >
              Mulai Cek Risiko
            </a>
          </motion.div>

          {/* {/ Image */}
          <motion.img
            src={pict}
            alt="Hero"
            className="w-full md:w-auto max-w-[600px] object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.83 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </section>
    </ObserverProvider>
  );
}
