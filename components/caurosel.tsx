"use client";
// components/FinalCTA.tsx
import { motion } from 'framer-motion';

const FinalCTA = () => {
  return (
    <>
     <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
    <section className="py-16 max-[470px]:py-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white"style={{fontFamily: "'Outfit', sans-serif"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
         Get your natural hairline back today
        </motion.h2>
        
        <a href="#form">
        <motion.button 
          className="bg-[#e52427] cursor-pointer max-[420px]:p-[15px] hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          Book Free Consultation Now
        </motion.button>
        </a>
      </div>
    </section>
    </>
  );
};

export default FinalCTA;