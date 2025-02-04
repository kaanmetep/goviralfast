import { Instagram, Youtube, Music2 } from "lucide-react";

const Platforms = () => {
  return (
    <div className="flex flex-col  mt-16 text-center">
      <h3 className="text-2xl md:text-3xl font-semibold mb-2  inline-block">
        Share everywhere, instantly with one click
      </h3>
      <p className="text-center w-[95%] lg:w-[70%] mx-auto font-light text-gray-600 text-sm md:text-base">
        GoViralFast doesn’t just help you find viral videos effortlessly—
        <span>
          it also makes sharing them incredibly easy, with just one click.
        </span>
      </p>
      <div className="flex justify-center gap-6 mt-6">
        {["TikTok", "Instagram", "Youtube"].map((item) => (
          <a
            href="#"
            className="group bg-white shadow-md rounded-xl p-4 md:p-6 flex flex-col items-center gap-3 transition-all hover:scale-105 hover:shadow-lg"
            key={item}
          >
            <div className="p-4 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-all">
              {item === "TikTok" && (
                <Music2 className="text-gray-800 size-7 md:size-9" />
              )}
              {item === "Youtube" && (
                <Youtube size={36} className="text-gray-800 size-7 md:size-9" />
              )}
              {item === "Instagram" && (
                <Instagram
                  size={36}
                  className="text-gray-800 size-7 md:size-9"
                />
              )}
            </div>
            <span className="text-gray-800 text-sm md:text-base font-medium">
              {item}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Platforms;
