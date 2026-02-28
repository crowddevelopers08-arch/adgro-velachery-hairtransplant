"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center bg-white overflow-hidden mt-[40px] py-8" style={{fontFamily: "'Outfit', sans-serif"}}>
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#f9f9f9]"></div>
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" 
            style={{
              backgroundImage: `
                linear-gradient(rgba(222, 34, 37, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(222, 34, 37, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#de2225] rounded-full opacity-20"
            initial={{ 
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh'
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.05, 0.2, 0.05]
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      
      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 max-[470px]:pb-[0px] lg:px-8 w-full z-10">
 

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content Section */}
          <motion.div 
            className="w-full text-center lg:text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Heading with Creative Layout */}
            <div className="relative mb-6 max-[470px]:mb-4 sm:mb-8">
              <motion.div 
                className="absolute -left-4 -top-4 w-3 h-3 bg-[#de2225] rounded-full hidden lg:block"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
              <motion.h1 
                className="text-[50px] max-[470px]:text-[30px] font-black text-[#de2225] leading-none tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                BALDNESS{" "}
                <motion.span 
                  className="text-gray-900"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  ENDS HERE
                </motion.span>
              </motion.h1>
              <motion.div 
                className="absolute -right-2 -bottom-2 w-2 h-2 bg-[#de2225] rounded-full hidden lg:block"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              />
            </div>

            {/* Subheading with Creative Design */}
            <motion.div 
              className="mb-8 max-[470px]:mb-6 sm:mb-10 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="bg-gradient-to-r from-transparent via-[#e22326]/10 to-transparent py-3 rounded-r-lg lg:mx-0 mx-auto max-w-md lg:max-w-none">
                <p className="text-xl text-center sm:text-2xl md:text-3xl text-gray-700 font-light">
                  Get your hairline back
                  <span className="block text-[#de2225] font-semibold">permanently.</span>
                </p>
              </div>
            </motion.div>
                   {/* Mobile: Image First */}
        <div className="lg:hidden w-full flex items-center justify-center mb-8">
          <motion.div 
            className="w-full flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-xs sm:max-w-sm">
              <motion.div 
                className="relative rounded-full overflow-hidden shadow-2xl border-4 border-gray-300 aspect-square"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-full h-full relative">
                  <Image
                    src="/ban6.jpg"
                    alt="Hair Transplant Results"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

            {/* Premium Pricing Card */}
            <motion.div 
              className="mb-8 sm:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <div className="bg-gradient-to-br from-gray-50 to-white backdrop-blur-lg border border-gray-200 rounded-2xl p-6 shadow-lg relative overflow-hidden lg:mx-0 mx-auto max-w-md lg:max-w-none">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#de2225] opacity-5 rounded-full -translate-y-16 translate-x-16"></div>
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                  <div className="text-center sm:text-left flex-1">
                    <span className="text-gray-600 text-lg font-medium block mb-2">One Time Investment</span>
                    <motion.span 
                      className="text-[#de2225] font-black text-4xl sm:text-5xl block tracking-tight"
                      animate={{ 
                        scale: [1, 1.02, 1],
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      ₹99,999/-
                    </motion.span>
                  </div>
                  
                  <div className="hidden sm:block w-0.5 h-16 bg-gradient-to-b from-red-300 to-red-400 rounded-full"></div>
                  
                  <div className="text-center sm:text-right flex-1">
                      <span className="text-gray-800 text-xl font-bold block">Hair Transplant</span>
                    <span className="text-gray-800 text-xl font-bold block">Unlimited Follicles</span>
                    <span className="text-red-600 text-base font-semibold bg-red-50 px-3 py-1 rounded-full mt-2 inline-block">
                     FDA-Approved Equipment
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Achievement Stats */}
            <motion.div 
              className="mb-8 sm:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-xs sm:max-w-md lg:max-w-none lg:grid-cols-2">
                  {[
                    { number: "500+", label: "Successful Transplants" },
                    { number: "8000+", label: "Happy Patients" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="bg-white backdrop-blur-sm border border-gray-200 rounded-xl p-4 sm:p-4 text-center shadow-sm flex flex-col items-center justify-center"
                      whileHover={{ scale: 1.05, borderColor: "#de2225" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-gray-900 font-bold text-xl sm:text-2xl lg:text-3xl mb-1 sm:mb-2">
                        {stat.number}
                      </div>
                      <div className="text-gray-600 text-sm sm:text-base font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <a href="#form">
                <motion.button 
                  className="relative bg-[#e22326] text-white font-bold py-4 px-8 rounded-full text-lg w-full sm:w-auto group overflow-hidden shadow-xl lg:mx-0 mx-auto lg:max-w-none max-w-md block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative z-10">Book Free Consultation</span>
                </motion.button>
              </a>
            </motion.div>
          </motion.div>

          {/* Desktop: Image on the Right */}
          <motion.div 
            className="hidden lg:flex w-full items-center justify-center lg:justify-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <motion.div 
                className="relative rounded-full overflow-hidden shadow-2xl border-4 border-gray-300 aspect-square"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-full h-full relative">
                  <Image
                    src="/ban6.jpg"
                    alt="Hair Transplant Results"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
    </section>
  );
};

export default Hero;