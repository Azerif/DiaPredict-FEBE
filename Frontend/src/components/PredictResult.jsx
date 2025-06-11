import FaskesTerdekat from "./FaskesMap";

export default function PredictResult({ RiskValue, predictionData, onReset }) {
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

  // Function untuk menjelaskan cluster berdasarkan nama dan model
  const getClusterExplanation = (clusterName, modelUsed) => {
    // Cluster untuk model DENGAN data medis (full model)
    const fullModelExplanations = {
      'Dewasa/Lansia dengan Potensi Risiko Kesehatan': "Mayoritas anggota berusia di atas 60 tahun dengan rata-rata BMI mendekati 30, HbA1c tinggi (6.02), dan kadar glukosa darah yang cukup tinggi (154 mg/dL). Proporsi hipertensi dan penyakit jantung juga relatif tinggi. Catatan: Terdapat sejumlah kecil individu berusia lebih muda namun memiliki profil kesehatan serupa.",
      
      'Dewasa Muda/Paruh Baya dengan Kesehatan Relatif Baik': "Didominasi individu usia sekitar 48 tahun, dengan BMI normal hingga sedikit berlebih. Rata-rata HbA1c dan glukosa darah tergolong normal. Kasus hipertensi dan penyakit jantung sangat rendah.",
      
      'Anak-anak/Remaja Sehat': "Kelompok usia termuda (rata-rata 11 tahun), dengan profil kesehatan sangat baik. Hampir seluruh anggota tidak memiliki riwayat penyakit kronis. BMI dan HbA1c tergolong normal.",
      
      'Dewasa Muda dengan Perhatian pada Gula Darah': "Kelompok usia 30-an tahun dengan kadar glukosa darah relatif tinggi (150 mg/dL) dan HbA1c mendekati batas prediabetes (5.89). Meski secara umum masih muda dan jarang memiliki penyakit kronis, kelompok ini menunjukkan potensi awal masalah metabolik. Catatan: Beberapa individu lebih muda atau tua juga masuk dalam cluster ini karena kesamaan profil metabolik."
    };

    // Cluster untuk model TANPA data medis (simple model)
    const simpleModelExplanations = {
      'Populasi Lansia dengan Riwayat Kesehatan Kompleks': "Kelompok ini didominasi oleh individu usia lanjut (rata-rata ~64 tahun). Meski BMI rata-rata masih normal, prevalensi hipertensi (12.63%) dan penyakit jantung (8.36%) cukup mencolok. Riwayat merokok beragam, terutama pada kategori never_smoke dan no_info_smoke. Kelompok ini merepresentasikan lansia dengan catatan kesehatan yang perlu perhatian khusus.",
      
      'Anak dan Remaja dalam Kondisi Fisik Optimal': "Kelompok dengan rata-rata usia sangat muda (~14 tahun) dan BMI rendah (18.91). Hampir seluruhnya tidak memiliki riwayat hipertensi, penyakit jantung, maupun kebiasaan merokok. Cluster ini menggambarkan populasi anak dan remaja dengan profil kesehatan yang ideal.",
      
      'Dewasa dengan Pola Hidup Kurang Sehat': "Berisi individu dewasa (rata-rata usia ~51 tahun) dengan BMI sangat tinggi (~33.73). Banyak anggota kelompok ini memiliki riwayat hipertensi (13.67%) dan penyakit jantung (5.62%), serta riwayat merokok yang cukup tersebar. Kelompok ini mencerminkan gaya hidup yang kurang sehat dan rentan terhadap penyakit metabolik.",
      
      'Dewasa Muda Aktif dan Relatif Sehat': "Kelompok ini terdiri dari individu dewasa muda (usia ~28 tahun) dengan BMI normal, serta prevalensi hipertensi dan penyakit jantung yang sangat rendah. Riwayat merokok cukup bervariasi, namun mayoritas tidak merokok. Kelompok ini merepresentasikan usia produktif dengan gaya hidup relatif seimbang dan aktif."
    };

    // Pilih penjelasan berdasarkan model yang digunakan
    if (modelUsed === 'simple') {
      return simpleModelExplanations[clusterName] || "Kategori kesehatan yang memerlukan evaluasi lebih lanjut.";
    } else {
      return fullModelExplanations[clusterName] || "Kategori kesehatan yang memerlukan evaluasi lebih lanjut.";
    }
  };

  // Function untuk mendapatkan warna berdasarkan cluster
  const getClusterColor = (clusterName) => {
    const clusterColors = {
      // Model dengan data medis
      'Dewasa/Lansia dengan Potensi Risiko Kesehatan': { 
        bg: 'bg-red-50', 
        border: 'border-red-200', 
        text: 'text-red-700', 
        circle: 'bg-red-500' 
      },
      'Dewasa Muda/Paruh Baya dengan Kesehatan Relatif Baik': { 
        bg: 'bg-green-50', 
        border: 'border-green-200', 
        text: 'text-green-700', 
        circle: 'bg-green-500' 
      },
      'Anak-anak/Remaja Sehat': { 
        bg: 'bg-blue-50', 
        border: 'border-blue-200', 
        text: 'text-blue-700', 
        circle: 'bg-blue-500' 
      },
      'Dewasa Muda dengan Perhatian pada Gula Darah': { 
        bg: 'bg-orange-50', 
        border: 'border-orange-200', 
        text: 'text-orange-700', 
        circle: 'bg-orange-500' 
      },
      
      // Model tanpa data medis
      'Populasi Lansia dengan Riwayat Kesehatan Kompleks': { 
        bg: 'bg-red-50', 
        border: 'border-red-200', 
        text: 'text-red-700', 
        circle: 'bg-red-500' 
      },
      'Anak dan Remaja dalam Kondisi Fisik Optimal': { 
        bg: 'bg-blue-50', 
        border: 'border-blue-200', 
        text: 'text-blue-700', 
        circle: 'bg-blue-500' 
      },
      'Dewasa dengan Pola Hidup Kurang Sehat': { 
        bg: 'bg-red-50', 
        border: 'border-red-200', 
        text: 'text-red-700', 
        circle: 'bg-red-500' 
      },
      'Dewasa Muda Aktif dan Relatif Sehat': { 
        bg: 'bg-green-50', 
        border: 'border-green-200', 
        text: 'text-green-700', 
        circle: 'bg-green-500' 
      }
    };
    return clusterColors[clusterName] || { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', circle: 'bg-gray-500' };
  };

  // Get cluster data
  const clusterColors = getClusterColor(predictionData?.cluster);
  const clusterExplanation = getClusterExplanation(predictionData?.cluster, predictionData?.model_used);

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
        <p className="text-sm text-gray-600">Berikut adalah hasil analisis risiko diabetes dan cluster kesehatan Anda</p>
      </div>

      {/* Diabetes Result Section */}
      <div className={`${bgColor} ${borderColor} border-2 rounded-lg p-5`}>
        <div className="text-center">
          {/* Progress Circle */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 180 180">
                <circle
                  cx="90"
                  cy="90"
                  r="75"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="90"
                  cy="90"
                  r="75"
                  stroke={progressColor}
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${(RiskValue / 100) * 471} 471`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-800">{RiskValue.toFixed(2)}%</span>
                  <p className="text-xs text-gray-600">Risiko Diabetes</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border border-gray-200 mb-4">
            <h2 className="text-base font-semibold text-gray-700 mb-1">
              Status Risiko Diabetes
            </h2>
            <span className={`text-xl font-bold ${statusColor}`}>
              {status}
            </span>
          </div>

          {/* Cluster Section */}
          {predictionData?.cluster && (
            <div className={`${clusterColors.bg} rounded-lg p-3 border ${clusterColors.border} text-left mb-4`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${clusterColors.circle}`}></div>
                <h3 className={`font-semibold ${clusterColors.text} text-sm`}>
                  Kategori Kesehatan:
                </h3>
              </div>
              <p className={`font-medium ${clusterColors.text} text-sm mb-2`}>
                {predictionData?.cluster}
              </p>
              <p className="text-gray-600 text-xs leading-relaxed">
                {clusterExplanation}
              </p>
              {predictionData?.cluster_confidence && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Confidence: {(predictionData.cluster_confidence * 100).toFixed(2)}%
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Model Information */}
          <div className="bg-white rounded-lg p-3 border border-gray-200 text-left">
            <h3 className="font-semibold text-gray-700 mb-2 text-sm">Penjelasan Diabetes:</h3>
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
            {predictionData?.model_used && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  <span className="font-medium">Model:</span> {predictionData.model_used === 'simple' ? 'Prediksi Sederhana' : 'Prediksi Lengkap'}
                </p>
                <div className="text-xs text-gray-400 mt-1 whitespace-pre-line">
                  {predictionData.model_used === 'simple' 
                    ? '• Tanpa data medis (HbA1c & Gula Darah)\n• Menggunakan: Usia, BMI, Jenis Kelamin, Hipertensi, Penyakit Jantung, Riwayat Merokok'
                    : '• Dengan data medis lengkap\n• Menggunakan: Semua data termasuk HbA1c dan Gula Darah'
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-base font-semibold text-gray-800 mb-3">Langkah Selanjutnya</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

      {/* Existing modals and components */}
      
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