const Video = () => {
  return (
    <div className="mt-20">
      <div className="flex justify-center">
        <h2 className="relative text-center mb-2 text-3xl md:text-4xl w-fit z-10 font-semibold">
          See in action
          <span className="absolute h-[14px] w-full bg-yellow-300/80 bottom-1 left-0 z-[-1] rounded-md"></span>
        </h2>
      </div>
      <p className="text-center text-gray-600">
        It only takes 50 seconds to go viral with GoViralFast
      </p>
      <div className="flex justify-center mt-8">
        <div className="w-full max-w-4xl aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/j_oqP6OM1i4"
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

export default Video;
