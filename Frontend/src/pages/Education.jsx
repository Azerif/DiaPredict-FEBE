import TabInterfaces from "../components/tabbedInterfaces";
import Footer from "../components/Footer";
import NavbarAfter from "../components/NavbarAfter";

export default function Education() {
  return (
    <div>
    <NavbarAfter />
    <main>
      <section className=" sm:block bg-lightBlueFigma hidden ">
        <h1 className="text-center text-5xl w-4/5 font-bold pt-8 mx-auto">
          Mengenal Diabetes: Penyebab, Gejala, dan Cara Pencegahannya
        </h1>
        <h2 className="text-3xl text-center bold text-blueFigma mt-20 font-bold">
          Apa itu Diabetes?
        </h2>
        <div className="w-full flex justify-center mt-2 pb-10">
          <p className="text-center w-3/5 text-lg">
            Diabetes adalah penyakit kronis yang terjadi ketika tubuh tidak
            dapat menghasilkan insulin secara cukup atau tidak mampu menggunakan
            insulin secara efektif. Insulin adalah hormon yang mengatur kadar
            gula (glukosa) dalam darah. Tanpa insulin yang cukup, glukosa
            menumpuk dalam darah dan menyebabkan berbagai komplikasi kesehatan.
          </p>
        </div>
      </section>
      <section className="sm:block mx-auto w-4/6 mt-8 mb-8 hidden">
        <h2 className="text-3xl font-bold text-blueFigma">
          Jenis - Jenis Diabetes
        </h2>
        <ol className="list-decimal ml-4 space-y-4 mt-5 marker:text-xl marker:font-medium">
          <li>
            <h3 className="text-xl font-medium">Diabetes Tipe 1</h3>
            <p className="text-lg">
              Ini adalah kondisi autoimun di mana sistem imun tubuh menyerang
              sel penghasil insulin di pankreas. Biasanya terjadi pada anak-anak
              dan remaja. Penderita harus menggunakan insulin sepanjang hidup
            </p>
          </li>
          <li>
            <h3 className="text-lg font-medium ">Diabetes Tipe 2</h3>
            <p className="text-lg">
              Tipe ini paling umum. Tubuh masih memproduksi insulin, tapi tidak
              digunakan secara efektif (resistensi insulin). Umumnya dipicu oleh
              gaya hidup tidak sehat seperti pola makan buruk dan kurang
              aktivitas fisik.
            </p>
          </li>
          <li>
            <h3 className="text-lg font-medium">Diabetes Gestasional</h3>
            <p className="text-lg">
              Terjadi pada wanita selama kehamilan, terutama trimester kedua
              atau ketiga. Biasanya sembuh setelah melahirkan, tetapi
              meningkatkan risiko diabetes tipe 2 di kemudian hari.
            </p>
          </li>
        </ol>
      </section>
      <section className="sm:block mx-auto pt-8 pb-8 bg-lightBlueFigma hidden">
        <h2 className="text-3xl font-bold w-4/6 mb-5 text-blueFigma mx-auto">
          Kenali Gejala Diabetes
        </h2>
        <ul className="mx-auto w-4/6 list-disc  space-y-2  marker:text-xl marker:font-medium">
          <li className="ml-6">Sering buang air kecil</li>
          <li className="ml-6">Cepat haus</li>
          <li className="ml-6">Berat badan menurun drastis</li>
          <li className="ml-6">Luka sulit sembuh</li>
          <li className="ml-6 mb-8">Pandangan kabur</li>
        </ul>
        <h2 className="text-3xl font-bold w-4/6 mb-5 text-blueFigma mx-auto">
          Penyebab & Faktor Risiko
        </h2>
        <ul className="mx-auto w-4/6 list-disc  space-y-2  marker:text-xl marker:font-medium">
          <li className="ml-6">Keturunan/genetik</li>
          <li className="ml-6">Pola makan tidak sehat</li>
          <li className="ml-6">Kurang aktivitas fisik</li>
          <li className="ml-6">Kegemukan atau obesitas</li>
          <li className="ml-6 pb-4">Usia di atas 40 tahun</li>
        </ul>
      </section>
      <section className="sm:block mx-auto w-4/6 mt-8 mb-8 hidden">
        <h2 className="text-3xl font-bold text-blueFigma">
          Pencegahan & Gaya Hidup Sehat
        </h2>
        <ul className="list-disc ml-5 mt-5 space-y-2  marker:text-xl marker:font-medium">
          <li>Makan makanan bergizi dan rendah gula</li>
          <li>Berolah raga secara rutin</li>
          <li>Menjaga berat badan ideal</li>
          <li>Rutin memeriksa kadar gula darah</li>
          <li>Menghindari stres berlebihan</li>
        </ul>
      </section>
      <section className="flex flex-col items-center justify-center sm:hidden ">
        <h1 className="text-center text-md w-4/5 font-bold pt-8 mx-auto">
          Mengenal Diabetes: Penyebab, Gejala, dan Cara Pencegahannya
        </h1>
        <TabInterfaces></TabInterfaces>
      </section>
    </main>
    <Footer />
    </div>
  );
}
