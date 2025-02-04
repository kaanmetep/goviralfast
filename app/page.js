import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Slider from "@/components/Slider";
import Learn from "@/components/Learn";
import Platforms from "@/components/Platforms";
import Video from "@/components/Video";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
export default function Home() {
  return (
    <div>
      <div className="flex flex-col mx-auto w-[95%]  md:w-[90%] max-w-[1500px]">
        <Header />
        <main>
          <HeroSection />
          <div className="w-full  flex justify-center">
            <Slider />
          </div>
          <Learn />
          <Platforms />
          <Video />
        </main>
      </div>
      <Pricing />
      <Banner />
      <Footer />
    </div>
  );
}
