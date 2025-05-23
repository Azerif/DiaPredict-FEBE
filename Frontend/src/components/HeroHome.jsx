{/* INI PICT BISA DI CARI GAMBAR YG LEBIH BAGUS MASIH BINGUNG NYARI GAMBAR YG COCOK TADI */}
import pict from "../assets/download (5).png";
export default function HeroHome() {
  return (
    <section className="bg-lightBlueFigma pt-10 pb-10 ">
      {/* Large/Desktop */}
      <section className="hidden lg:grid grid-cols-2 max-w-9/10 mx-auto items-center">
        <div className="flex flex-col justify-center gap-5 ">
          <h1 className="text-5xl font-bold">
            Prediksi Dini, Hidup lebih Sehat Bersama Dia
            <span className="text-blueFigma">Predict</span>
          </h1>
          <p className="max-w-9/10 text-2xl">
            DiaPredict membantu Anda memahami risiko diabetes lebih awal agar
            Anda bisa hidup lebih tenang dan terarah.
          </p>
          <a>
            <button className="bg-blueFigma py-2 px-3 rounded-lg text-white">
              Mulai Cek Risiko
            </button>
          </a>
        </div>
        <img src={pict} className="h-auto w-auto justify-self-center"></img>
      </section>

      {/* Medium/Tablet/Ipad */}
      <section className="hidden sm:grid  grid-cols-2 max-w-9/10 mx-auto items-center lg:hidden">
        <div className="flex flex-col justify-center gap-5 ">
          <h1 className="text-3xl font-bold">
            Prediksi Dini, Hidup lebih Sehat Bersama Dia
            <span className="text-blueFigma">Predict</span>
          </h1>
          <p className="max-w-9/10 text-lg">
            DiaPredict membantu Anda memahami risiko diabetes lebih awal agar
            Anda bisa hidup lebih tenang dan terarah.
          </p>
          <a>
            <button className="bg-blueFigma py-2 px-3 rounded-lg text-white">
              Mulai Cek Risiko
            </button>
          </a>
        </div>
        <img src={pict} className="h-auto w-auto justify-self-center"></img>
      </section>
      {/* Small/Mobile*/}
      <section>
        <section className="flex flex-col max-w-xs mx-auto sm:hidden">
          <div className="flex flex-col justify-center gap-5 ">
            <h1 className="text-3xl font-bold">
              Prediksi Dini, Hidup lebih Sehat Bersama Dia
              <span className="text-blueFigma">Predict</span>
            </h1>
            <img src={pict} className="h-auto w-auto justify-self-center"></img>
            <p className="max-w-9/10 text-lg">
              DiaPredict membantu Anda memahami risiko diabetes lebih awal agar
              Anda bisa hidup lebih tenang dan terarah.
            </p>
            <a>
              <button className="bg-blueFigma py-2 px-3 rounded-lg text-white">
                Mulai Cek Risiko
              </button>
            </a>
          </div>
        </section>
      </section>
    </section>
  );
}
