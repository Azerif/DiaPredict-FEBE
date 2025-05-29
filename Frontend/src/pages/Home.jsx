import HeroHome from "../components/HeroHome";
import PredictForm from "../components/PredictForm";
import Footer from "../components/Footer";
import NavbarAfter from "../components/NavbarAfter";

export default function Home() {
  return (
    <>
      <NavbarAfter />
      <HeroHome></HeroHome>
      <PredictForm></PredictForm>
      <Footer></Footer>
    </>
  );
}
