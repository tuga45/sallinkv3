'use client'

import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Menu, X } from 'lucide-react'
import TextType from './TextType'
import Particles from './particles'

interface NavigationItem {
  name: string
  href: string
}

interface AnnouncementBanner {
  text: string
  linkText: string
  linkHref: string
}

interface CallToAction {
  text: string
  href: string
  variant: 'primary' | 'secondary'
}

interface HeroLandingProps {
  // Logo and branding
  logo?: {
    src: string
    alt: string
    companyName: string
  }
  
  // Navigation
  navigation?: NavigationItem[]
  loginText?: string
  loginHref?: string
  
  // Hero content
  title: string
  description: string
  heroImage?: string
  announcementBanner?: AnnouncementBanner
  callToActions?: CallToAction[]
  
  // Styling options
  titleSize?: 'small' | 'medium' | 'large'
  gradientColors?: {
    from: string
    to: string
  }
  
  // Additional customization
  className?: string
}

const defaultProps: Partial<HeroLandingProps> = {
  logo: {
    src: "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600",
    alt: "Company Logo",
    companyName: "Your Company"
  },
  titleSize: "large",
  gradientColors: {
    from: "oklch(0.646 0.222 41.116)",
    to: "oklch(0.488 0.243 264.376)"
  }
}

export function HeroLanding(props: HeroLandingProps) {
  const {
    logo,
    navigation,
    loginText,
    loginHref,
    title,
    description,
    heroImage,
    announcementBanner,
    callToActions,
    titleSize,
    gradientColors,
    className
  } = { ...defaultProps, ...props }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const getTitleSizeClasses = () => {
    switch (titleSize) {
      case 'small':
        return 'text-2xl sm:text-3xl md:text-5xl'
      case 'medium':
        return 'text-2xl sm:text-4xl md:text-6xl'
      case 'large':
      default:
        return 'text-3xl sm:text-5xl md:text-7xl'
    }
  }

  const renderCallToAction = (cta: CallToAction, index: number) => {
    if (cta.variant === 'primary') {
      return (
        <a
          key={index}
          href={cta.href}
          className="rounded-lg bg-primary px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-colors"
        >
          {cta.text}
        </a>
      )
    } else {
      return (
        <a
          key={index}
          href={cta.href}
          className="text-xs sm:text-sm/6 font-semibold text-foreground hover:text-muted-foreground transition-colors"
        >
          {cta.text} <span aria-hidden="true">→</span>
        </a>
      )
    }
  }

  return (
    <div className={`min-h-screen w-screen overflow-x-hidden relative ${className || ''}`}>

      {(navigation && navigation.length > 0) || (loginText && loginHref) ? (
        <header className="absolute inset-x-0 top-0 z-1">
          <nav aria-label="Global" className="flex items-center justify-between p-4 sm:p-6 lg:px-8">
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">{logo?.companyName}</span>
                <img
                  alt={logo?.alt}
                  src={logo?.src}
                  className="h-6 sm:h-8 w-auto"
                />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="sr-only">Open main menu</span>
                <Menu aria-hidden="true" className="size-6" />
              </button>
            </div>
            {navigation && navigation.length > 0 && (
              <div className="hidden lg:flex lg:gap-x-8 xl:gap-x-12">
                {navigation.map((item) => (
                  <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-foreground hover:text-muted-foreground transition-colors">
                    {item.name}
                  </a>
                ))}
              </div>
            )}
            {loginText && loginHref && (
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <a href={loginHref} className="text-sm/6 font-semibold text-foreground hover:text-muted-foreground transition-colors">
                  {loginText} <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            )}
          </nav>
          <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DialogContent className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-card px-4 py-4 sm:px-6 sm:py-6 sm:max-w-sm sm:ring-1 sm:ring-border lg:hidden">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">{logo?.companyName}</span>
                  <img
                    alt={logo?.alt}
                    src={logo?.src}
                    className="h-6 sm:h-8 w-auto"
                  />
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="sr-only">Close menu</span>
                  <X aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-2 flow-root">
                <div className="-my-6 divide-y divide-border">
                  {navigation && navigation.length > 0 && (
                    <div className="space-y-2 py-6">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  )}
                  {loginText && loginHref && (
                    <div className="py-6">
                      <a
                        href={loginHref}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        {loginText}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </header>
      ) : null}

      <div className="relative isolate px-6 pt-4 overflow-hidden min-h-screen flex flex-col justify-center">        
        <Particles className="pointer-events-none absolute inset-0 -z-10 opacity-40" quantity={120} color="#8b5cf6" size={0.8} ease={30} staticity={60} />
        <div className="mx-auto max-w-4xl pt-20 sm:pt-25">
          <div className="text-center">
            {/* Announcement banner - above logo */}
            {announcementBanner && announcementBanner.text && (
              <div className="mb-6 sm:mb-8 flex justify-center">
                <div className="relative rounded-full px-2 py-1 text-xs sm:px-3 sm:text-sm/6 bg-white text-purple-600 ring-1 ring-white hover:ring-gray-200 transition-all animate-pulse" style={{
                  animation: 'breathe 3s ease-in-out infinite'
                }}>
                  {announcementBanner.text}
                </div>
              </div>
            )}

            {/* Hero Image */}
            {heroImage && (
              <div className="flex justify-center mb-6 sm:mb-8 md:mb-10">
                <img 
                  src={heroImage} 
                  alt="Company Logo" 
                  className="w-[366.5px] h-[70.4px] sm:w-[549.75px] sm:h-[105.6px] md:w-[732px] md:h-[140.8px] lg:w-[915px] lg:h-[176px] object-contain"
                />
              </div>
            )}
            
            {/* Title - only show if not empty */}
            {title && title.trim() && (
              <h1 className={`${getTitleSizeClasses()} font-semibold tracking-tight text-balance text-foreground mb-6 sm:mb-8`}>
                {title}
              </h1>
            )}
            
            {/* Description - closer spacing */}
            {description && (
              <div className="text-base sm:text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8 max-w-4xl mx-auto">
                <TextType 
                  text={[description]}
                  typingSpeed={15}
                  pauseDuration={500}
                  showCursor={true}
                  cursorCharacter="|"
                  loop={false}
                  className="text-base sm:text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8"
                />
              </div>
            )}
            
            {/* Call to action buttons */}
            {callToActions && callToActions.length > 0 && (
              <div className="mt-8 sm:mt-10 flex items-center justify-center gap-x-4 sm:gap-x-6">
                {callToActions.map((cta, index) => renderCallToAction(cta, index))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Export types for consumers
export type { HeroLandingProps, NavigationItem, AnnouncementBanner, CallToAction }