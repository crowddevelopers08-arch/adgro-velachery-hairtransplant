"use client";
import { motion } from 'framer-motion';
import { Users, Award, Star } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { 
      value: "8000+", 
      label: "satisfied patients", 
      icon: Users,
      color: "from-red-500 to-red-600"
    },
    { 
      value: "500+", 
      label: "successful transplants", 
      icon: Award,
      color: "from-gray-700 to-gray-800"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      
      <section className="py-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden" style={{fontFamily: "'Outfit', sans-serif"}}>
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-red-100 to-red-50 rounded-full opacity-20"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header */}
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
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
                Trusted by Thousands
                <motion.div 
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                ></motion.div>
              </span>
            </motion.h2>
            
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join thousands of satisfied patients who have transformed their lives with our expert care
            </motion.p>
          </motion.div>
          
          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div 
                  key={index}
                  className="relative group"
                  variants={itemVariants}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 text-center shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
                    <div className="flex items-center justify-center mb-6">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className={`text-5xl max-[470px]:text-[30px] font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-4`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-700 text-lg font-medium mb-4">{stat.label}</div>
                    <div className="flex justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current mx-1" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default StatsSection;