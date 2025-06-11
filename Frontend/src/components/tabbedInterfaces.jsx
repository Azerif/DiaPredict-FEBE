import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TabInterfaces() {
  const [activeContentIndex, setActiveContentIndex] = useState(0);

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="max-w-xs my-8 overflow-hidden" id="tabs">
      <div>
        <div className="flex gap-1">
          {[
            "Apa itu Diabetes?",
            "Jenis Diabetes",
            "Gejala dan Penyebabnya",
            "Pencegahan",
          ].map((label, index) => (
            <button
              key={index}
              className={`text-xs px-1 py-1 rounded-t-md transition-all ${
                activeContentIndex === index
                  ? "bg-blueFigma text-white"
                  : " text-blueFigma border-t-2 border-l-2 border-r-2 border-blueFigma font-bold"
              }`}
              onClick={() => setActiveContentIndex(index)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="border-b-3 border-r-3 border-l-3 border-t-2 border-blueFigma rounded-b-md p-4 relative min-h-[200px]">
          <AnimatePresence mode="wait">
            {activeContentIndex === 0 && (
              <motion.div
                key="tab0"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-xl font-bold mb-2">Apa itu Diabetes?</h1>
                <p>
                  Diabetes adalah penyakit kronis yang terjadi ketika tubuh
                  tidak dapat menghasilkan insulin secara cukup atau tidak mampu
                  menggunakan insulin secara efektif. Insulin adalah hormon yang
                  mengatur kadar gula dalam darah.
                </p>
              </motion.div>
            )}
            {activeContentIndex === 1 && (
              <motion.div
                key="tab1"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-xl font-bold mb-2">Jenis Jenis Diabetes</h1>
                <ol className="list-decimal ml-4 space-y-4 mt-5 marker:text-base marker:font-medium">
                  <li>
                    <h3 className="text-base font-medium">Diabetes Tipe 1</h3>
                    <p>
                      Ini adalah kondisi autoimun di mana sistem imun tubuh
                      menyerang sel penghasil insulin di pankreas. Biasanya
                      terjadi pada anak-anak dan remaja. Penderita harus
                      menggunakan insulin sepanjang hidup
                    </p>
                  </li>
                  <li>
                    <h3 className="text-base font-medium">Diabetes Tipe 2</h3>
                    <p>
                      Tipe ini paling umum. Tubuh masih memproduksi insulin,
                      tapi tidak digunakan secara efektif (resistensi insulin).
                      Umumnya dipicu oleh gaya hidup tidak sehat seperti pola
                      makan buruk dan kurang aktivitas fisik.
                    </p>
                  </li>
                  <li>
                    <h3 className="text-base font-medium">
                      Diabetes Gestasional
                    </h3>
                    <p>
                      Terjadi pada wanita selama kehamilan, terutama trimester
                      kedua atau ketiga. Biasanya sembuh setelah melahirkan,
                      tetapi meningkatkan risiko diabetes tipe 2 di kemudian
                      hari.
                    </p>
                  </li>
                </ol>
              </motion.div>
            )}
            {activeContentIndex === 2 && (
              <motion.div
                key="tab2"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold mb-2">
                  Kenali Gejala Diabetes
                </h2>
                <ul className="list-disc space-y-2 ml-6 marker:text-xl marker:font-medium">
                  <li>Sering buang air kecil</li>
                  <li>Cepat haus</li>
                  <li>Berat badan menurun drastis</li>
                  <li>Luka sulit sembuh</li>
                  <li className="mb-6">Pandangan kabur</li>
                </ul>
                <h2 className="text-xl font-bold mb-2">
                  Penyebab & Faktor Risiko
                </h2>
                <ul className="list-disc space-y-2 ml-6 marker:text-xl marker:font-medium">
                  <li>Keturunan/genetik</li>
                  <li>Pola makan tidak sehat</li>
                  <li>Kurang aktivitas fisik</li>
                  <li>Kegemukan atau obesitas</li>
                  <li>Usia di atas 40 tahun</li>
                </ul>
              </motion.div>
            )}
            {activeContentIndex === 3 && (
              <motion.div
                key="tab3"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold">
                  Pencegahan & Gaya Hidup Sehat
                </h2>
                <ul className="list-disc ml-5 mt-2 space-y-2 marker:text-xl marker:font-medium">
                  <li>Makan makanan bergizi dan rendah gula</li>
                  <li>Berolah raga secara rutin</li>
                  <li>Menjaga berat badan ideal</li>
                  <li>Rutin memeriksa kadar gula darah</li>
                  <li>Menghindari stres berlebihan</li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
