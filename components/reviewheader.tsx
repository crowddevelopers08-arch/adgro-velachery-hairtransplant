"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from "lucide-react"

export function ReviewHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isConsultationOpen, setIsConsultationOpen] = useState(false)

  return (
    <>
     <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
    
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-primary/20"style={{fontFamily: "'Outfit', sans-serif"}}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
             <img  className="w-[200px] h-[60px] max-[768px]:w-[150px] max-[768px]:h-[50px] max-[480px]:w-[120px] max-[480px]:h-[40px]" src="bglogo.png" alt="logo" />
            </div>

            {/* Desktop Navigation */}
            {/* <nav className="hidden lg:flex items-center space-x-8">
              <a href="#about" className="text-white hover:text-primary transition-colors duration-300">
                About
              </a>
              <a href="#treatments" className="text-white hover:text-primary transition-colors duration-300">
                Treatments
              </a>
              <a href="#doctor" className="text-white hover:text-primary transition-colors duration-300">
                Doctor
              </a>
              <a href="#testimonials" className="text-white hover:text-primary transition-colors duration-300">
                Reviews
              </a>
              <a href="#faq" className="text-white hover:text-primary transition-colors duration-300">
                FAQ
              </a>
            </nav> */}

            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Call button for mobile */}
              <a 
                    href="tel:9606601166" 
                    className="flex items-center max-[480px]:p-[5px] justify-center bg-primary hover:bg-primary/90 text-black font-medium py-1 px-4 rounded-md transition-colors"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="font-semibold text-[20px] max-[480px]:text-[10px]">+91 9606601166</span>
                  </a>
              {/* <Button
                onClick={() => setIsConsultationOpen(true)}
                className="hidden sm:flex items-center space-x-2 bg-primary hover:bg-primary/90 text-black font-medium"
              >
                <Phone className="w-4 h-4" />
                <span className="font-semibold text-[20px]">Book Consultation</span>
              </Button> */}

              {/* Mobile Menu Button */}
              {/* <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-white hover:text-primary transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button> */}
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden bg-black/95 border-t border-primary/20 animate-fade-in-up">
              <nav className="px-4 py-6 space-y-4">
                <a href="#about" className="block text-white hover:text-primary transition-colors">
                  About
                </a>
                <a href="#treatments" className="block text-white hover:text-primary transition-colors">
                  Treatments
                </a>
                <a href="#doctor" className="block text-white hover:text-primary transition-colors">
                  Doctor
                </a>
                <a href="#testimonials" className="block text-white hover:text-primary transition-colors">
                  Reviews
                </a>
                <a href="#faq" className="block text-white hover:text-primary transition-colors">
                  FAQ
                </a>
                
                {/* Call section for mobile */}
                <div className="pt-4 border-t border-gray-700">
                  <a href="tel:+9606601166" className="flex items-center justify-center text-white hover:text-primary transition-colors py-2">
                    <Phone className="w-5 h-5 mr-2" />
                    <span className="font-medium">+91 9606601166</span>
                  </a>
                </div>
                
                <Button
                  onClick={() => setIsConsultationOpen(true)}
                  className="w-full mt-4 bg-primary hover:bg-primary/90 text-black font-medium"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Book Consultation
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

    </>
  )
}