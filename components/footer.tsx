"use client";
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1e1e1e] text-[#e2e2e2] pt-16 max-[426px]:pt-6 pb-8 relative overflow-hidden"style={{fontFamily: "'Outfit', sans-serif"}}>
      {/* Decorative top element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#ea2629]"></div>
      
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-[425px]:gap-4 max-[425px]:mb-6 mb-12">
          {/* Brand section */}
          <div className="space-y-6">
            <div className="flex items-center">
              {/* <div className="w-12 h-12 rounded-full bg-[#ea2629] flex items-center justify-center text-white font-bold text-xl mr-3">
                A
              </div> */}
               <img  className="w-[200px] h-[60px] max-[768px]:w-[150px] max-[768px]:h-[50px] max-[480px]:w-[120px] max-[480px]:h-[40px]" src="logo2.png" alt="logo" />
              
              <h2 className="text-2xl max-[425px]:text-[18px] font-bold text-white">Adgro - Hair Transplant, velachery</h2>
            </div>
            <p className="text-lg max-[425px]:text-[16px] leading-relaxed opacity-80 max-w-md">
             At Adgrohair, we aim at enhancing beauty aesthetically with the help of advcance science. Our vision is to provide multi specialty cosmetic and physiotherapy treatments and achieve excellence in patient care.
            </p>
          </div>

          {/* Contact section */}
         <div className="space-y-6">
  <h3 className="text-2xl font-bold text-white relative pb-2 
                after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-12 after:bg-[#ea2629]">
    Contact Us
  </h3>
  <div className="space-y-4">
    <div className="flex items-start">
      <div className="w-10 h-10 text-[#ea2629] mr-3 mt-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
        </svg>
      </div>
      <p className="text-lg max-[425px]:text-[16px] opacity-80 leading-relaxed">
        Second Floor Block No.20, Sankaran Avenue, Plot No.31, Pandian St, Indira Gandhi Nagar, Velachery, Chennai, Tamil Nadu 600042
      </p>
    </div>
    
    <div className="flex items-center">
      <div className="w-5 h-5 text-[#ea2629] mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
        </svg>
      </div>
      <p className="text-lg max-[425px]:text-[16px] opacity-80">+91 83908 56789</p>
    </div>
  </div>
</div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 max-[425px]:my-4 my-8"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <p className="text-base max-[425px]:text-[14px] opacity-70">© 2025 Adgro Hair Clinic. All rights reserved.</p>
          
          <div className="flex flex-wrap justify-center max-[425px]:pb-[40px] gap-6">
            <a href="/privacy-policy" className="text-base max-[425px]:text-[15px] opacity-70 hover:text-[#ea2629] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-base max-[425px]:text-[15px] opacity-70 hover:text-[#ea2629] transition-colors">
              Terms of Service
            </a>
  
          </div>
        </div>

        {/* Call to action buttons */}
        <div className="flex flex-col max-[470px]:hidden sm:flex-row justify-center gap-4 mt-10">
          <a href="tel:+91 83908 56789" className="bg-[#ea2629] text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-red-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Call Now
          </a>
          
          <a href="#form" className="border border-[#ea2629] text-[#ea2629] px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#ea2629] hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            Book Now
          </a>
            
        </div>
         <div className="lg:hidden max-[470px]:flex fixed bottom-0 left-0 right-0 z-50 w-full">
        <a href="tel:+83908 56789" className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#ea2629] text-white font-bold text-base transition-all duration-300 hover:bg-green-800 active:translate-y-px">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
            </svg>
            Call Now
        </a>

        <a href="#form" className="flex-1 flex items-center justify-center gap-2 py-4 bg-black text-white font-bold text-base transition-all duration-300 hover:bg-blue-800 active:translate-y-px">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
            </svg>
            Book Now
        </a>
    </div>
      </div>
    </footer>
  );
};

export default Footer;