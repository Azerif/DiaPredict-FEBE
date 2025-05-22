import { cn } from "@/lib/utils";
import { Marquee } from "@/registry/magicui/marquee";

const reviews = [
  {
    name: "Andi Setiawan",
    username: "Aplikasi yang Membantu Saya Lebih Sehat",
    body: "Dengan DiaPredict, saya bisa memantau risiko diabetes saya dan mendapatkan edukasi tentang pola makan sehat.",
    img: "/assets/customers/1.jpg",
  },
  {
    name: "Siti Nurhaliza",
    username: "Fitur Prediksi yang Akurat",
    body: "Saya terkesan dengan fitur prediksi risiko diabetes yang menggunakan data pribadi saya secara bijak dan akurat.",
    img: "/assets/customers/2.jpg",
  },
  {
    name: "Budi Prasetyo",
    username: "Edukasi Interaktif Sangat Membantu",
    body: "Modul edukasi tentang diabetes sangat interaktif dan mudah dimengerti. Sangat cocok untuk semua usia.",
    img: "/assets/customers/3.jpg",
  },
  {
    name: "Rina Ayu",
    username: "Desain Aplikasi yang User Friendly",
    body: "Tampilan aplikasi sangat ramah pengguna dan mudah digunakan, bahkan oleh orang tua saya.",
    img: "/assets/customers/4.jpg",
  },
  {
    name: "Dian Kurnia",
    username: "Notifikasi Pengingat Pola Hidup Sehat",
    body: "Saya suka fitur pengingat untuk minum air, olahraga, dan cek gula darah rutin dari DiaPredict.",
    img: "/assets/customers/5.jpg",
  },
  {
    name: "Hendra Gunawan",
    username: "Data Tercatat dengan Baik",
    body: "Riwayat kesehatan dan catatan harian saya tersimpan rapi, sangat membantu saat konsultasi dengan dokter.",
    img: "/assets/customers/6.jpg",
  },
  {
    name: "Yuniarti",
    username: "Bisa Cek Risiko Kapan Saja",
    body: "Saya bisa mengecek risiko diabetes saya kapan saja dan di mana saja dengan mudah lewat aplikasi ini.",
    img: "/assets/customers/7.jpg",
  },
  {
    name: "Rizky Fahreza",
    username: "Aplikasi Inovatif dan Bermanfaat",
    body: "DiaPredict adalah solusi pintar untuk membantu masyarakat lebih peduli terhadap diabetes.",
    img: "/assets/customers/8.jpg",
  },
  {
    name: "Lisa Marlina",
    username: "Membantu Keluarga Saya",
    body: "Kami sekeluarga memakai DiaPredict dan lebih sadar pentingnya menjaga pola makan dan hidup sehat.",
    img: "/assets/customers/9.jpg",
  },
  {
    name: "Agus Salim",
    username: "Rekomendasi dari Dokter",
    body: "Dokter saya menyarankan aplikasi ini untuk membantu saya memantau kesehatan harian. Hasilnya memuaskan.",
    img: "/assets/customers/10.jpg",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img
          className="rounded-full object-cover"
          width="32"
          height="32"
          alt=""
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review, i) => (
          <ReviewCard key={i} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review, i) => (
          <ReviewCard key={i + 100} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
