import FaskesTerdekat from "./FaskesMap";
import FormTestimoni from "./FormTestimoni";

export default function PredictResult({ RiskValue, onReset }) {
  let status = "Rendah";
  let statusColor = "text-green-600";
  let bgColor = "bg-green-50";
  let borderColor = "border-green-200";
  let progressColor = "#22c55e";

  if (RiskValue >= 70) {
    status = "Tinggi";
    statusColor = "text-red-600";
    bgColor = "bg-red-50";
    borderColor = "border-red-200";
    progressColor = "#dc2626";
  } else if (RiskValue >= 40) {
    status = "Sedang";
    statusColor = "text-yellow-600";
    bgColor = "bg-yellow-50";
    borderColor = "border-yellow-200";
    progressColor = "#d97706";
  }
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      {/* Header Section */}
      <div className="text-center bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="inline-flex items-center justify-center w-10 h-10 bg-[#00B7E0] rounded-full mb-3">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-1">
          Hasil Pemeriksaan Selesai
        </h1>
        <p className="text-sm text-gray-600">Berikut adalah hasil analisis risiko diabetes Anda</p>
      </div>      {/* Result Section */}
      <div className={`${bgColor} ${borderColor} border-2 rounded-lg p-5`}>
        <div className="text-center">
          {/* Progress Circle */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 144 144">
                {/* Background circle */}
                <circle
                  cx="72"
                  cy="72"
                  r="60"
                  stroke="#e5e7eb"
                  strokeWidth="6"
                  fill="none"
                />
                {/* Progress circle */}
                <circle
                  cx="72"
                  cy="72"
                  r="60"
                  stroke={progressColor}
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${(RiskValue / 100) * 377} 377`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-800">{RiskValue}%</span>
                  <p className="text-xs text-gray-600">Risiko</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Display */}
          <div className="bg-white rounded-lg p-3 border border-gray-200 mb-4">
            <h2 className="text-base font-semibold text-gray-700 mb-1">
              Status Risiko Diabetes
            </h2>
            <span className={`text-xl font-bold ${statusColor}`}>
              {status}
            </span>
          </div>

          {/* Risk Level Description */}
          <div className="bg-white rounded-lg p-3 border border-gray-200 text-left">
            <h3 className="font-semibold text-gray-700 mb-2 text-sm">Penjelasan:</h3>
            <p className="text-gray-600 text-xs leading-relaxed">
              {status === "Tinggi" && 
                "Risiko tinggi mengindikasikan kemungkinan besar mengembangkan diabetes. Segera konsultasi dengan dokter untuk pemeriksaan lebih lanjut."
              }
              {status === "Sedang" && 
                "Risiko sedang menunjukkan adanya faktor risiko yang perlu diperhatikan. Disarankan untuk melakukan perubahan gaya hidup yang lebih sehat."
              }
              {status === "Rendah" && 
                "Risiko rendah menunjukkan kondisi yang baik. Tetap jaga pola hidup sehat untuk mempertahankan kondisi ini."
              }
            </p>
          </div>
        </div>
      </div>      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-base font-semibold text-gray-800 mb-3">Langkah Selanjutnya</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            className="flex items-center justify-center gap-2 bg-[#00B7E0] hover:bg-[#0099CC] text-white px-3 py-2 rounded-lg font-medium text-sm"
            onClick={onReset}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Prediksi Baru
          </button>

          <button 
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg font-medium text-sm" 
            onClick={() => document.getElementById('my_modal_4').showModal()}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Beri Ulasan
          </button>

          <button
            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg font-medium text-sm"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Faskes Terdekat
          </button>
        </div>
      </div>

      {/* Testimonial Component */}
      <FormTestimoni />      {/* Modal for Faskes */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-gray-800">
              Fasilitas Kesehatan Terdekat
            </h3>
          </div>
          <p className="text-gray-600 mb-3 text-sm">Temukan fasilitas kesehatan terdekat untuk konsultasi lebih lanjut</p>
          <FaskesTerdekat />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-purple-600 hover:bg-purple-700 border-none text-white rounded-lg px-4 py-2 text-sm">
                Tutup
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
