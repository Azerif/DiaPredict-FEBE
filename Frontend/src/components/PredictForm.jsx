import { useEffect, useState } from "react";
import Stepper from "../components/stepper";
import PredictResult from "./PredictResult";
import { confirmForm } from "../lib/alerts";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(1);
  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    console.log({
      jekel,
      tinggi,
      berat,
      date,
      selectedHipertensi,
      selectedJantung,
      merokok,
      hemoglobin,
      gulaDarah,
      bmi,
      umur,
    });
    await confirmForm().then((result) => {
      if (result.isConfirmed) {
        setIsSubmitted(true);
      }
    });
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
  };

  return (
    <main id="formArea" className="w-4/5 md:w-1/2 mx-auto p-5 mt-5 border-4 border-blueFigma mb-20 shadow-lg rounded">
      {!isSubmitted && (
        <>
          <h1 className="text-center text-4xl text-blueFigma font-bold">
            Form Kesehatan
          </h1>
          <Stepper currentStep={currentStep} />
          {currentStep === 0 && (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block font-semibold mb-1">
                  Jenis kelamin:
                </label>
                <div className="flex gap-4">
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
                        className={`cursor-pointer border-2 rounded p-4 flex flex-col justify-center items-center gap-3
                          ${
                            jekel === gender
                              ? "border-blue-500 bg-blue-100"
                              : "border-gray-300"
                          }`}
                      >
                        <img
                          src={
                            gender === "Laki-Laki"
                              ? "https://cdn-icons-png.flaticon.com/512/3233/3233508.png"
                              : "https://media.lordicon.com/icons/wired/flat/269-avatar-female.svg"
                          }
                          alt={gender}
                          className="max-h-[70px]"
                        />
                        {gender}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  Tinggi dan Berat Badan:
                </label>
                <div className="flex space-x-4">
                  <input
                    type="number"
                    placeholder="170 cm"
                    value={tinggi}
                    onChange={(e) => setTinggi(e.target.value)}
                    className="w-1/2 border border-gray-300 rounded px-3 py-2"
                    required
                  />
                  <input
                    type="number"
                    value={berat}
                    onChange={(e) => setBerat(e.target.value)}
                    placeholder="65 kg"
                    className="w-1/2 border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  Tanggal lahir:
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border px-3 py-2 rounded"
                  required
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-cyan-500 text-white px-6 py-2 rounded hover:bg-cyan-600"
                >
                  Selanjutnya →
                </button>
              </div>
            </form>
          )}

          {currentStep === 1 && (
            <form
              className="grid grid-cols-2 gap-4 items-center"
              onSubmit={handleSubmitStep2}
            >
              <label htmlFor="hipertensi">Hipertensi:</label>
              <div className="flex gap-2">
                {["ya", "tidak"].map((val) => (
                  <div key={val}>
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
                      className={`px-3 py-1 rounded border cursor-pointer ${
                        selectedHipertensi === val
                          ? "bg-blueFigma text-white"
                          : "border-blueFigma"
                      }`}
                    >
                      {val.charAt(0).toUpperCase() + val.slice(1)}
                    </label>
                  </div>
                ))}
              </div>

              <label htmlFor="jantung">Penyakit Jantung:</label>
              <div className="flex gap-2">
                {["ya", "tidak"].map((val) => (
                  <div key={val}>
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
                      className={`px-3 py-1 rounded border cursor-pointer ${
                        selectedJantung === val
                          ? "bg-blueFigma text-white"
                          : "border-blueFigma"
                      }`}
                    >
                      {val.charAt(0).toUpperCase() + val.slice(1)}
                    </label>
                  </div>
                ))}
              </div>

              <label htmlFor="merokok">Riwayat Merokok:</label>
              <select
                id="merokok"
                value={merokok}
                onChange={(e) => setMerokok(e.target.value)}
                className="border px-2 py-1 rounded"
                required
              >
                <option value="tidak">Tidak</option>
                <option value="mantan">Mantan perokok</option>
                <option value="aktif">Perokok aktif</option>
              </select>

              <label>BMI:</label>
              <div>{bmi}</div>

              <label htmlFor="hemoglobin">Hemoglobin:</label>
              <input
                type="number"
                step="0.1"
                value={hemoglobin}
                onChange={(e) => setHemoglobin(e.target.value)}
                className="border px-2 py-1 rounded"
              />

              <label htmlFor="gula_darah">Kadar gula darah:</label>
              <input
                type="number"
                step="0.1"
                value={gulaDarah}
                onChange={(e) => setGulaDarah(e.target.value)}
                className="border px-2 py-1 rounded"
              />

              <div className="flex col-span-2 mt-4 gap-2 justify-between">
                <button
                  type="button"
                  className="bg-blueFigma text-white px-2 py-1 rounded"
                  onClick={() => setCurrentStep(0)}
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  className="bg-blueFigma text-white px-2 py-1 rounded"
                >
                  Prediksi Risiko Diabetes
                </button>
              </div>
            </form>
          )}
        </>
      )}

      {isSubmitted && (
        <div className="flex items-center gap-10 mjustify-center flex-col">
          <PredictResult RiskValue={58} onReset={handleReset}></PredictResult>
        </div>
      )}
    </main>
  );
}
