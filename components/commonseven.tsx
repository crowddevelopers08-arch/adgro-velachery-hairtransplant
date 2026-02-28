"use client";
import Image from 'next/image';

const HairTransplant = () => {
  return (
    <>
     <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>

    <section className="w-full py-8 max-[470px]:py-4 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8"style={{fontFamily: "'Outfit', sans-serif"}}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
        
        {/* Image Section - Left Card */}
        <div 
          className="shadow-2xl rounded-xl lg:rounded-[1rem] flex items-center justify-center order-2 lg:order-1"
          style={{ 
            backgroundColor: '#0f1524',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 10px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)'
          }}
        >
          {/* Single Image Container */}
          <div className="w-full h-full min-h-[300px] sm:min-h-[350px] lg:min-h-[400px] xl:min-h-[450px] relative overflow-hidden rounded-lg lg:rounded-[1rem]">
            <Image 
              src="/does-stress.jpg" // Replace with your image path
              alt="Hair transplant before and after results"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Solution Section - Right Card */}
        <div 
          className="p-6 sm:p-8 lg:p-5 shadow-2xl rounded-xl lg:rounded-[1rem] flex flex-col justify-center order-1 lg:order-2 bg-gradient-to-br from-white to-gray-50 border border-gray-200"
          style={{ 
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.08)'
          }}
        >
          <h2 
            className="text-[40px] leading-none max-[470px]:text-[25px] sm:text-3xl lg:text-[40px] xl:text-[40px] font-bold mb-6 sm:mb-4 lg:mb-5 text-center lg:text-left bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
          >
            Your Hair Restoration Journey
          </h2>
          
          <ul className="space-y-4 sm:space-y-6 lg:space-y-8 text-base sm:text-lg lg:text-xl">
            <li className="flex items-start">
              <span className="mr-3 sm:mr-4 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-[#de2225] rounded-full flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <div>
                <span className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg">Consultation & Scalp Analysis</span> 
                <span className="block text-gray-600 text-xs sm:text-sm lg:text-base mt-1">Personalized assessment for your hair loss type</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-3 sm:mr-4 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-[#de2225] rounded-full flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <div>
                <span className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg">Advanced Transplant Procedure</span> 
                <span className="block text-gray-600 text-xs sm:text-sm lg:text-base mt-1">Performed by senior surgeons using FDA-approved techniques</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-3 sm:mr-4 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-[#de2225] rounded-full flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <div>
                <span className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg">Quick Recovery</span> 
                <span className="block text-gray-600 text-xs sm:text-sm lg:text-base mt-1">Minimal downtime, ongoing support</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-3 sm:mr-4 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-[#de2225] rounded-full flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <div>
                <span className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg">Natural Results</span> 
                <span className="block text-gray-600 text-xs sm:text-sm lg:text-base mt-1">Hair grows naturally within months, permanent and strong</span>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </section>
    </>
  );
};

export default HairTransplant;