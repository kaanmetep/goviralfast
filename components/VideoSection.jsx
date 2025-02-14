const VideoSection = () => {
  return (
    <div className="mt-20">
      <div className="flex justify-center">
        <h2 className="relative text-center mb-2 text-3xl md:text-4xl w-fit z-10 font-semibold">
          See in action
          <span className="absolute h-[14px] w-full bg-yellow-300/80 bottom-1 left-0 z-[-1] rounded-md"></span>
        </h2>
      </div>
      <p className="text-center text-lg text-gray-800">
        No unnecessary features, no complicated dashboard. Created just to get
        your job done
      </p>

      <p className="text-center text-gray-500">
        It only takes 40 seconds to go viral with GoViralFast!
      </p>
      <div className="flex justify-center mt-8">
        <div className="w-full max-w-4xl aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/B46Ikf4qhqY?rel=0&modestbranding=1&showinfo=0&controls=1&fs=0
"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
