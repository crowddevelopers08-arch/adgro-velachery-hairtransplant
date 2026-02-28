"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"

const videoTestimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    treatment: "Hair Transplant",
    rating: 5,
    videoUrl: "/hair-transplant-testimonial.png",
    thumbnail: "/confident-woman-hair-transplant.png",
    duration: "2:15",
    location: "Bangalore",
  },
  // {
  //   id: 2,
  //   name: "Rajesh Kumar",
  //   treatment: "Botox Treatment",
  //   rating: 5,
  //   videoUrl: "/botox-testimonial-man.png",
  //   thumbnail: "/refreshed-man-botox.png",
  //   duration: "1:45",
  //   location: "Bangalore",
  // },
  {
    id: 3,
    name: "Anita Reddy",
    treatment: "Melasma Treatment",
    rating: 5,
    videoUrl: "/melasma-laser-testimonial.png",
    thumbnail: "/glowing-skin-after-melasma.png",
    duration: "3:20",
    location: "Bangalore",
  },
  {
    id: 4,
    name: "Vikram Patel",
    treatment: "Carbon Laser Facial",
    rating: 5,
    videoUrl: "/man-carbon-laser-testimonial.png",
    thumbnail: "/glowing-skin-man.png",
    duration: "2:30",
    location: "Bangalore",
  },
]

interface VideoPlayerProps {
  testimonial: (typeof videoTestimonials)[0]
  isActive: boolean
  onClose: () => void
}

function VideoPlayer({ testimonial, isActive, onClose }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(progress)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const width = rect.width
      const clickTime = (clickX / width) * videoRef.current.duration
      videoRef.current.currentTime = clickTime
    }
  }

  if (!isActive) return null

  return (
    <>
       <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"style={{fontFamily: "'Outfit', sans-serif"}}>
      <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
        {/* Video */}
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            poster={testimonial.thumbnail}
          >
            <source src={testimonial.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Video Controls Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-6">
              {/* Progress Bar */}
              <div className="w-full h-2 bg-white/20 rounded-full mb-4 cursor-pointer" onClick={handleProgressClick}>
                <div
                  className="h-full bg-[#d09a40] rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={togglePlay}
                    className="text-white hover:text-[#d09a40] hover:bg-white/10"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMute}
                    className="text-white hover:text-[#d09a40] hover:bg-white/10"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>
                  <span className="text-white text-sm">{testimonial.duration}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:text-[#d09a40] hover:bg-white/10"
                >
                  ✕
                </Button>
              </div>
            </div>
          </div>

          {/* Play Button Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                onClick={togglePlay}
                className="w-20 h-20 rounded-full bg-[#d09a40] hover:bg-[#d09a40]/90 text-black shadow-2xl transform hover:scale-110 transition-all duration-300"
              >
                <Play className="w-8 h-8 ml-1" />
              </Button>
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="p-6 bg-black">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{testimonial.name}</h3>
              <p className="text-[#d09a40] font-medium mb-2">{testimonial.treatment}</p>
              <p className="text-gray-400 text-sm">{testimonial.location}</p>
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#d09a40] text-[#d09a40]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export function VideoTestimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeVideo, setActiveVideo] = useState<number | null>(null)
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
      <section
        id="video-testimonials"
        ref={sectionRef}
        className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 font-sans ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              Real <span className="text-[#d09a40]">Transformations</span> in Motion
            </h2>
            <p
              className={`text-xl text-gray-600 max-w-2xl mx-auto ${
                isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"
              }`}
            >
              Watch our patients share their authentic experiences and remarkable results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videoTestimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className={`group cursor-pointer bg-white border-2 border-gray-100 hover:border-[#d09a40]/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
                  isVisible ? `animate-fade-in-up animation-delay-${(index + 1) * 200}` : "opacity-0"
                }`}
                onClick={() => setActiveVideo(testimonial.id)}
              >
                <CardContent className="p-0">
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={testimonial.thumbnail || "/placeholder.svg"}
                      alt={`${testimonial.name} testimonial`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-[#d09a40] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 text-black ml-1" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
                      {testimonial.duration}
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-black mb-2 font-sans group-hover:text-[#d09a40] transition-colors duration-300">
                          {testimonial.name}
                        </h4>
                        <p className="text-[#d09a40] font-medium mb-1">{testimonial.treatment}</p>
                        <p className="text-gray-500 text-sm">{testimonial.location}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#d09a40] text-[#d09a40]" />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm">Click to watch full testimonial</span>
                      <Maximize className="w-4 h-4 text-gray-400 group-hover:text-[#d09a40] transition-colors duration-300" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className={`text-center mt-16 ${isVisible ? "animate-fade-in-up animation-delay-800" : "opacity-0"}`}>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-2">
                <Star className="w-6 h-6 fill-[#d09a40] text-[#d09a40]" />
                <span className="text-2xl font-bold text-black">4.9/5</span>
                <span className="text-gray-600">Google Reviews</span>
              </div>
              <div className="text-gray-600">
                <span className="font-bold text-black">500+</span> Video Testimonials
              </div>
              <div className="text-gray-600">
                <span className="font-bold text-black">98%</span> Patient Satisfaction
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Player Modal */}
      {activeVideo && (
        <VideoPlayer
          testimonial={videoTestimonials.find((t) => t.id === activeVideo)!}
          isActive={!!activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </>
  )
}
