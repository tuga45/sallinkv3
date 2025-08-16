"use client"

import { Home, Briefcase, Info, CalendarDays } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

export function NavBarDemo() {
  const navItems = [
    { name: 'Home', url: '#home', icon: Home },
    { name: 'About', url: '#about', icon: Info },
    { name: 'Services', url: '#services', icon: Briefcase },
    { name: 'Calendar', url: '#calendar', icon: CalendarDays }
  ]

  return <NavBar items={navItems} />
}
