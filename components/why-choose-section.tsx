"use client";
import React, { useEffect, useRef, useState } from 'react';

const KneePainTreatment: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect after first trigger to prevent re-animation
          observer.disconnect();
        }
      },
      { threshold: 0.3 } // Trigger when 30% of component is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Round Check Icon SVG
  const CheckIcon = ({ className = "" }) => (
    <svg 
      className={className}
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#de2225" className="drop-shadow-sm"/>
      <path 
        d="M16.5 8.5L10.5 15.5L7.5 12.5" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <>
      <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
    <div 
      ref={containerRef}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-8 max-[470px]:py-2 font-sans relative" style={{fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Title Section */}
      <h2 className="text-2xl max-[470px]:text-[20px] text-center sm:text-3xl lg:text-4xl pb-4 sm:pb-5 lg:pb-6 font-bold text-[#de2225] max-[470px]:mb-0 max-[470px]:pb-0">
        Adgro <span className="text-gray-900 font-bold">Advantage</span> (Why Choose Us)
      </h2>
      
      {/* Subtitle */}
      <p className="text-center text-lg sm:text-xl text-gray-700 mb-8 max-[470px]:mb-0 sm:mb-10 font-medium">
        We deliver results you can trust:
      </p>
      
      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left side content */}
        <div className="lg:w-2/5 space-y-6 sm:space-y-8 lg:space-y-10 mb-8 lg:mb-0 w-full">
          <div 
            className={`bg-white p-3 sm:p-3 lg:p-3 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-100 transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-10'
            }`}
            style={{ transitionDelay: isVisible ? '0.1s' : '0s' }}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CheckIcon className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                  Senior Surgeons Only
                </h3>
                <p className="text-gray-700 mb-3 sm:mb-4 font-medium text-sm sm:text-base">
                  Procedures performed only by senior hair restoration surgeons
                </p>
              </div>
            </div>
          </div>
          
          <div 
            className={`bg-white p-3 sm:p-3 lg:p-3 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-100 transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-10'
            }`}
            style={{ transitionDelay: isVisible ? '0.3s' : '0s' }}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CheckIcon className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                  Natural Hairline Design
                </h3>
                <p className="text-gray-700 mb-3 sm:mb-4 font-medium text-sm sm:text-base">
                  Customized to your face for perfectly natural results
                </p>
              </div>
            </div>
          </div>

          <div 
            className={`bg-white p-3 sm:p-3 lg:p-3 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-100 transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-10'
            }`}
            style={{ transitionDelay: isVisible ? '0.5s' : '0s' }}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CheckIcon className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                  High Success Rate
                </h3>
                <p className="text-gray-700 mb-3 sm:mb-4 font-medium text-sm sm:text-base">
                  90–95% graft survival rate using advanced techniques
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Center image */}
        <div className="flex justify-center w-full max-w-xs sm:max-w-sm md:max-w-md my-6 sm:my-8 lg:my-0 relative order-first lg:order-none">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#de2225] to-red-300 rounded-full blur-xl sm:blur-2xl opacity-20 animate-pulse"></div>
            <div 
              className={`w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex items-center justify-center relative overflow-hidden transition-all duration-1000 ${
                isVisible 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-90'
              }`}
              style={{ 
                transitionDelay: isVisible ? '0.2s' : '0s',
                borderRadius: '50%',
                border: '5px solid #de2225',
                boxShadow: '0 10px 20px rgba(222, 34, 37, 0.4), 0 5px 10px rgba(222, 34, 37, 0.3), 0 0 15px rgba(222, 34, 37, 0.2)'
              }}
            >
              <img 
                src="cnnn.jpg" 
                alt="Hair Restoration Excellence" 
                className="w-full h-full object-cover"
              />
            </div>
            <div 
              className={`absolute -bottom-4 sm:-bottom-5 lg:-bottom-6 left-0 right-0 flex justify-center transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: isVisible ? '0.6s' : '0s' }}
            >
              <div className="bg-[#de2225] text-white px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 rounded-full text-sm sm:text-base lg:text-lg font-bold shadow-md">
                Why Choose Adgro
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side content */}
        <div className="lg:w-2/5 space-y-6 sm:space-y-8 lg:space-y-10 w-full">
          <div 
            className={`bg-white p-3 sm:p-3 lg:p-3 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-100 transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionDelay: isVisible ? '0.1s' : '0s' }}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CheckIcon className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                  Safe & Comfortable
                </h3>
                <p className="text-gray-700 mb-3 sm:mb-4 font-medium text-sm sm:text-base">
                  Comfortable, safe, and hygienic procedures
                </p>
              </div>
            </div>
          </div>
          
          <div 
            className={`bg-white p-3 sm:p-3 lg:p-3 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-100 transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionDelay: isVisible ? '0.3s' : '0s' }}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CheckIcon className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                  Proven Track Record
                </h3>
                <p className="text-gray-700 mb-3 sm:mb-4 font-medium text-sm sm:text-base">
                  3000+ successful cases with consistent results
                </p>
              </div>
            </div>
          </div>

          <div 
            className={`bg-white p-3 sm:p-3 lg:p-3 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-100 transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionDelay: isVisible ? '0.5s' : '0s' }}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CheckIcon className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                  Excellent Reputation
                </h3>
                <p className="text-gray-700 mb-3 sm:mb-4 font-medium text-sm sm:text-base">
                  4.9/5 Google rating from satisfied patients
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default KneePainTreatment;