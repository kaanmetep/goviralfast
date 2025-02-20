import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Slider from "@/components/Slider";
import Learn from "@/components/Learn";
import Platforms from "@/components/Platforms";
import VideoSection from "@/components/VideoSection";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import ProgressBar from "@/components/ProgressBar";
import { auth } from "@/auth";
import LoginPopup from "@/components/LoginPopup";
export default async function Home() {
  const session = await auth();
  return (
    <div>
      <LoginPopup />
      <div className="flex flex-col mx-auto w-[95%]  md:w-[90%] max-w-[1500px]">
        <Header />
        <ProgressBar />
        <main>
          <HeroSection />
          <div className="w-full  flex justify-center">
            <Slider />
          </div>
          <Learn />
          <Platforms />
          <VideoSection />
        </main>
      </div>

      <Pricing />
      <Banner />
      <Footer />
    </div>
  );
}
