"use client"

import { useState, useEffect } from "react"
import { Phone, PhoneCall } from "lucide-react"

export function Thankheader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .shimmer-effect {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(234, 38, 41, 0.1),
            transparent
          );
          background-size: 200px 100%;
          animation: shimmer 2s infinite;
        }
        
        .glass-morphism {
          background: rgba(30, 30, 30, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(234, 38, 41, 0.1);
        }
        
        .phone-button {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #ea2629, #d61f22);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 15px rgba(234, 38, 41, 0.3);
          transition: all 0.3s ease;
        }
        
        .phone-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }
        
        .phone-button:hover::before {
          left: 100%;
        }
        
        .phone-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(234, 38, 41, 0.4);
        }
        
        .consultation-button {
          background: linear-gradient(135deg, #ea2629, #d61f22);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 15px rgba(234, 38, 41, 0.2);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .consultation-button::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        
        .consultation-button:hover::after {
          transform: translateX(100%);
        }
        
        .consultation-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(234, 38, 41, 0.3);
        }
      `}</style>
    
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled ? 'glass-morphism shadow-lg' : 'bg-[#1e1e1e]'
        }`}
        style={{fontFamily: "'Outfit', sans-serif"}}
      >
        {/* Animated top border */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#ea2629] to-transparent shimmer-effect"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-16' : 'h-20'
          }`}>
            {/* Logo */}
            <div className="flex-shrink-0">
              <img  
                className={`transition-all duration-300 ${
                  scrolled ? 'h-10' : 'h-12'
                }`}
                src="logo2.png" 
                alt="Company Logo" 
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Call button */}
              <a 
                href="tel:83908 56789" 
                className="phone-button flex items-center gap-1.5 justify-center text-white font-medium py-2 px-3 sm:py-2.5 sm:px-4 rounded-full text-sm sm:text-base"
              >
                 <PhoneCall className="w-4 h-4" />
                <span className="font-semibold">+91 83908 56789</span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}