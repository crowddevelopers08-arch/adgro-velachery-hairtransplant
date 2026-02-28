"use client"

import { useEffect, useRef, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"

const faqs = [
  {
    question: "Is it painful?",
    answer: "With advanced anaesthesia, the procedure is nearly pain-free.",
  },
  {
    question: "How long is the recovery period?",
    answer: "Most patients resume normal activities within a few days.",
  },
  {
    question: "Are the results permanent?",
    answer: "Yes. Transplanted hair grows naturally for a lifetime.",
  },
  {
    question: "How much does it cost?",
    answer: "At Adgro Velachery, the cost is a flat ₹99,999 with unlimited follicles included. No hidden charges.",
  },
]

export function FAQSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
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
    
      <section id="faq" ref={sectionRef} className="py-20 max-[426px]:py-5 lg:py-8 bg-white" style={{fontFamily: "'Outfit', sans-serif"}}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">

            {/* Header */}
            <motion.div 
              className="text-center max-[470px]:mb-6 mb-12"
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
              <h2 className="text-3xl max-[470px]:text-[30px] sm:text-4xl md:text-5xl lg:text-6xl font-bold max-[470px]:mb-0 mb-4">
                Frequently <span style={{ color: '#de2225' }}>Asked Questions</span> 
              </h2>
            </motion.div>

            {/* FAQ Accordion */}
            <div className={`${isVisible ? "animate-fade-in-up animation-delay-400" : "opacity-0"}`}>
              <Accordion type="single" collapsible className="space-y-6">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    style={{ 
                      backgroundColor: '#0f1524',
                      border: '2px solid #de2225'
                    }}
                    className="rounded-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <AccordionTrigger 
                      className="text-left max-[426px]:text-[18px] text-white hover:text-[#de2225] font-semibold text-lg py-6 px-6"
                    >
                      <span className="flex items-center">
                        <span 
                          className="w-8 h-8 rounded-full flex items-center justify-center mr-4 text-white text-sm font-bold"
                          style={{ backgroundColor: '#de2225' }}
                        >
                          {index + 1}
                        </span>
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent 
                      className="text-gray-300 max-[426px]:text-[16px] text-base leading-relaxed pb-6 px-6"
                    >
                      <div className="flex items-start">
                        <span 
                          className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                          style={{ backgroundColor: '#de2225' }}
                        ></span>
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Bottom CTA */}
            <motion.div 
              className="text-center max-[470px]:mt-6 mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
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
            </motion.div>
   

          </div>
        </div>
      </section>
    </>
  )
}