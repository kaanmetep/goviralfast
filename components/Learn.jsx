import Button from "./Button";

const Learn = () => {
  const steps = [
    {
      number: 1,
      title: "Pick a trending video",
      description:
        "Find a video that's already getting attention. The trendier, the better!",
      animation: "fade-right",
    },
    {
      number: 2,
      title: "Add your own caption",
      description:
        "Make it catchy, make it yours! A good caption makes all the difference.",
      animation: "fade-left",
    },
    {
      number: 3,
      title: "Choose the best hashtags",
      description:
        "Hashtags help people find your content. Pick the right ones and boost your reach!",
      animation: "fade-right",
    },
    {
      number: 4,
      title: "Download it with one click",
      description:
        "You're ready! Post it on your favorite platforms and let the magic happen.",
      animation: "fade-left",
    },
  ];

  return (
    <section
      className="mt-20 px-4 relative max-w-6xl mx-auto"
      id="learn"
      aria-labelledby="how-it-works-heading"
    >
      <div className="py-8 text-center">
        <h2
          id="how-it-works-heading"
          className="relative inline-block text-4xl font-bold mb-4"
        >
          How does it work?
          <span
            className="absolute h-3 w-full bg-yellow-300 bottom-1 left-0 -z-10 rounded-md"
            aria-hidden="true"
          ></span>
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto">
          Creating viral content has never been easier. Follow these four simple
          steps to skyrocket your social media presence.
        </p>
      </div>

      <div className="relative">
        {/* Connecting line */}
        <div
          className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-100 via-yellow-400 to-yellow-500 transform -translate-x-1/2 rounded-full"
          aria-hidden="true"
        ></div>

        <ol className="space-y-12 lg:space-y-0 relative list-none m-0 p-0">
          {steps.map((step, index) => (
            <li
              key={step.number}
              className={`lg:flex items-center ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } relative`}
            >
              {/* Step number with connecting point for desktop */}
              <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 z-10">
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-lg border-4 border-yellow-500 text-yellow-600 font-bold text-xl`}
                  aria-hidden="true"
                >
                  {step.number}
                </div>
              </div>

              {/* Content container */}
              <div
                className={`lg:w-1/2 ${
                  index % 2 === 0 ? "lg:pr-16 " : "lg:pl-16"
                }`}
              >
                <div
                  className={`relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-yellow-500`}
                >
                  {/* Mobile number and icon */}
                  <div
                    className={`absolute -top-5 -left-5 rotate-12 lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 font-bold`}
                    aria-hidden="true"
                  >
                    {step.number}
                  </div>

                  <div className="flex items-center mb-3 gap-4">
                    <h3 className={`text-xl font-bold text-gray-800`}>
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col mt-8 text-center">
        <div className="mx-auto">
          <Button aria-label="Start creating viral videos now">
            Create Viral Videos
          </Button>
        </div>
        <p className="mt-4 text-gray-500 text-sm">
          Join thousands of creators who have already gone viral
        </p>
      </div>
    </section>
  );
};

export default Learn;
