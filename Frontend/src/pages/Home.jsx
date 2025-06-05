import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation} from "swiper/modules";

import HeroHome from "../components/HeroHome";
import PredictForm from "../components/PredictForm";
import Footer from "../components/Footer";
import NavbarAfter from "../components/NavbarAfter";

export default function Home() {
  const swiperRef = useRef(null);
  return (
    <>
      <NavbarAfter />
      <Swiper
        modules={[Navigation]}
        navigation
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="mySwiper"
      >
        <SwiperSlide>
          <HeroHome swiper={swiperRef} />
        </SwiperSlide>
        <SwiperSlide>
          <PredictForm />
        </SwiperSlide>
      </Swiper>
      <Footer />
    </>
  );
}