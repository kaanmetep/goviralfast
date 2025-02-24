import PriceCard from "./PriceCard";
const Pricing = () => {
  return (
    <div
      className="mt-20 bg-gray-200/70 rounded-lg shadow-lg p-6 max-w-[1500px] mx-auto border-t-2 border-b-2 md:px-16"
      id="pricing"
    >
      <div className="flex justify-center">
        <h2 className="relative text-center mb-2 text-3xl md:text-4xl w-fit z-10 font-semibold">
          Pricing
          <span className="absolute h-[14px] w-full bg-yellow-300/80 bottom-1 left-0 z-[-1] rounded-md"></span>
        </h2>
      </div>
      <p className="text-center text-gray-600">
        Simple & Straightforward Pricing
      </p>
      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <PriceCard type={"Monthly"} oldPrice={"10"} currentPrice={"4"} />
        <PriceCard type={"Free"} currentPrice={"0"} />
      </div>
    </div>
  );
};

export default Pricing;
