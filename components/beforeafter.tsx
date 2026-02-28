"use client";
// components/Education.tsx
import { motion } from 'framer-motion';

const Education = () => {
  const videos = [
    {
      title: "How a hair transplant works permanently",
      description: "Learn about the permanent nature of our hair transplant procedures"
    },
    {
      title: "Safety and recovery explained",
      description: "Understand our safety protocols and recovery process"
    },
    {
      title: "When to expect visible results",
      description: "Get realistic expectations about your transformation timeline"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Learn About Hair Transplants
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                Video Placeholder
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{video.title}</h3>
                <p className="text-gray-700">{video.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;