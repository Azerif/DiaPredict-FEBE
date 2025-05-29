import React from "react";

const Stepper = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-between max-w-xs mx-auto mt-10 mb-10">
      <div className="flex flex-row justify-center items-center gap-1">
        <div
          className={`w-8 h-8 border-1 rounded-full flex items-center justify-center font-bold
          ${
            currentStep === 0
              ? "bg-cyan-500 text-white"
              : currentStep > 0
              ? "bg-green-500 text-white"
              : "text-blueFigma"
          }`}
        >
          1
        </div>
        <p className="text-sm">Data Diri</p>
      </div>

      <div className="flex-1 h-[2px]  bg-black mx-2" />

      <div className="flex flex-row justify-center items-center gap-1">
        <div
          className={`w-8 h-8 border-1 rounded-full flex items-center justify-center font-bold
          ${
            currentStep === 1
              ? "bg-cyan-500 text-white"
              : currentStep > 1
              ? "bg-green-500 text-white"
              : "text-blueFigma"
          }`}
        >
          2
        </div>
        <p className="text-sm">Riwayat</p>
      </div>
    </div>
  );
};

export default Stepper;
