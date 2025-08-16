"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isUserExpanded, setIsUserExpanded] = useState(false) // Track user-initiated expansion
  const [lastScrollY, setLastScrollY] = useState(0) // Track scroll position for detecting scroll after expand

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrolled = currentScrollY > 50
      setIsScrolled(scrolled)
      
      // If user expanded navbar and then scrolls (any direction), collapse it
      if (isUserExpanded && Math.abs(currentScrollY - lastScrollY) > 10) {
        console.log('🔄 User scrolled after expanding, collapsing navbar')
        setIsExpanded(false)
        setIsUserExpanded(false)
      }
      
      // Reset user expansion flag when scrolling back to top
      if (!scrolled && isUserExpanded) {
        setIsUserExpanded(false)
        setIsExpanded(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isExpanded])

  const handleCircleClick = () => {
    console.log('🔵 Circle clicked! Current state - isScrolled:', isScrolled, 'isExpanded:', isExpanded)
    
    // Prevent double clicks
    if (isExpanded) {
      console.log('🔵 Already expanded, ignoring click')
      return
    }
    
    // Set both flags to indicate user-initiated expansion
    setIsExpanded(true)
    setIsUserExpanded(true)
    setLastScrollY(window.scrollY) // Record current scroll position
    console.log('🔵 Setting expanded to true (user-initiated), scroll position:', window.scrollY)
  }

  // Simple logic: if expanded, always show full navbar regardless of scroll
  const isCircleMode = isScrolled && !isExpanded
  const isFullNavMode = !isScrolled || isExpanded

  // Debug logging
  console.log('🔍 State check - isScrolled:', isScrolled, 'isExpanded:', isExpanded, 'isCircleMode:', isCircleMode, 'isFullNavMode:', isFullNavMode)

  // Compute offset per target id and breakpoint
  const getOffsetForId = (id: string) => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1200
    const isMd = w >= 768
    const isLg = w >= 1024
    switch (id) {
      case 'about':
        // Slightly higher landing (smaller offset)
        return isLg ? 120 : isMd ? 100 : 80
      case 'services':
      case 'calendar':
        return isLg ? 120 : isMd ? 100 : 88
      case 'home':
      default:
        return isLg ? 96 : isMd ? 88 : 80
    }
  }

  const scrollToHash = (hash: string) => {
    if (!hash.startsWith('#')) return
    const id = hash.slice(1)
    const el = document.getElementById(id)
    if (!el) return
    const rect = el.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const target = rect.top + scrollTop - getOffsetForId(id)
    window.history.replaceState(null, "", hash)
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  return (
    <div className={cn(
      "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
      className
    )}>
      <motion.div 
        className="relative bg-white/95 border border-purple-200 backdrop-blur-lg shadow-lg overflow-hidden ring-1 ring-purple-100 h-12 rounded-[24px]"
        initial={{
          borderRadius: "24px",
          width: "auto",
          height: "48px",
          minWidth: "auto",
        }}
        animate={{
          borderRadius: isCircleMode ? "50%" : "24px",
          width: isCircleMode ? "48px" : "auto",
          height: isCircleMode ? "48px" : "48px",
          minWidth: isCircleMode ? "48px" : "auto"
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 35,
          duration: 0.3
        }}
      >
        {/* Circle overlay - always in DOM, controlled by opacity */}
        <div 
          className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-purple-400/20 to-purple-600/10 flex items-center justify-center transition-all duration-500 ease-out"
          onClick={handleCircleClick}
          style={{ 
            zIndex: 10,
            opacity: isCircleMode ? 1 : 0,
            transform: `scale(${isCircleMode ? 1 : 0.9})`,
            pointerEvents: isCircleMode ? 'auto' : 'none',
            cursor: isCircleMode ? 'pointer' : 'default',
            willChange: 'opacity, transform'
          }}
        >
          <img 
            src="/logo.svg" 
            alt="Logo" 
            width="26" 
            height="26" 
            className="opacity-80"
          />
        </div>

        {/* Navigation items - always in DOM, controlled by opacity */}
        <div
          className="flex items-center justify-center gap-1 h-full transition-all duration-500 ease-out"
          style={{
            opacity: isFullNavMode ? 1 : 0,
            pointerEvents: isFullNavMode ? 'auto' : 'none',
            transform: isFullNavMode ? 'scale(1)' : 'scale(0.8)',
            willChange: 'opacity, transform'
          }}
        >
            {items.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.name

              return (
                <Link
                  key={item.name}
                  href={item.url}
                  onClick={(e) => {
                    setActiveTab(item.name)
                    if (item.url.startsWith('#')) {
                      e.preventDefault()
                      // Defer to ensure layout is stable before measuring
                      requestAnimationFrame(() => scrollToHash(item.url))
                    }
                  }}
                  className={cn(
                    "relative cursor-pointer text-sm font-semibold rounded-full transition-all duration-200 ease-out flex items-center justify-center px-6 py-3",
                    "text-purple-600/80 hover:text-purple-600 h-10",
                    isActive && "bg-purple-50 text-purple-600"
                  )}
                >
                  <span className="hidden md:inline whitespace-nowrap">
                    {item.name}
                  </span>
                  <span className="md:hidden">
                    <Icon size={18} strokeWidth={2.5} />
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="lamp"
                      className="absolute inset-0 w-full bg-purple-600/5 rounded-full -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      }}
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-purple-600 rounded-t-full">
                        <div className="absolute w-12 h-6 bg-purple-600/20 rounded-full blur-md -top-2 -left-2" />
                        <div className="absolute w-8 h-6 bg-purple-600/20 rounded-full blur-md -top-1" />
                        <div className="absolute w-4 h-4 bg-purple-600/20 rounded-full blur-sm top-0 left-2" />
                      </div>
                    </motion.div>
                  )}
                </Link>
              )
            })}
        </div>
      </motion.div>
    </div>
  )
}
