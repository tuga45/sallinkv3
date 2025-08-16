'use client'

import { ArrowRight, Zap, Star } from 'lucide-react'

interface CTAProps {
  title?: string
  subtitle?: string
  primaryButton?: {
    text: string
    href: string
  }
  secondaryButton?: {
    text: string
    href: string
  }
  features?: string[]
  className?: string
}

export function CTA({ 
  title = "Ready to Transform Your Business?",
  subtitle = "Join thousands of companies already using our AI solutions to drive growth and innovation.",
  primaryButton = {
    text: "Get Started Free",
    href: "/signup"
  },
  secondaryButton = {
    text: "Schedule Demo",
    href: "/demo"
  },
  features = [
    "No credit card required",
    "14-day free trial",
    "Cancel anytime"
  ],
  className = ""
}: CTAProps) {
  return (
    <section className={`py-24 px-6 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Background Gradient */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl blur-3xl" />
          <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-12 text-center">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium text-muted-foreground">
                  Trusted by 10,000+ companies
                </span>
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
                {title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            </div>

            {/* Features */}
            {features && features.length > 0 && (
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={primaryButton.href}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {primaryButton.text}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              {secondaryButton && (
                <a
                  href={secondaryButton.href}
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-foreground border-2 border-border rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                >
                  {secondaryButton.text}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>99.9% Uptime</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span>GDPR Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export type { CTAProps } 