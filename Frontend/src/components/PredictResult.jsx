export default function PredictResult({ RiskValue }) {
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
    </>
  );
}
