import { Crown } from "lucide-react";
const VideoSection = () => {
  return (
    <div className="mt-20 ">
      <div className="flex justify-center">
        <h2 className="relative text-center mb-2 text-3xl md:text-4xl w-fit z-10 font-semibold">
          See in action
          <span className="absolute h-[14px] w-full bg-yellow-300/80 bottom-1 left-0 z-[-1] rounded-md"></span>
        </h2>
      </div>
      <p className="text-center text-base md:text-lg text-gray-800">
        No unnecessary features, no complicated dashboard. Created just to get
        your job done
      </p>

      <div>
        <p className="text-sm md:text-base text-center text-gray-500">
          It only takes 40 seconds to go viral with GoViralFast!
        </p>
      </div>

      <div className="flex justify-center mt-8 items-center">
        <div className="flex items-center gap-8 w-full max-w-4xl aspect-video relative ">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/B46Ikf4qhqY?rel=0&modestbranding=1&showinfo=0&controls=1&fs=0
"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="absolute opacity-0 pointer-events-none xl:opacity-100 xl:pointer-events-auto xl:flex flex-col justify-center items-center delay-100 transition-all  transform top-[25%] -left-[158px] ">
            <div className="relative">
              <Crown className="absolute -top-[12px] -left-[17px] -rotate-45 size-4" />
              <p className="text-xs font-semibold">It only takes 46 seconds</p>
            </div>

            <svg
              className="w-12 h-12 fill-base-content/80"
              viewBox="0 0 130 130"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M60.99 102.01c14.59 10.18 31.26 17.6 47.77 16.13 6.06-.54 11.67-2.8 17.44-5.04.51-.2.76-.77.56-1.28-.2-.5-.78-.76-1.29-.56-5.58 2.18-11.02 4.4-16.9 4.92-16.26 1.45-32.64-6.04-46.96-16.14.05-.15.1-.3.15-.45 1.1-3.21.4-7.89-1.41-12.8-2.62-7.13-7.5-14.79-11.9-19.02-2.03-1.95-3.99-3.18-5.6-3.44-1.33-.22-2.48.14-3.36 1.17-.73.86-1.15 1.95-1.27 3.23-.16 1.7.21 3.77.98 6.03 2.85 8.33 11.21 19.29 15.75 22.8 1.42 1.1 2.87 2.19 4.34 3.26-.29.92-.58 1.8-.92 2.59-.51 1.19-1.15 2.22-2.24 2.97-2.01 1.38-4.42 1.61-6.88 1.25-3.94-.57-8.02-2.62-11.03-4.41-16.92-10.05-25.27-27.49-29.77-45C3.9 40.54 3.3 22.77 1.96 12.29c-.07-.54-.56-.92-1.1-.85-.54.07-.92.56-.85 1.1 1.35 10.54 1.96 28.41 6.53 46.19 4.62 17.99 13.28 35.86 30.67 46.19 3.2 1.9 7.56 4.09 11.76 4.72 2.97.43 5.86.09 8.29-1.55 1.41-.97 2.28-2.29 2.93-3.83.3-.69.55-1.43.8-2.2zM59.94 98.85c.93-2.88.17-7-1.43-11.35-2.52-6.85-7.2-14.22-11.44-18.29-1.41-1.36-2.75-2.35-3.96-2.76-.86-.29-1.61-.26-2.14.39-.61.72-.84 1.7-.83 2.84.01 1.32.35 2.85.92 4.49 2.73 7.99 10.74 18.51 15.09 21.89 1.24.96 2.5 1.91 3.79 2.79z"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M127.81 110.05c-.07.45-.29 1.02-.55 1.61-.59 1.36-1.42 2.8-1.79 3.49-.25.48-.06 1.08.42 1.32.48.24 1.07.06 1.32-.42.45-.86 1.55-2.79 2.14-4.37.3-.82.47-1.58.46-2.13-.03-.53-.24-.89-.54-1.14-.32-.27-.82-.43-1.49-.41-.74.02-1.79.26-2.95.34-1 .08-2.06.05-3.03-.46-.49-.24-1.08-.03-1.32.45-.24.49-.03 1.08.45 1.32 1.81.91 3.87.71 5.5.48.49-.07 1.09-.12 1.43-.14z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
