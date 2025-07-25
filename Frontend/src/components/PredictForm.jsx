import { useEffect, useState } from "react";
import Stepper from "../components/stepper";
import PredictResult from "./PredictResult";
import { confirmAlert } from "../lib/alerts";
import { createHealthRecord } from "../api/healthRecord";
import { createPrediction } from "../api/prediction";

export default function PredictForm() {
  const [jekel, setJekel] = useState("Male");
  const [tinggi, setTinggi] = useState("");
  const [berat, setBerat] = useState("");
  const [date, setDate] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedHipertensi, setSelectedHipertensi] = useState("tidak");
  const [selectedJantung, setSelectedJantung] = useState("tidak");
  const [merokok, setMerokok] = useState("tidak");
  const [hemoglobin, setHemoglobin] = useState("");
  const [gulaDarah, setGulaDarah] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bmi, setBmi] = useState(0);
  const [umur, setUmur] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (tinggi && berat) {
      const tinggiMeter = parseFloat(tinggi) / 100;
      const beratFloat = parseFloat(berat);
      if (tinggiMeter > 0 && beratFloat > 0) {
        const calculatedBmi = beratFloat / (tinggiMeter * tinggiMeter);
        setBmi(calculatedBmi.toFixed(1));
      }
    }
  }, [tinggi, berat]);

  useEffect(() => {
    if (date) {
      const today = new Date();
      const birthDate = new Date(date);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      setUmur(age);
    }
  }, [date]);

  // Fungsi untuk mengonversi data form ke format health record
  const convertToHealthRecordFormat = () => {
    return {
      name: "User Health Record",
      age: parseInt(umur),
      height: parseFloat(tinggi),
      weight: parseFloat(berat),
      bmi: parseFloat(bmi),
      gender: jekel,
      birth_date: date,
      hypertension: selectedHipertensi === "ya",
      heart_disease: selectedJantung === "ya",
      smoking_history: merokok,
      // Data medis opsional - jika kosong akan menggunakan model sederhana
      hba1c_level: hemoglobin ? parseFloat(hemoglobin) : null,
      blood_glucose_level: gulaDarah ? parseInt(gulaDarah) : null,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(1);
  };

  // Validasi data medis opsional
  const validateMedicalData = () => {
    const errors = {};
    const hasHbA1c = hemoglobin && hemoglobin.trim() !== '' && parseFloat(hemoglobin) > 0;
    const hasGlucose = gulaDarah && gulaDarah.trim() !== '' && parseInt(gulaDarah) > 0;

    // Jika salah satu terisi, keduanya harus terisi
    if ((hasHbA1c && !hasGlucose) || (!hasHbA1c && hasGlucose)) {
      if (hasHbA1c && !hasGlucose) {
        errors.gulaDarah = "Gula darah harus diisi jika HbA1c diisi";
      }
      if (!hasHbA1c && hasGlucose) {
        errors.hemoglobin = "HbA1c harus diisi jika gula darah diisi";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Reset validation errors ketika input berubah
  const handleHemoglobinChange = (value) => {
    setHemoglobin(value);
    
    // Clear validation errors ketika user mengetik
    if (validationErrors.hemoglobin || validationErrors.gulaDarah) {
      setValidationErrors({});
    }
  };

  const handleGulaDarahChange = (value) => {
    setGulaDarah(value);
    
    // Clear validation errors ketika user mengetik
    if (validationErrors.hemoglobin || validationErrors.gulaDarah) {
      setValidationErrors({});
    }
  };

  // Cek apakah form valid untuk enable/disable tombol
  const isFormValid = () => {
    const hasHbA1c = hemoglobin && hemoglobin.trim() !== '' && parseFloat(hemoglobin) > 0;
    const hasGlucose = gulaDarah && gulaDarah.trim() !== '' && parseInt(gulaDarah) > 0;
    
    // Valid jika:
    // 1. Keduanya kosong (prediksi standar), atau
    // 2. Keduanya terisi (prediksi akurat)
    return (!hasHbA1c && !hasGlucose) || (hasHbA1c && hasGlucose);
  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();

    // Validasi data medis terlebih dahulu
    if (!validateMedicalData()) {
      return;
    }

    // Cek apakah data medis tersedia
    const hasHbA1c = hemoglobin && hemoglobin.trim() !== '' && parseFloat(hemoglobin) > 0;
    const hasGlucose = gulaDarah && gulaDarah.trim() !== '' && parseInt(gulaDarah) > 0;
    const useSimpleModel = !hasHbA1c || !hasGlucose;

    let confirmMessage = "Apakah anda yakin data yang di isi sudah benar?";
    if (useSimpleModel) {
      confirmMessage += "\n\nCatatan: Data medis tidak diisi, sistem akan menggunakan model prediksi sederhana.";
    }

    const result = await confirmAlert(confirmMessage);

    if (result.isConfirmed) {
      setIsLoading(true);

      try {
        // 1. Buat health record baru
        const healthRecordData = convertToHealthRecordFormat();
        const healthRecordResponse = await createHealthRecord(healthRecordData);

        console.log("Health record created:", healthRecordResponse);

        // 2. Backend akan otomatis memilih model yang tepat berdasarkan ketersediaan data
        const predictionData = {
          health_record_id: healthRecordResponse.data.id,
          use_simple_model: useSimpleModel,
        };

        const savedPrediction = await createPrediction(predictionData);
        console.log("Prediction saved to database:", savedPrediction);

        // 3. Tampilkan hasil dari backend
        setPredictionResult({
          diabetes_percentage: savedPrediction.data.diabetes_percentage,
          risk_status: savedPrediction.data.risk_status,
          cluster: savedPrediction.data.cluster,
          diabetes_result: savedPrediction.data.ml_results?.diabetes,
          cluster_result: savedPrediction.data.ml_results?.cluster,
          model_used: savedPrediction.data.model_used,
          database_id: savedPrediction.data.id,
          health_record_id: healthRecordResponse.data.id,
        });
        setIsSubmitted(true);
      } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat memproses data. Silakan coba lagi.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReset = () => {
    setJekel("Male");
    setTinggi("");
    setBerat("");
    setDate("");
    setSelectedHipertensi("tidak");
    setSelectedJantung("tidak");
    setMerokok("tidak");
    setHemoglobin("");
    setGulaDarah("");
    setBmi(0);
    setUmur();
    setCurrentStep(0);
    setIsSubmitted(false);
    setPredictionResult(null);
    setValidationErrors({}); // Reset validation errors
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="container mx-auto px-4">
        <main
          id="formArea"
          className="max-w-2xl mx-auto bg-white p-4 rounded-xl shadow-lg border border-gray-200"
        >
          {!isSubmitted && (
            <>
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#00B7E0] rounded-full mb-3">
                  <svg
                    className="w-6 h-6 text-white"
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
                <h1 className="text-2xl font-bold text-[#00B7E0] mb-1">
                  Form Kesehatan
                </h1>
                <p className="text-sm text-gray-600">
                  Isi data kesehatan Anda untuk prediksi diabetes yang akurat
                </p>
              </div>
              <Stepper currentStep={currentStep} />

              {currentStep === 0 && (
                <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <label className="block text-base font-semibold text-gray-800 mb-3">
                      Jenis Kelamin
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Male", "Female"].map((gender) => (
                        <div key={gender}>
                          <input
                            type="radio"
                            id={gender}
                            name="customRadio"
                            value={gender}
                            checked={jekel === gender}
                            onChange={(e) => setJekel(e.target.value)}
                            className="hidden"
                            required
                          />
                          <label
                            htmlFor={gender}
                            className={`cursor-pointer border-2 rounded-lg p-3 flex flex-col justify-center items-center gap-2 ${
                              jekel === gender
                                ? "border-[#00B7E0] bg-[#00B7E0]/10 text-[#00B7E0]"
                                : "border-gray-200 bg-white hover:border-gray-300"
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                jekel === gender
                                  ? "bg-[#00B7E0]/20"
                                  : "bg-gray-100"
                              }`}
                            >
                              <svg
                                className={`w-4 h-4 ${
                                  jekel === gender
                                    ? "text-[#00B7E0]"
                                    : "text-gray-600"
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                            </div>
                            <span className="font-medium text-sm">
                              {gender}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <label className="block text-base font-semibold text-gray-800 mb-3">
                      Tinggi dan Berat Badan
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="170"
                          value={tinggi}
                          onChange={(e) => setTinggi(e.target.value)}
                          className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 pr-10 focus:border-green-500 focus:outline-none text-sm"
                          required
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                          cm
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          value={berat}
                          onChange={(e) => setBerat(e.target.value)}
                          placeholder="65"
                          className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 pr-10 focus:border-green-500 focus:outline-none text-sm"
                          required
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                          kg
                        </span>
                      </div>
                    </div>
                    {bmi > 0 && (
                      <div className="mt-3 p-2 bg-white rounded-lg border border-green-200">
                        <span className="text-xs text-gray-600">
                          BMI Anda:{" "}
                        </span>
                        <span className="text-sm font-semibold text-green-600">
                          {bmi}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <label className="block text-base font-semibold text-gray-800 mb-3">
                      Tanggal Lahir
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-purple-500 focus:outline-none text-sm"
                      required
                    />
                    {umur && (
                      <div className="mt-3 p-2 bg-white rounded-lg border border-purple-200">
                        <span className="text-xs text-gray-600">
                          Umur Anda:{" "}
                        </span>
                        <span className="text-sm font-semibold text-purple-600">
                          {umur} tahun
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="text-center pt-3">
                    <button
                      type="submit"
                      className="bg-[#00B7E0] hover:bg-[#0099CC] text-white px-6 py-2 rounded-lg font-semibold text-sm"
                    >
                      Selanjutnya →
                    </button>
                  </div>
                </form>
              )}

              {currentStep === 1 && (
                <form className="space-y-4 mt-4" onSubmit={handleSubmitStep2}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <label className="block text-base font-semibold text-gray-800 mb-3">
                        Hipertensi
                      </label>
                      <div className="flex gap-2">
                        {["ya", "tidak"].map((val) => (
                          <div key={val} className="flex-1">
                            <input
                              type="radio"
                              id={`hipertensi-${val}`}
                              name="hipertensi"
                              value={val}
                              checked={selectedHipertensi === val}
                              onChange={() => setSelectedHipertensi(val)}
                              className="hidden"
                            />
                            <label
                              htmlFor={`hipertensi-${val}`}
                              className={`block text-center px-3 py-2 rounded-lg font-medium cursor-pointer border-2 text-sm ${
                                selectedHipertensi === val
                                  ? "bg-red-500 text-white border-red-500"
                                  : "border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50"
                              }`}
                            >
                              {val.charAt(0).toUpperCase() + val.slice(1)}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <label className="block text-base font-semibold text-gray-800 mb-3">
                        Penyakit Jantung
                      </label>
                      <div className="flex gap-2">
                        {["ya", "tidak"].map((val) => (
                          <div key={val} className="flex-1">
                            <input
                              type="radio"
                              id={`jantung-${val}`}
                              name="jantung"
                              value={val}
                              checked={selectedJantung === val}
                              onChange={() => setSelectedJantung(val)}
                              className="hidden"
                            />
                            <label
                              htmlFor={`jantung-${val}`}
                              className={`block text-center px-3 py-2 rounded-lg font-medium cursor-pointer border-2 text-sm ${
                                selectedJantung === val
                                  ? "bg-orange-500 text-white border-orange-500"
                                  : "border-orange-200 text-orange-600 hover:border-orange-300 hover:bg-orange-50"
                              }`}
                            >
                              {val.charAt(0).toUpperCase() + val.slice(1)}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <label className="block text-base font-semibold text-gray-800 mb-3">
                        Riwayat Merokok
                      </label>
                      <select
                        id="merokok"
                        value={merokok}
                        onChange={(e) => setMerokok(e.target.value)}
                        className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-gray-500 focus:outline-none bg-white text-sm"
                        required
                      >
                        <option value="tidak">Tidak Pernah Merokok</option>
                        <option value="mantan">Mantan Perokok</option>
                        <option value="aktif">Perokok Aktif</option>
                        <option value="tidak_lagi">Tidak Lagi Merokok</option>
                        <option value="tidak_diketahui">Tidak Diketahui</option>
                      </select>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <label className="block text-base font-semibold text-gray-800 mb-3">
                        BMI (Body Mass Index)
                      </label>
                      <div className="bg-white border-2 border-blue-200 rounded-lg px-3 py-3 text-center">
                        <span className="text-xl font-bold text-blue-600">
                          {bmi || "0.0"}
                        </span>
                        <p className="text-xs text-gray-600 mt-1">
                          {bmi < 18.5
                            ? "Underweight"
                            : bmi < 25
                            ? "Normal"
                            : bmi < 30
                            ? "Overweight"
                            : "Obese"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Medical Data - Optional with Validation */}
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h3 className="text-base font-semibold text-gray-800 mb-3">
                      Data Medis (Opsional)
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Data medis akan meningkatkan akurasi prediksi secara signifikan.{" "}
                      <span className="font-medium text-amber-700"> Jika ingin mengisi, kedua data harus dilengkapi.</span>
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          HbA1c Level (%)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={hemoglobin}
                          onChange={(e) => handleHemoglobinChange(e.target.value)}
                          placeholder="Contoh: 6.5"
                          className={`w-full border-2 rounded-lg px-3 py-2 focus:outline-none text-sm ${
                            validationErrors.hemoglobin 
                              ? 'border-red-500 focus:border-red-500 bg-red-50' 
                              : 'border-gray-200 focus:border-rose-500'
                          }`}
                        />
                        {validationErrors.hemoglobin && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {validationErrors.hemoglobin}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          Kadar gula darah rata-rata 2-3 bulan terakhir
                        </p>
                      </div>

                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          Gula Darah (mg/dL)
                        </label>
                        <input
                          type="number"
                          value={gulaDarah}
                          onChange={(e) => handleGulaDarahChange(e.target.value)}
                          placeholder="Contoh: 120"
                          className={`w-full border-2 rounded-lg px-3 py-2 focus:outline-none text-sm ${
                            validationErrors.gulaDarah 
                              ? 'border-red-500 focus:border-red-500 bg-red-50' 
                              : 'border-gray-200 focus:border-amber-500'
                          }`}
                        />
                        {validationErrors.gulaDarah && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {validationErrors.gulaDarah}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          Kadar glukosa darah saat pemeriksaan
                        </p>
                      </div>
                    </div>

                    {/* Enhanced Information with validation status */}
                    <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                          <svg className="w-full h-full text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Tingkat Prediksi:
                          </p>
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-2 ${
                            (hemoglobin && gulaDarah) 
                              ? 'bg-green-100 text-green-700 border border-green-200' 
                              : !isFormValid()
                              ? 'bg-red-100 text-red-700 border border-red-200'
                              : 'bg-blue-100 text-blue-700 border border-blue-200'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${
                              (hemoglobin && gulaDarah) 
                                ? 'bg-green-500' 
                                : !isFormValid()
                                ? 'bg-red-500'
                                : 'bg-blue-500'
                            }`}></div>
                            {(hemoglobin && gulaDarah) 
                              ? 'Prediksi Akurat (dengan data lab)' 
                              : !isFormValid()
                              ? 'Data medis tidak lengkap'
                              : 'Prediksi Standar (tanpa data lab)'
                            }
                          </div>
                          <div className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                            {(hemoglobin && gulaDarah) 
                              ? '• Menggunakan semua parameter kesehatan\n• Analisis cluster kesehatan lebih detail\n• Rekomendasi yang lebih spesifik'
                              : !isFormValid()
                              ? '• Kedua data medis harus diisi jika ingin menggunakan prediksi akurat\n• Atau kosongkan keduanya untuk prediksi standar'
                              : '• Berdasarkan profil fisik dan riwayat medis\n• Cluster kesehatan umum\n• Rekomendasi pencegahan standar'
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 gap-3">
                    <button
                      type="button"
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
                      onClick={() => setCurrentStep(0)}
                    >
                      ← Kembali
                    </button>
                    <button
                      type="submit"
                      className={`px-6 py-2 rounded-lg font-medium text-sm flex items-center gap-2 ${
                        !isFormValid() || isLoading
                          ? 'bg-gray-400 cursor-not-allowed text-white'
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                      disabled={!isFormValid() || isLoading}
                    >
                      {isLoading && (
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      )}
                      {isLoading
                        ? "Memproses..."
                        : <>Prediksi Risiko <br />Diabetes & Cluster</>}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}

          {isSubmitted && predictionResult && (
            <div className="flex items-center justify-center">
              <div className="w-full">
                <PredictResult
                  RiskValue={predictionResult.diabetes_percentage || 50}
                  predictionData={predictionResult}
                  onReset={handleReset}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}