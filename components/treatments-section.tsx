"use client";
import React, { useState } from "react"; 

const Commonvideo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const videos = [
    {
      src: "https://www.youtube.com/embed/FuDEOrAxNwQ",
    },
    {
      src: "https://www.youtube.com/embed/AqDZhWoTHa4",
    },
    {
      src: "https://www.youtube.com/embed/rSGfOenaH8Y",
    },
    {
      src: "https://www.youtube.com/embed/O1BdkbTMxp0",
    },
    {
      src: "https://www.youtube.com/embed/2uDW2drzjU0",
    },
    {
      src: "https://www.youtube.com/embed/X7HE1Lznnho",
    },
    {
      src: "https://www.youtube.com/embed/KT_1ag4-KeE",
    },
    {
      src: "https://www.youtube.com/embed/TOUGLO7YUV4",
    },
    {
      src: "https://www.youtube.com/embed/WTrSQJHr7zA",
    },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap");
      `}</style>

      <div className="w-full flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 sm:py-3" style={{fontFamily: "'Outfit', sans-serif" }}>
        {/* Heading */}
        <div className="text-center max-[470px]:pt-5 max-[470px]:mb-4 mb-8">
          <h2
            className={`text-[40px] max-[426px]:text-[22px] sm:text-4xl font-bold text-white font-sans ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <span className="text-[#e02225]">Patient Testimonials</span>
          </h2>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden sm:grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl w-full">
          {videos.map((video, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col transform hover:-translate-y-1"
            >
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={video.src}
                  title={`Patient testimonial video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel View */}
        <div className="sm:hidden w-full max-w-md mx-auto">
          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-lg">
            {/* Slides */}
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-2"
                >
                  <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md transition-all duration-300">
                    <div className="relative w-full aspect-video bg-black">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={video.src}
                        title={`Patient testimonial video ${index + 1}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 z-10"
              aria-label="Previous video"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 z-10"
              aria-label="Next video"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentSlide ? "bg-[#e02225]" : "bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          {/* <div className="text-center mt-2 text-sm text-gray-300">
            {currentSlide + 1} / {videos.length}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Commonvideo;