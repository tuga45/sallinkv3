'use client'

import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar?: string
}

interface TestimonialsProps {
  title?: string
  subtitle?: string
  testimonials: Testimonial[]
  className?: string
}

export function Testimonials({ 
  title = "What Our Clients Say",
  subtitle = "Discover how AI is transforming businesses across industries",
  testimonials: propTestimonials,
  className = ""
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Default testimonials data
  const defaultTestimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CTO",
      company: "TechFlow Inc",
      content: "The AI analytics platform has completely transformed how we make decisions. We've seen a 40% improvement in our operational efficiency.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Head of Operations",
      company: "Global Retail",
      content: "The automation features have saved us countless hours. Our team can now focus on strategic initiatives instead of repetitive tasks.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Data Scientist",
      company: "InnovateCorp",
      content: "The predictive analytics capabilities are incredible. We're now able to anticipate market changes before they happen.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "David Kim",
      role: "CEO",
      company: "StartupXYZ",
      content: "This AI platform has been a game-changer for our startup. We've scaled our operations 10x without proportional cost increases.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const testimonials = useMemo(() => propTestimonials || defaultTestimonials, [propTestimonials])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500'
        }`}
      />
    ))
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }

  // Autoplay with pause on hover
  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(id)
  }, [isPaused, testimonials.length])

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextTestimonial()
      if (e.key === 'ArrowLeft') prevTestimonial()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [testimonials.length])

  return (
    <section className={`py-24 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Testimonial Card */}
          <div
            className="relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.15]">
              <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary blur-3xl" />
              <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-fuchsia-500 blur-3xl" />
            </div>

            <Quote className="absolute top-6 left-8 w-8 h-8 text-primary/30" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <div className="text-center">
                  {/* Rating */}
                  <div className="flex justify-center mb-6">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>

                  {/* Content */}
                  <blockquote className="text-lg md:text-xl text-foreground mb-8 leading-relaxed">
                    "{testimonials[currentIndex].content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center justify-center space-x-4">
                    {/* Avatar as initials to avoid external images */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-fuchsia-600 flex items-center justify-center text-white font-semibold">
                      {getInitials(testimonials[currentIndex].name)}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-foreground">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            <div className="mt-8">
              <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                <motion.div
                  key={`progress-${currentIndex}-${isPaused}`}
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: isPaused ? 0 : '100%' }}
                  transition={{ duration: isPaused ? 0 : 5, ease: 'linear' }}
                />
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((t, index) => (
              <button
                key={t.id ?? index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary w-6'
                    : 'bg-border hover:bg-muted-foreground w-2'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export type { TestimonialsProps, Testimonial }