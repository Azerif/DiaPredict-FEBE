import { useEffect, useState } from "react";
import Stepper from "../components/stepper";
import PredictResult from "./PredictResult";
import { confirmAlert } from "../lib/alerts";
import { createHealthRecord } from "../api/healthRecord";
import { createPrediction } from "../api/prediction";

export default function PredictForm() {
  const [jekel, setJekel] = useState("Laki-Laki");
  const [tinggi, setTinggi] = useState("");
  const [berat, setBerat] = useState("");
  const [date, setDate] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedHipertensi, setSelectedHipertensi] = useState("ya");
  const [selectedJantung, setSelectedJantung] = useState("ya");
  const [merokok, setMerokok] = useState("tidak");
  const [hemoglobin, setHemoglobin] = useState("");
  const [gulaDarah, setGulaDarah] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bmi, setBmi] = useState(0);
  const [umur, setUmur] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

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
      hba1c_level: parseFloat(hemoglobin),
      blood_glucose_level: parseInt(gulaDarah),
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(1);
  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();

    const result = await confirmAlert(
      "Apakah anda yakin data yang di isi sudah benar?"
    );

    if (result.isConfirmed) {
      setIsLoading(true);

      try {
        // 1. Buat health record baru
        const healthRecordData = convertToHealthRecordFormat();
        const healthRecordResponse = await createHealthRecord(healthRecordData);

        console.log("Health record created:", healthRecordResponse);

        // 2. Backend akan otomatis memanggil kedua ML model (diabetes + cluster) dan menyimpan prediksi
        const predictionData = {
          health_record_id: healthRecordResponse.data.id,
        };

        const savedPrediction = await createPrediction(predictionData);
        console.log("Prediction saved to database:", savedPrediction);

        // 3. Tampilkan hasil dari backend (sudah termasuk hasil kedua ML model)
        setPredictionResult({
          diabetes_percentage: savedPrediction.data.diabetes_percentage,
          risk_status: savedPrediction.data.risk_status,
          cluster: savedPrediction.data.cluster,
          diabetes_result: savedPrediction.data.ml_results?.diabetes,
          cluster_result: savedPrediction.data.ml_results?.cluster,
          database_id: savedPrediction.data.id,
          health_record_id: healthRecordResponse.data.id
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
    setJekel("Laki-Laki");
    setTinggi("");
    setBerat("");
    setDate("");
    setSelectedHipertensi("ya");
    setSelectedJantung("ya");
    setMerokok("tidak");
    setHemoglobin("");
    setGulaDarah("");
    setBmi(0);
    setUmur();
    setCurrentStep(0);
    setIsSubmitted(false);
    setPredictionResult(null);
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
              <Stepper currentStep={currentStep} />{" "}
              {currentStep === 0 && (
                <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <label className="block text-base font-semibold text-gray-800 mb-3">
                      Jenis Kelamin
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Laki-Laki", "Perempuan"].map((gender) => (
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
              )}{" "}
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
                            {" "}
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

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
                      <label className="block text-base font-semibold text-gray-800 mb-3">
                        Hemoglobin (g/dL)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={hemoglobin}
                        onChange={(e) => setHemoglobin(e.target.value)}
                        placeholder="12.5"
                        className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-rose-500 focus:outline-none text-sm"
                        required
                      />
                    </div>

                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                      <label className="block text-base font-semibold text-gray-800 mb-3">
                        Kadar Gula Darah (mg/dL)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={gulaDarah}
                        onChange={(e) => setGulaDarah(e.target.value)}
                        placeholder="120"
                        className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-amber-500 focus:outline-none text-sm"
                        required
                      />
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
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      disabled={isLoading}
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
                      {isLoading ? "Memproses..." : "Prediksi Risiko Diabetes & Cluster"}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}{" "}
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
