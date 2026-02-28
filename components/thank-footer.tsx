"use client";
import React from 'react';

const Thankfooter = () => {
  return (
    
    <footer className="bg-[#1e1e1e] text-[#e2e2e2] pt-16 max-[426px]:pt-6 pb-8 relative overflow-hidden">
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
      <div className="w-5 h-5 text-[#ea2629] mr-3 mt-1">
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
          <p className="text-base max-[425px]:text-[14px] opacity-70">© 2025 Adgro Hair Clinics. All rights reserved.</p>
          
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
        
      </div>
    </footer>
  );
};

export default Thankfooter;