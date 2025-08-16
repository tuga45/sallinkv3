import { HeroLanding } from "@/components/ui/hero-1";
import type { HeroLandingProps } from "@/components/ui/hero-1";
import { Services } from "@/components/ui/services";
import { TestimonialsColumns } from "@/components/ui/testimonials-columns";
import { CTA } from "@/components/ui/cta";
import { GlobalBackground } from "@/components/ui/global-background";
import { NavBarDemo } from "@/components/ui/navbar-demo";
import { Footer } from "@/components/ui/footer-section";
import { Calendar } from "@/components/ui/calendar";
import { Globe } from "@/components/ui/globe";
import { AnimatedBeamDemo } from "@/components/ui/animated-beam-demo";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { AnimatedCard3Demo } from "@/components/ui/animated-card-chart";
import { AnimatedCard2Demo } from "@/components/ui/animated-card-diagram";
import { AnimatedCard1Demo } from "@/components/ui/animated-card";
import BlurText from "@/components/ui/BlurText";

export default function Home() {
  // AI Company hero configuration
  const heroProps: HeroLandingProps = {
    // Logo and branding
    logo: {
      src: "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=violet&shade=500",
      alt: "AI Company Logo",
      companyName: "AI Company"
    },
    
    // Hero content
    title: "",
    description: "Revolutionize your business with our cutting-edge artificial intelligence solutions. Automate tasks, gain insights, and scale your operations with intelligent automation.",
    heroImage: "/logo branco sal.png",
    
    // Announcement banner
    announcementBanner: {
      text: "Now taking 2 more clients in Q3",
      linkText: "",
      linkHref: ""
    },
    
    // Styling options
    titleSize: "large",
    gradientColors: {
      from: "oklch(0.7 0.15 280)", // Purple
      to: "oklch(0.6 0.2 320)"    // Magenta
    },
    
    // Additional customization - stretch to full page height
    className: "min-h-screen"
  }

  return (
    <main className="relative">
      {/* Navigation Bar */}
      <NavBarDemo />
      
      {/* Global Background */}
      <GlobalBackground gradientColors={heroProps.gradientColors} />
      
      {/* Hero Section */}
      <section id="home" className="scroll-mt-24">
        <HeroLanding {...heroProps} />
      </section>
      
      {/* ScrollReveal Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal 
              baseOpacity={0}
              enableBlur={true}
              baseRotation={5}
              blurStrength={16}
              rotationEnd="+=300%"
              wordAnimationEnd="+=300%"
              pin={true}
              pinEnd="+=300%"
              textClassName="text-white"
            >
              From strategy to execution, our AI connects your tools, automates workflows, and surfaces real-time insights — so every decision is faster, smarter, and scalable.
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Animated Beam + Cards Section (About anchor) */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          {/* Cards moved above the beam */}
          <div id="about" className="flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-12 mb-24 lg:mb-32">
            <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-purple-200 bg-white p-6 shadow-sm ring-1 ring-purple-100 md:p-6">
              <AnimatedCard1Demo />
            </div>
            <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-purple-200 bg-white p-6 shadow-sm ring-1 ring-purple-100 md:p-6">
              <AnimatedCard2Demo />
            </div>
            <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-purple-200 bg-white p-6 shadow-sm ring-1 ring-purple-100 md:p-6">
              <AnimatedCard3Demo />
            </div>
          </div>
          {/* Beam with title to the right on md+ */}
          <div className="mx-auto max-w-[1240px] w-full flex flex-col items-center justify-center md:flex-row md:items-center md:justify-center gap-14 lg:gap-24">
            <div className="w-full md:w-[560px] flex justify-center">
              <AnimatedBeamDemo />
            </div>
            <div className="w-full md:w-[560px] text-center md:text-left">
              <BlurText
                text={"Don't\u00A0worry\u00A0about\u00A0change...\nAt\u00A0Sallink\u00A0we\u00A0make solutions that adapt to your business today, tomorrow, and beyond."}
                delay={150}
                animateBy="words"
                direction="top"
                className="text-3xl lg:text-4xl font-bold mb-0 text-white leading-10 lg:leading-relaxed whitespace-pre-line"
              />
            </div>
          </div>

          {/* Duplicated Globe and Calendar directly below beams */}
          <div className="relative w-full mt-16 md:mt-24">
            {/* Globe positioned with more of it behind the calendar */}
            <div className="relative h-[300px] w-full flex justify-center items-center">
              <Globe className="h-[700px] w-[700px] max-w-[700px]" />
            </div>
            {/* Calendar Section - More overlap with globe */}
            <div className="relative z-10 py-16 lg:py-24 -mt-[280px]">
              <div className="relative z-20 pt-[280px]">
                <Calendar />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Curved Horizon Section */}

      {/* Animated Cards section removed (merged above) */}

      {/* Services Section */}
      <section id="services" className="scroll-mt-24">
        <Services 
          title="Our AI Services"
          subtitle="Comprehensive solutions designed to transform every aspect of your business"
        />
      </section>
      
      {/* Testimonials Section (columns) */}
      <section id="testimonials" className="scroll-mt-24">
        <TestimonialsColumns 
          title="What Our Clients Say"
          subtitle="Join thousands of satisfied customers who have transformed their businesses with our AI solutions"
          testimonials={[
          {
            id: 1,
            name: "Ava Martins",
            role: "CEO",
            company: "TechCorp",
            content: "Their ICP targeting and list building cleaned up our pipeline fast. Within 14 days our reply rate doubled because we were finally reaching the right buyers.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
          },
          {
            id: 2,
            name: "Lucas Ferreira",
            role: "CTO",
            company: "InnovateLabs",
            content: "AI‑personalized outreach plus behavior‑based scoring let our reps focus on high‑intent leads. We booked 3× more meetings with fewer emails — fully synced to our CRM.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          },
          {
            id: 3,
            name: "Inês Costa",
            role: "Head of Revenue Operations",
            company: "Analytics Pro",
            content: "Their agentic SDR + chatbot handles intake to booking, and custom workflows connect Slack, HubSpot, and Notion with approvals and audit trails. We focus on deals, not admin.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
          }
        ]}
        />
      </section>
      
      {/* Globe and Calendar Section - More globe behind calendar */}
      <section id="calendar" className="relative w-full scroll-mt-24">
        {/* Globe positioned with more of it behind the calendar */}
        <div className="relative h-[300px] w-full flex justify-center items-center">
          <Globe className="h-[700px] w-[700px] max-w-[700px]" />
        </div>
        
        {/* Calendar Section - More overlap with globe */}
        <div className="relative z-10 py-16 lg:py-24 -mt-[280px]">
          <div className="relative z-20 pt-[280px]">
            <Calendar />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </main>
  )
}