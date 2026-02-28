"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

interface GalleryImage {
  id: number;
  beforeImage: string;
  afterImage: string;
  alt: string;
}

const BeforeAfterGallery: React.FC = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample data - replace with your actual images
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      beforeImage: "beffone.jpeg",
    },
    {
      id: 2,
      beforeImage: "befftwo.jpeg",
    },
    {
      id: 3,
      beforeImage: "beffthree.jpeg",
    },
    {
      id: 4,
      beforeImage: "befffour.jpeg",
    },
        {
      id: 5,
      beforeImage: "bef4.jpeg",
    },
  ];

  useEffect(() => {
    // Initial card animations
    if (cardRefs.current.length > 0) {
      gsap.fromTo(
        cardRefs.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      // Hover animations
      cardRefs.current.forEach((card) => {
        if (card) {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -8,
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        }
      });
    }

    // Cleanup
    return () => {
      cardRefs.current.forEach((card) => {
        if (card) {
          card.removeEventListener("mouseenter", () => {});
          card.removeEventListener("mouseleave", () => {});
        }
      });
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + getVisibleCards() >= galleryImages.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - getVisibleCards() : prevIndex - 1
    );
  };

  const getVisibleCards = () => {
    if (typeof window === "undefined") return 3;
    return window.innerWidth < 768 ? 1 : 3;
  };

  const getVisibleImages = () => {
    const visibleCount = getVisibleCards();
    let images = [];
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % galleryImages.length;
      images.push(galleryImages[index]);
    }
    
    return images;
  };

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap");
      `}</style>
      <div
        style={{ backgroundColor: "white", fontFamily: "'Outfit', sans-serif" }}
        className="py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <motion.h2 
            className="text-4xl max-[470px]:text-[30px] max-[325px]:text-[25px] font-bold text-center mb-4 text-gray-900 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 80,
              damping: 15
            }}
          >
            <span className="relative inline-block">
              Before & After Gallery
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              ></motion.div>
            </span>
          </motion.h2>
          
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 text-center mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto px-4">
            Before & after gallery showing real transformations
          </p>

          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
              aria-label="Previous images"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
              aria-label="Next images"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Carousel */}
            <div
              ref={carouselRef}
              className="flex justify-center items-center gap-4 sm:gap-6 lg:gap-8 px-8 sm:px-12"
            >
              {getVisibleImages().map((image, index) => (
                <div
                  key={`${image.id}-${currentIndex + index}`}
                  ref={addToRefs}
                  className="flex-shrink-0 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl lg:shadow-2xl transform transition-all duration-300 bg-gray-900"
                  style={{
                    width: getVisibleCards() === 1 ? '280px' : '280px',
                    flex: getVisibleCards() === 1 ? '0 0 auto' : '1',
                    maxWidth: getVisibleCards() === 1 ? '280px' : '320px',
                  }}
                >
                  {/* Before & After Images Side by Side */}
                  <div className="flex">
                    {/* Before Image */}
                    <div className="relative flex-1 group">
                      <img
                        src={image.beforeImage}
                        alt={`Before - ${image.alt}`}
                        className="w-full h-48 sm:h-64 lg:h-80 max-[470px]:h-[300px] object-cover"
                      />
        
                    </div>
                    
                    {/* After Image */}

                  </div>
              
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BeforeAfterGallery;