import TabInterfaces from "../components/tabbedInterfaces";
import Footer from "../components/Footer";
import NavbarAfter from "../components/NavbarAfter";
import ObserverProvider from "../lib/ObserverProvider";

export default function Education() {
  return (
    <ObserverProvider>
      <div className="min-h-screen bg-gray-50">
        <NavbarAfter />
        <main>
          {" "}
          {/* Hero Section */}
          <section className="hidden sm:block bg-gradient-to-b from-[#CCF1F9] to-white py-8">
            <div className="max-w-4xl mx-auto px-4">
              <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Mengenal Diabetes: Penyebab, Gejala, dan Cara Pencegahannya
              </h1>
              <div className="bg-white rounded-lg shadow-lg p-6 mx-auto max-w-3xl intersect:motion-preset-slide-up motion-delay-100">
                <h2 className="text-xl text-center font-bold text-[#00B7E0] mb-4">
                  Apa itu Diabetes?
                </h2>
                <p className="text-center text-base text-gray-700 leading-relaxed intersect:motion-preset-slide-up motion-delay-200">
                  Diabetes adalah penyakit kronis yang terjadi ketika tubuh
                  tidak dapat menghasilkan insulin secara cukup atau tidak mampu
                  menggunakan insulin secara efektif. Insulin adalah hormon yang
                  mengatur kadar gula (glukosa) dalam darah. Tanpa insulin yang
                  cukup, glukosa menumpuk dalam darah dan menyebabkan berbagai
                  komplikasi kesehatan.
                </p>
              </div>
            </div>
          </section>{" "}
          {/* Jenis Diabetes Section */}
          <section className="hidden sm:block py-8 intersect:motion-preset-slide-up motion-delay-300">
            <div className="max-w-4xl mx-auto px-4">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-[#00B7E0] mb-6 text-center">
                  Jenis - Jenis Diabetes
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-[#00B7E0] intersect:motion-preset-slide-up motion-delay-400">
                    <div className="flex items-center mb-3">
                      <div className="bg-[#00B7E0] text-white rounded-full w-6 h-6 flex items-center justify-center font-bold mr-2 text-sm">
                        1
                      </div>
                      <h3 className="text-base font-semibold text-gray-800">
                        Diabetes Tipe 1
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Kondisi autoimun di mana sistem imun tubuh menyerang sel
                      penghasil insulin di pankreas. Biasanya terjadi pada
                      anak-anak dan remaja. Penderita harus menggunakan insulin
                      sepanjang hidup.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-l-4 border-green-500 intersect:motion-preset-slide-up motion-delay-600">
                    <div className="flex items-center mb-3">
                      <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold mr-2 text-sm">
                        2
                      </div>
                      <h3 className="text-base font-semibold text-gray-800">
                        Diabetes Tipe 2
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Tipe paling umum. Tubuh masih memproduksi insulin, tapi
                      tidak digunakan secara efektif (resistensi insulin).
                      Umumnya dipicu oleh gaya hidup tidak sehat seperti pola
                      makan buruk dan kurang aktivitas fisik.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg border-l-4 border-pink-500 intersect:motion-preset-slide-up motion-delay-800">
                    <div className="flex items-center mb-3">
                      <div className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold mr-2 text-sm">
                        3
                      </div>
                      <h3 className="text-base font-semibold text-gray-800">
                        Diabetes Gestasional
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Terjadi pada wanita selama kehamilan, terutama trimester
                      kedua atau ketiga. Biasanya sembuh setelah melahirkan,
                      tetapi meningkatkan risiko diabetes tipe 2 di kemudian
                      hari.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>{" "}
          {/* Gejala & Penyebab Section */}
          <section className="hidden sm:block py-8 bg-gradient-to-r from-[#CCF1F9] to-blue-50 ">
            <div className="max-w-4xl mx-auto px-4 ">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Gejala Diabetes */}
                <div className="bg-white rounded-lg shadow-lg p-6 intersect:motion-preset-slide-right motion-delay-200">
                  <div className="flex items-center mb-4">
                    <div className="bg-red-500 p-2 rounded-full mr-3">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-[#00B7E0]">
                      Kenali Gejala Diabetes
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Sering buang air kecil",
                      "Cepat haus",
                      "Berat badan menurun drastis",
                      "Luka sulit sembuh",
                      "Pandangan kabur",
                    ].map((gejala, index) => (
                      <li
                        key={index}
                        className="flex items-center p-2 bg-red-50 rounded-lg"
                      >
                        <div className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                          !
                        </div>
                        <span className="text-gray-800 font-medium text-sm">
                          {gejala}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Penyebab & Faktor Risiko */}
                <div className="bg-white rounded-lg shadow-lg p-6 intersect:motion-preset-slide-left motion-delay-200">
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-500 p-2 rounded-full mr-3">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-[#00B7E0]">
                      Penyebab & Faktor Risiko
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Keturunan/genetik",
                      "Pola makan tidak sehat",
                      "Kurang aktivitas fisik",
                      "Kegemukan atau obesitas",
                      "Usia di atas 40 tahun",
                    ].map((penyebab, index) => (
                      <li
                        key={index}
                        className="flex items-center p-2 bg-orange-50 rounded-lg"
                      >
                        <div className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 ">
                          {index + 1}
                        </div>
                        <span className="text-gray-800 font-medium text-sm">
                          {penyebab}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
          {/* Pencegahan Section */}
          <section className="hidden sm:block py-8 ">
            <div className="max-w-4xl mx-auto px-4">
              <div className="bg-white rounded-lg shadow-lg p-6 intersect:motion-preset-slide-down motion-delay-300">
                <div className="text-center mb-6">
                  <div className="bg-green-500 p-2 rounded-full w-10 h-10 mx-auto mb-3 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-[#00B7E0] mb-3">
                    Pencegahan & Gaya Hidup Sehat
                  </h2>
                  <p className="text-gray-600 text-sm max-w-xl mx-auto">
                    Diabetes dapat dicegah dengan menerapkan gaya hidup sehat.
                    Berikut adalah langkah-langkah yang dapat Anda lakukan:
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      icon: "🥗",
                      title: "Makan Bergizi",
                      description:
                        "Konsumsi makanan bergizi dan rendah gula secara teratur",
                    },
                    {
                      icon: "🏃‍♂️",
                      title: "Olahraga Rutin",
                      description:
                        "Lakukan aktivitas fisik minimal 30 menit setiap hari",
                    },
                    {
                      icon: "⚖️",
                      title: "Jaga Berat Badan",
                      description: "Pertahankan berat badan ideal sesuai BMI",
                    },
                    {
                      icon: "🩺",
                      title: "Cek Gula Darah",
                      description:
                        "Rutin memeriksa kadar gula darah secara berkala",
                    },
                    {
                      icon: "😌",
                      title: "Kelola Stres",
                      description:
                        "Hindari stres berlebihan dengan relaksasi dan meditasi",
                    },
                    {
                      icon: "💤",
                      title: "Tidur Cukup",
                      description:
                        "Pastikan tidur berkualitas 7-8 jam setiap malam",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200 hover:shadow-md transition-shadow intersect:motion-preset-slide-down motion-delay-400"
                    >
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <h3 className="text-base font-semibold text-gray-800 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>{" "}
          {/* Mobile Section */}
          <section className="flex flex-col items-center justify-center sm:hidden px-4 py-6">
            <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm">
              <h1 className="text-center text-lg font-bold mb-4 text-gray-800">
                Mengenal Diabetes: Penyebab, Gejala, dan Cara Pencegahannya
              </h1>
              <TabInterfaces />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ObserverProvider>
  );
}
