import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Slider from "@/components/Slider";
import Learn from "@/components/Learn";
import VideoSection from "@/components/VideoSection";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import ProgressBar from "@/components/ProgressBar";
import LoginPopup from "@/components/LoginPopup";
import MasonrySection from "@/components/MasonrySection";
export default async function Home() {
  return (
    <>
      <LoginPopup />
      <div className="flex flex-col mx-auto w-[95%]  md:w-[90%] max-w-[1500px]">
        <Header />
        <ProgressBar />
        <main>
          <HeroSection />
          <Slider />
          <Learn />
          {/* <Platforms /> */}
          <VideoSection />
          <MasonrySection />
        </main>
      </div>
      <Pricing />
      <Banner />
      <Footer />
    </>
  );
}
