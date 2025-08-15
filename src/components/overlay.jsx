import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { useState } from "react";
import "../index.css";

const Overlay = ({
  url,
  thumbnails,
  mainImgs,
  onClose,
  onNext,
  onPrev,
  onThumbnailClick,
  i,
}) => {
  return (
    <section className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="relative bg-black/10 rounded-lg shadow-xl p-4 w-full max-w-4xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-6 right-50 z-10 bg-white/0 text-white font-semibold rounded-full p-2 shadow transition "
        >
          <X
            strokeWidth={3}
            className="font-semibold  hover:text-orange-500 hover:border"
          />
        </button>

        {/* Main image with navigation */}
        <section className="relative w-full flex items-center justify-center">
          {thumbnails?.length > 0 && (
            <>
              <div
                onClick={onPrev}
                className="absolute left-0 ml-4 p-2 bg-white rounded-[50%] w-10 h-10 flex justify-center items-center shadow hover:bg-gray-100 transition cursor-pointer"
              >
                <ChevronLeft
                  width={20}
                  height={20}
                  size={"20px"}
                  strokeWidth={4}
                  className="text-2xl hover:text-orange-500"
                />
              </div>
              <div
                onClick={onPrev}
                className="absolute right-0 ml-4 p-2 bg-white rounded-[50%] w-10 h-10 flex justify-center items-center shadow hover:bg-gray-100 cursor-pointer transition"
              >
                <ChevronRight
                  width={20}
                  height={20}
                  size={"20px"}
                  strokeWidth={4}
                  className="text-2xl hover:text-orange-500"
                />
              </div>
            </>
          )}

          <img
            src={mainImgs?.[i] ?? url}
            alt="main display"
            className="rounded-8 max-h-[70vh] object-contain w-[55%] sm:w-[70%]"
          />
        </section>

        {/* Thumbnails */}
        {thumbnails?.length > 0 && (
          <section className="mt-6 w-full">
            <ul className="flex gap-4 justify-center overflow-x-auto px-2 py-2">
              {thumbnails.map((thumb, index) => (
                <li key={thumb} className="flex-shrink-0">
                  <button
                    onClick={() => onThumbnailClick(index)}
                    className={`block rounded-md border-2 transition-all ${
                      i === index
                        ? "border-orange-500 opacity-100"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={thumb}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-16 h-16 rounded object-cover"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </section>
  );
};

export default Overlay;
