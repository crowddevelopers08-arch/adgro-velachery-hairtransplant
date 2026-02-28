"use client";
import Image from 'next/image';

const HairTransplantSection = () => {
  return (
    <>
     <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
    <section className="w-full py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8" style={{fontFamily: "'Outfit', sans-serif"}}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
        
        {/* Problem Section - Left Card */}
        <div 
          className="p-4 max-[470px]:p-3 sm:p-6 lg:p-8 shadow-2xl rounded-2xl lg:rounded-[1rem] flex flex-col justify-center max-[470px]:h-fit h-[400px]"
          style={{ backgroundColor: '#0f1524', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)' }}
        >
          <h2 
            className="text-[40px] max-[470px]:text-[30px] sm:text-3xl lg:text-4xl font-bold max-[470px]:mb-2 mb-3 sm:mb-3 lg:mb-3 text-center lg:text-left"
            style={{ color: '#de2225' }}
          >
            Problem Section
          </h2>
          
          <p className="text-white mb-3 sm:mb-3 lg:mb-3 text-base max-[470px]:mb-2 sm:text-lg lg:text-xl leading-relaxed text-center lg:text-left">
            Is your hair thinning or receding? Hair loss can affect your confidence, appearance, and even social life.
          </p>
          
          <h3 className="text-white font-semibold mb-3 sm:mb-3 lg:mb-3 text-lg sm:text-xl lg:text-2xl lg:text-left">
            Check for signs:
          </h3>
          
          <ul className="text-white space-y-3 sm:space-y-4 lg:space-y-5 text-sm sm:text-base lg:text-lg">
            <li className="flex items-start">
              <span className="mr-3 sm:mr-4 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="pt-0.5">Receding hairline</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 sm:mr-4 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="pt-0.5">Thinning hair on top or crown</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 sm:mr-4 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="pt-0.5">Excessive hair fall in shower or comb</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 sm:mr-4 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="pt-0.5">Patchy bald spots</span>
            </li>
          </ul>
        </div>

        {/* Image Section - Right Card */}
        <div 
          className="rounded-2xl lg:rounded-[1rem] flex items-center justify-center max-[470px]:h-[300px] h-[400px] overflow-hidden shadow-2xl"
          style={{ 
            backgroundColor: '#0f1524', 
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Single Image Container */}
          <div className="w-full h-full relative overflow-hidden rounded-xl lg:rounded-[1rem]">
            <Image 
              src="/prb1.jpg" // Replace with your image path
              alt="Hair transplant before and after results"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
            />
          </div>
        </div>

      </div>
    </section>
    </>
  );
};

export default HairTransplantSection;