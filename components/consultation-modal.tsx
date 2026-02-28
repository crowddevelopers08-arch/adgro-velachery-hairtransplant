"use client";
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { MapPin, Navigation, Car, X } from 'lucide-react';
import { FaWalking } from 'react-icons/fa';

const CombinedSection = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    concern: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Map state
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [showDirections, setShowDirections] = useState(false);
  const [travelMode, setTravelMode] = useState<'driving' | 'walking'>('driving');

  // Intersection observer for map animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-zoom-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (mapContainerRef.current) {
      observer.observe(mapContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Form handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    
    try {
      // Get current page URL for source tracking
      const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
      
      const response = await fetch('/api/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          pageUrl: currentUrl, // Store the live URL in pageUrl field
          source: currentUrl, // Also store in source for backward compatibility
          formName: 'Website leads',
          consent: true,
          treatment: formData.concern, // Map concern to treatment
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your consultation request has been submitted successfully.'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          concern: ''
        });
        
        // Optional: Redirect after delay
        setTimeout(() => {
          window.location.href = '/thank-you';
        }, 2000);
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'There was an error submitting the form. Please try again.'
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'There was an error submitting the form. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Directions link
  const directionsLink = travelMode === 'driving' 
    ? 'https://www.google.com/maps/dir/?api=1&destination=Second+Floor+Block+No.20+Sankaran+Avenue+Plot+No.31+Pandian+St+Indira+Gandhi+Nagar+Velachery+Chennai+600042'
    : 'https://www.google.com/maps/dir/?api=1&destination=Second+Floor+Block+No.20+Sankaran+Avenue+Plot+No.31+Pandian+St+Indira+Gandhi+Nagar+Velachery+Chennai+600042&travelmode=walking';

  return (
    <>
      <section className="py-16 max-[470px]:py-6 bg-gray-50" style={{fontFamily: "'Outfit', sans-serif"}}>
        <div className="max-w-7xl mx-auto px-4 max-[470px]:px-2 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-gray-900 relative"
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
              Begin Your <span className='text-[#de2225]'>Hair Transformation</span>
            </span>
          </motion.h2>
          
          {/* Status Message */}
          {submitStatus.type && (
            <motion.div 
              className={`mb-6 p-4 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <p className="text-center font-medium">{submitStatus.message}</p>
            </motion.div>
          )}
          
          {/* Updated container with equal height columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 max-[420px]:gap-5 gap-10 items-stretch min-h-[500px]">
            {/* Form Column - Updated to full height */}
            <motion.div 
              className="bg-[#1d2837] p-8 rounded-lg shadow-lg border border-[#de2225]/20 h-full flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                <div className="mb-6">
                  <label htmlFor="name" className="block text-white mb-2 font-medium">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#2d3748] border border-[#4a5568] rounded-md focus:outline-none focus:ring-2 focus:ring-[#de2225] focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                    required
                    disabled={isSubmitting}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-white mb-2 font-medium">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#2d3748] border border-[#4a5568] rounded-md focus:outline-none focus:ring-2 focus:ring-[#de2225] focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                    required
                    disabled={isSubmitting}
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-white mb-2 font-medium">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#2d3748] border border-[#4a5568] rounded-md focus:outline-none focus:ring-2 focus:ring-[#de2225] focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                    required
                    disabled={isSubmitting}
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div className="mb-8">
                  <label htmlFor="concern" className="block text-white mb-2 font-medium">Concern</label>
                  <select
                    id="concern"
                    name="concern"
                    value={formData.concern}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#2d3748] border border-[#4a5568] rounded-md focus:outline-none focus:ring-2 focus:ring-[#de2225] focus:border-transparent text-white appearance-none transition-all duration-200"
                    required
                    disabled={isSubmitting}
                  >
                    <option value="" className="text-gray-400">Select your concern</option>
                    <option value="Baldness" className="text-white">Baldness</option>
                    <option value="Hair Thinning" className="text-white">Hair Thinning</option>
                    <option value="Receding Hairline" className="text-white">Receding Hairline</option>
                    <option value="Hair Loss" className="text-white">Hair Loss</option>
                  </select>
                </div>
                
                {/* Spacer to push button to bottom */}
                <div className="flex-1"></div>
                <motion.button 
                  type="submit"
                  className={`bg-[#e52427] max-[326px]:text-[14px] cursor-pointer max-[420px]:p-[15px] hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Book Free Consultation Now'
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Map Column - Updated to full height */}
            <motion.div 
              className="relative max-[470px]:h-[350px] h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div 
                ref={mapContainerRef}
                className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-white transform scale-95 opacity-0 transition-all duration-700 h-full"
              >
                {/* Pulsing border animation */}
                <div className="absolute inset-0 border-[10px] border-green-500/20 rounded-xl pointer-events-none animate-pulse-slow"></div>
                
                {/* Main map iframe */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d118251.23047894276!2d80.13637144388512!3d12.99028332128985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3a525dc933691317%3A0xa1bc4b988911d47d!2sSecond%20Floor%20Block%20No.20%2C%20Sankaran%20Avenue%2C%20Plot%20No.31%2C%20Pandian%20St%2C%20Indira%20Gandhi%20Nagar%2C%20Velachery%2C%20Chennai%2C%20Tamil%20Nadu%20600042!3m2!1d12.990296299999999!2d80.2187733!5e1!3m2!1sen!2sin!4v1759732848569!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="relative z-10 min-h-[450px]"
                  aria-label="Addgrow Hair Clinic Location"
                ></iframe>
                
                {/* Animated location pin */}
                <div className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-full">
                  <div className="animate-bounce-slow">
                    <div className="bg-blue-500 p-2 rounded-full shadow-lg">
                      <MapPin className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                </div>

                {/* Clinic badge */}
                <div className="absolute bottom-4 left-4 z-20 bg-white/90 px-3 py-1.5 rounded-full shadow-md max-w-[90%]">
                  <div className="flex items-center space-x-2 truncate">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="text-blue-500 font-medium text-sm truncate">Addgrow Hair Clinic</span>
                  </div>
                </div>
                
                <a href="https://maps.app.goo.gl/DcdQt7ufXGpCheyv6" target="_blank" rel="noopener noreferrer">
                  {/* Directions button */}
                  <button 
                    className="absolute bottom-4 right-4 z-20 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-2 transition-all text-sm"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Directions</span>
                  </button>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Directions Panel */}
          {showDirections && (
            <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                  <h3 className="text-xl font-bold text-blue-600 flex items-center">
                    <Navigation className="w-5 h-5 mr-2" />
                    Directions
                  </h3>
                  <button 
                    onClick={() => setShowDirections(false)}
                    className="text-gray-500 hover:text-gray-700 p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="font-semibold text-lg mb-3 text-gray-800">Get Directions:</h4>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <button
                        onClick={() => setTravelMode('driving')}
                        className={`flex items-center justify-center p-3 rounded-lg ${
                          travelMode === 'driving' 
                            ? 'bg-blue-100 text-blue-600 border border-blue-200' 
                            : 'bg-gray-50 text-gray-600 border border-gray-200'
                        }`}
                      >
                        <Car className="w-5 h-5 mr-2" />
                        <span>By Car</span>
                      </button>
                      <button
                        onClick={() => setTravelMode('walking')}
                        className={`flex items-center justify-center p-3 rounded-lg ${
                          travelMode === 'walking' 
                            ? 'bg-blue-100 text-blue-600 border border-blue-200' 
                            : 'bg-gray-50 text-gray-600 border border-gray-200'
                        }`}
                      >
                        <FaWalking className="w-5 h-5 mr-2" />
                        <span>Walking</span>
                      </button>
                    </div>
                    
                    <a
                      href={directionsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg shadow-md transition-colors"
                    >
                      <Navigation className="w-5 h-5 mr-2" />
                      Open in Google Maps
                    </a>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-blue-700 mb-2">Nearby Landmarks:</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Indira Gandhi Nagar
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Velachery Railway Station
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Phoenix Market City
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
          `}</style>

          <style jsx>{`
            .animate-zoom-in {
              animation: zoomIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            }
            @keyframes zoomIn {
              0% {
                transform: scale(0.95);
                opacity: 0;
              }
              100% {
                transform: scale(1);
                opacity: 1;
              }
            }
            .animate-pulse-slow {
              animation: pulse 6s infinite;
            }
            @keyframes pulse {
              0%, 100% {
                opacity: 0.2;
              }
              50% {
                opacity: 0.4;
              }
            }
            .animate-bounce-slow {
              animation: bounce 3s infinite;
            }
            @keyframes bounce {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-10px);
              }
            }
            .animate-fade-in {
              animation: fadeIn 0.2s ease-out forwards;
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          `}</style>
        </div>
      </section>
    </>
  );
};

export default CombinedSection;