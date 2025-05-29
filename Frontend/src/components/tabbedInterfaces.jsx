import { useState } from "react";

export default function TabInterfaces() {
  const [activeContentIndex, setActiveContentIndex] = useState(0);

  return (
    <div className="max-w-xs my-8 overflow-hidden" id="tabs">
      <div>
        <div className="flex gap-1">
          <button
            className={`text-xs px-1 py-1 rounded-t-md transition-all ${
              activeContentIndex === 0
                ? "bg-blueFigma text-white"
                : " text-blueFigma border-t-2 border-l-2 border-r-2 border-blueFigma font-bold"
            }`}
            onClick={() => setActiveContentIndex(0)}
          >
            Apa itu Diabetes?
          </button>
          <button
            className={`text-xs px-1 py-1 rounded-t-md transition-all ${
              activeContentIndex === 1
                ? "bg-blueFigma text-white"
                : " text-blueFigma border-t-2 border-l-2 border-r-2 border-blueFigma font-bold"
            }`}
            onClick={() => setActiveContentIndex(1)}
          >
            Jenis Diabetes
          </button>
          <button
            className={`text-xs px-1 py-1 rounded-t-md transition-all ${
              activeContentIndex === 2
                ? "bg-blueFigma text-white"
                : " text-blueFigma border-t-2 border-l-2 border-r-2 border-blueFigma font-bold"
            }`}
            onClick={() => setActiveContentIndex(2)}
          >
            Gejala dan Penyebabnya
          </button>
          <button
            className={`text-xs px-1 py-1 rounded-t-md transition-all ${
              activeContentIndex === 3
                ? "bg-blueFigma text-white"
                : " text-blueFigma border-t-2 border-l-2 border-r-2 border-blueFigma font-bold"
            }`}
            onClick={() => setActiveContentIndex(3)}
          >
            Pencegahan
          </button>
        </div>

        <div className="border-b-3 border-r-3 border-l-3 border-t-2 border-blueFigma rounded-b-md p-4 ">
          {activeContentIndex === 0 && (
            <>
              <h1 className="text-xl font-bold mb-2">Apa itu Diabetes?</h1>
              <p>
                Diabetes adalah penyakit kronis yang terjadi ketika tubuh tidak
                dapat menghasilkan insulin secara cukup atau tidak mampu
                menggunakan insulin secara efektif. Insulin adalah hormon yang
                mengatur kadar gula dalam darah.
              </p>
            </>
          )}
          {activeContentIndex === 1 && (
            <>
              <h1 className="text-xl font-bold mb-2">Jenis Jenis Diabetes</h1>
              <ol className="list-decimal ml-4 space-y-4 mt-5 marker:text-base marker:font-medium">
                <li>
                  <h3 className="text-base font-medium">Diabetes Tipe 1</h3>
                  <p className="text-base">
                    Ini adalah kondisi autoimun di mana sistem imun tubuh
                    menyerang sel penghasil insulin di pankreas. Biasanya
                    terjadi pada anak-anak dan remaja. Penderita harus
                    menggunakan insulin sepanjang hidup
                  </p>
                </li>
                <li>
                  <h3 className="text-base font-medium ">Diabetes Tipe 2</h3>
                  <p className="text-base">
                    Tipe ini paling umum. Tubuh masih memproduksi insulin, tapi
                    tidak digunakan secara efektif (resistensi insulin). Umumnya
                    dipicu oleh gaya hidup tidak sehat seperti pola makan buruk
                    dan kurang aktivitas fisik.
                  </p>
                </li>
                <li>
                  <h3 className="text-base font-medium">
                    Diabetes Gestasional
                  </h3>
                  <p className="text-base">
                    Terjadi pada wanita selama kehamilan, terutama trimester
                    kedua atau ketiga. Biasanya sembuh setelah melahirkan,
                    tetapi meningkatkan risiko diabetes tipe 2 di kemudian hari.
                  </p>
                </li>
              </ol>
            </>
          )}
          {activeContentIndex === 2 && (
            <>
              <h2 className="text-xl font-bold mb-2  mx-auto">
                Kenali Gejala Diabetes
              </h2>
              <ul className="mx-auto list-disc  space-y-2  marker:text-xl marker:font-medium">
                <li className="ml-6">Sering buang air kecil</li>
                <li className="ml-6">Cepat haus</li>
                <li className="ml-6">Berat badan menurun drastis</li>
                <li className="ml-6">Luka sulit sembuh</li>
                <li className="ml-6 mb-6">Pandangan kabur</li>
              </ul>
              <h2 className="text-xl font-bold  mb-2  mx-auto">
                Penyebab & Faktor Risiko
              </h2>
              <ul className="mx-auto  list-disc  space-y-2  marker:text-xl marker:font-medium">
                <li className="ml-6">Keturunan/genetik</li>
                <li className="ml-6">Pola makan tidak sehat</li>
                <li className="ml-6">Kurang aktivitas fisik</li>
                <li className="ml-6">Kegemukan atau obesitas</li>
                <li className="ml-6 pb-2">Usia di atas 40 tahun</li>
              </ul>
            </>
          )}
          {activeContentIndex === 3 && (
            <>
              <h2 className="text-xl font-bold ">
                Pencegahan & Gaya Hidup Sehat
              </h2>
              <ul className="list-disc ml-5 mt-2 space-y-2  marker:text-xl marker:font-medium">
                <li>Makan makanan bergizi dan rendah gula</li>
                <li>Berolah raga secara rutin</li>
                <li>Menjaga berat badan ideal</li>
                <li>Rutin memeriksa kadar gula darah</li>
                <li>Menghindari stres berlebihan</li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
