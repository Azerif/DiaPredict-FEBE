import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

import HeroHome from "../components/HeroHome";
import PredictForm from "../components/PredictForm";
import Footer from "../components/Footer";
import NavbarAfter from "../components/NavbarAfter";

export default function Home() {
  return (
    <>
      <NavbarAfter />
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <HeroHome />
        </SwiperSlide>
        <SwiperSlide>
          <PredictForm />
        </SwiperSlide>
      </Swiper>
      <Footer />
    </>
  );
}
