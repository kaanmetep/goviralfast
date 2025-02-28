import PriceCard from "./PriceCard";

const Pricing = () => {
  return (
    <div className="py-24 mt-20 px-6 bg-gray-200/70  " id="pricing">
      <div className="text-center mb-16">
        <h2 className="relative text-center mb-2 text-3xl md:text-4xl w-fit z-10 font-semibold mx-auto">
          Pricing
          <span className="absolute h-[14px] w-full bg-yellow-300/80 bottom-1 left-0 z-[-1] rounded-md"></span>
        </h2>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Simple & straightforward pricing with all the features you need to
          create viral content.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <PriceCard
          type="Monthly"
          oldPrice="10"
          currentPrice="4"
          description="Ideal for creators serious about growing their presence"
          recommended={true}
        />
        <PriceCard
          type="Free"
          currentPrice="0"
          description="Perfect for beginners exploring viral content creation"
        />
      </div>
    </div>
  );
};

export default Pricing;
