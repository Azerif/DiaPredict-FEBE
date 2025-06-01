import FaskesTerdekat from "./FaskesMap";
import FormTestimoni from "./FormTestimoni";

export default function PredictResult({ RiskValue, onReset }) {
  let status = "Rendah";
  if (RiskValue >= 70) status = "Tinggi";
  else if (RiskValue >= 40) status = "Sedang";

  return (
    <>
      <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">
        Hasil Pemeriksaan
      </h1>

      <div
        className="radial-progress text-blueFigma text-3xl font-bold"
        style={{
          "--value": RiskValue,
          "--size": "10rem",
        }}
        aria-valuenow={RiskValue}
        role="progressbar"
      >
        {RiskValue}%
      </div>

      <h2 className="mt-4 font-bold text-2xl md:text-3xl lg:text-4xl">
        Status Risiko:{" "}
        <span
          className={
            status === "Tinggi"
              ? "text-red-600 font-bold text-2xl  md:text-3xl lg:text-4xl"
              : status === "Sedang"
              ? "text-yellow-500 font-bold text-2xl md:text-3xl lg:text-4xl"
              : "text-green-600 font-bold text-2xl md:text-3xl lg:text-4xl"
          }
        >
          {status}
        </span>
      </h2>
      <div className="flex flex-col gap-2 md:flex-row justify-between items-center  w-9/10">
        <button
          className="p-2 bg-blueFigma rounded text-white"
          onClick={onReset}
        >
          Buat Hasil Prediksi Baru
        </button>

        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button 
          className="p-2 bg-blueFigma rounded text-white" 
          onClick={()=>document.getElementById('my_modal_4').showModal()}
          >
            Beri Ulasan
          </button>
        <FormTestimoni />



        <button
          className="p-2 bg-blueFigma rounded text-white"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          Langkah Selanjutnya
        </button>

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-white">
            <h3 className="font-bold text-lg">
              Rujukan ke fasilitas kesehatan terdekat
            </h3>
            <FaskesTerdekat></FaskesTerdekat>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn bg-blueFigma border-none text-white rounded">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
}
