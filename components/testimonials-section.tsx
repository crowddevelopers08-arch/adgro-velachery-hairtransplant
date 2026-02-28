"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Joshetty1993 Santhosh",
    treatment: "Hair Transplant",
    rating: 5,
    text: "Happy with the treatment with  Dr.Priyanka. Very calm, well educated, patiently treated and the problem what we are suffering with, and even staff are very good with enough patience and they follow up us time to time correctly.",
    image: "newsvcg.jpg?height=80&width=80",
  },
  {
    name: "Durga Prasad",
    treatment: "Skin Rejuvenation Treatment",
    rating: 5,
    text: "I have seen many hospitals but It's such an amazing clinic and staffs are very well trained and there is a quick response for patient's....and there is no words to explain about Sculpt The Maxillofacial Clinic, if there is any Skin issues, i suggest everyone to visit the Sculpt The Maxillofacial Clinic.",
    image: "newsvcg.jpg?height=80&width=80",
  },
  {
    name: "Annapoorneshwari",
    treatment: "Melasma Treatment",
    rating: 5,
    text: "I got my cosmelan and iv glutathione treatment done from Sculpt The Maxillofacial Clinic and and I am extremely happy with the results.Dr Priyanka Raj and her staff are so good that they explain all the steps of the procedure in detail.I will surely recommend Sculpt The Maxillofacial Clinic to all my friends and relatives.Thank you",
    image: "newsvcg.jpg?height=80&width=80",
  },
  {
    name: "V.Aishwarya",
    treatment: "Carbon Laser Facial",
    rating: 5,
    text: "It's such an amazing clinic I had really tried many hospital and creams to cure my acne but finally sculpt gave me a solution I am so happy for itSuch an amazing and   friendly environment tooAlways quick responsers",
    image: "newsvcg.jpg?height=80&width=80",
  },
]

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <>
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
    
    
    <section id="testimonials" ref={sectionRef} className="py-20 max-[426px]:py-5 lg:py-10 bg-white"style={{fontFamily: "'Outfit', sans-serif"}}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-[426px]:mb-8 mb-16">
          <h2
            className={`text-3xl max-[426px]:text-[22px] max-[426px]:mb-3 sm:text-4xl lg:text-5xl font-bold text-black mb-6 font-sans ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            The <span style={{color:"#c99500"}} className="text-primary">Transformation</span> Tales
          </h2>
          <p
            className={`text-xl max-[426px]:text-[16px] text-gray-600 max-w-2xl mx-auto ${
              isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"
            }`}
          >
            Real stories from real patients who trusted us with their beauty journeys
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className={`bg-gradient-to-br from-black to-black/90 border-primary/20 hover:border-primary/40 transition-all duration-500 transform hover:scale-105 ${
                isVisible ? `animate-fade-in-up animation-delay-${(index + 1) * 200}` : "opacity-0"
              }`}
            >
              <CardContent className="p-8 max-[426px]:p-4">
                <div className="flex items-start space-x-4 mb-6">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
                  />
                  <div className="flex-1">
                    <h4 className="text-xl max-[426px]:text-[16px] font-bold text-white mb-1 font-sans">{testimonial.name}</h4>
                    <p className="text-primary text-sm font-medium mb-2">{testimonial.treatment}</p>
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <Quote className="w-8 h-8 text-primary/30 flex-shrink-0" />
                </div>

                <p className="text-gray-300 max-[426px]:text-[16px] leading-relaxed italic">"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Google Reviews Badge */}
        <div className={`text-center mt-16 max-[426px]:mt-8 ${isVisible ? "animate-fade-in-up animation-delay-800" : "opacity-0"}`}>
          <div className="inline-flex items-center space-x-4 bg-black/5 rounded-full px-8 py-4">
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 fill-primary text-primary" />
              <span className="text-2xl max-[426px]:text-[22px] font-bold text-black">4.9/5</span>
            </div>
            <div className="text-gray-600">
              <p className="font-medium max-[426px]:text-[16px]">Based on 100+ Google Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
