import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/registry/magicui/marquee";
import { getTestimonialsForLanding } from "@/api/testimonial";

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-full md:w-64 w-48 cursor-pointer overflow-hidden rounded-xl border md:p-4 p-2",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05] mx-5",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img
          className="rounded-full object-cover"
          width="32"
          height="32"
          alt=""
          src={img || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
          onError={(e) => {
            e.target.src =
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
          }}
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

export function MarqueeDemo({ id = "testimoni" }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Data fallback jika API belum siap atau error
  const fallbackReviews = [
    {
      name: "Andi Setiawan",
      username: "Aplikasi yang Membantu Saya Lebih Sehat",
      body: "Dengan DiaPredict, saya bisa memantau risiko diabetes saya dan mendapatkan edukasi tentang pola makan sehat.",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      name: "Siti Nurhaliza",
      username: "Fitur Prediksi yang Akurat",
      body: "Saya terkesan dengan fitur prediksi risiko diabetes yang menggunakan data pribadi saya secara bijak dan akurat.",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      name: "Budi Prasetyo",
      username: "Edukasi Interaktif Sangat Membantu",
      body: "Modul edukasi tentang diabetes sangat interaktif dan mudah dimengerti. Sangat cocok untuk semua usia.",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      name: "Rina Ayu",
      username: "Desain Aplikasi yang User Friendly",
      body: "Tampilan aplikasi sangat ramah pengguna dan mudah digunakan, bahkan oleh orang tua saya.",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      name: "Dian Kurnia",
      username: "Notifikasi Pengingat Pola Hidup Sehat",
      body: "Saya suka fitur pengingat untuk minum air, olahraga, dan cek gula darah rutin dari DiaPredict.",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      name: "Hendra Gunawan",
      username: "Data Tercatat dengan Baik",
      body: "Riwayat kesehatan dan catatan harian saya tersimpan rapi, sangat membantu saat konsultasi dengan dokter.",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      name: "Yuniarti",
      username: "Bisa Cek Risiko Kapan Saja",
      body: "Saya bisa mengecek risiko diabetes saya kapan saja dan di mana saja dengan mudah lewat aplikasi ini.",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      name: "Rizky Fahreza",
      username: "Aplikasi Inovatif dan Bermanfaat",
      body: "DiaPredict adalah solusi pintar untuk membantu masyarakat lebih peduli terhadap diabetes.",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      name: "Lisa Marlina",
      username: "Membantu Keluarga Saya",
      body: "Kami sekeluarga memakai DiaPredict dan lebih sadar pentingnya menjaga pola makan dan hidup sehat.",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      name: "Agus Salim",
      username: "Rekomendasi dari Dokter",
      body: "Dokter saya menyarankan aplikasi ini untuk membantu saya memantau kesehatan harian. Hasilnya memuaskan.",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
  ];

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await getTestimonialsForLanding(12); // Ambil 12 testimoni untuk efek marquee yang bagus

      if (response.data && response.data.length > 0) {
        // Format data dari database sesuai dengan struktur ReviewCard
        const formattedReviews = response.data.map((testimonial, index) => ({
          name: testimonial.users?.name || `Pengguna ${index + 1}`,
          username: testimonial.title || "Testimoni DiaPredict", // title sebagai username
          body: testimonial.comment,
          img:
            testimonial.profile_picture ||
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        }));

        setReviews(formattedReviews);
      } else {
        // Jika tidak ada data dari database, gunakan fallback
        setReviews(fallbackReviews);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      // Jika ada error, gunakan data fallback
      setReviews(fallbackReviews);
    } finally {
      setLoading(false);
    }
  };

  // Tampilkan loading state
  if (loading) {
    return (
      <section className="py-16 bg-gray-50" id={id}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Testimoni Pengguna
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dengar apa kata pengguna kami tentang pengalaman mereka menggunakan
              DiaPredict
            </p>
          </div>

          <div className="flex justify-center items-center h-64">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="text-gray-600">Memuat testimoni...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Split reviews untuk 2 baris marquee
  const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

  return (
    <section className="py-16 bg-gray-50" id={id}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Testimoni Pengguna
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dengar apa kata pengguna kami tentang pengalaman mereka menggunakan
            DiaPredict
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-12 scroll-mt-20">
          <Marquee pauseOnHover className="[--duration:20s] [--gap:2rem]">
            {firstRow.map((review, i) => (
              <ReviewCard key={`first-${i}`} {...review} />
            ))}
          </Marquee>
          <Marquee
            reverse
            pauseOnHover
            className="[--duration:16s] [--gap:2rem] mt-8"
          >
            {secondRow.map((review, i) => (
              <ReviewCard key={`second-${i + 100}`} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-gray-50"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-gray-50"></div>
        </div>

      </div>
    </section>
  );
}

export default MarqueeDemo;
