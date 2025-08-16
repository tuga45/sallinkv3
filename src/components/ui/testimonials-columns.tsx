"use client";
import React, { useMemo } from "react";
import { motion } from "motion/react";
import { TestimonialsColumn, TestimonialItem } from "@/components/ui/testimonials-columns-1";

export type TestimonialsColumnsProps = {
  title?: string;
  subtitle?: string;
  testimonials?: Array<{
    id?: number;
    name: string;
    role: string;
    company?: string;
    content: string;
    rating?: number;
    avatar?: string;
  }>;
  className?: string;
};

export function TestimonialsColumns({
  title = "What Our Clients Say",
  subtitle = "Discover how AI is transforming businesses across industries",
  testimonials: propTestimonials,
  className = "",
}: TestimonialsColumnsProps) {
  // Default dataset (9 items) with Unsplash avatars
  const defaults: TestimonialItem[] = [
    {
      text:
        "This AI platform has revolutionized our operations. We've seen efficiency soar across the board.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      name: "Sarah Johnson",
      role: "CEO",
    },
    {
      text:
        "Implementation was smooth and the customization options fit our workflows perfectly.",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      name: "Michael Chen",
      role: "CTO",
    },
    {
      text:
        "Predictive analytics gave us insights we never had before—game‑changing decisions now happen daily.",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      name: "Emily Rodriguez",
      role: "Data Scientist",
    },
    {
      text:
        "Their automation features freed our team from repetitive tasks and boosted overall output.",
      image:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
      name: "David Kim",
      role: "Head of Operations",
    },
    {
      text:
        "Customer support is exceptional—fast responses and clear guidance from day one.",
      image:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face",
      name: "Alicia Patel",
      role: "Customer Success Lead",
    },
    {
      text:
        "We scaled without adding headcount. The ROI was evident within the first quarter.",
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face",
      name: "James Miller",
      role: "VP of Growth",
    },
    {
      text:
        "Seamless integrations and a user‑friendly UI—our teams adopted it quickly.",
      image:
        "https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&h=150&fit=crop&crop=face",
      name: "Olivia Nguyen",
      role: "Product Manager",
    },
    {
      text:
        "Data quality improved drastically. Our dashboards finally reflect real‑time truth.",
      image:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&fit=crop&crop=face",
      name: "Ravi Shah",
      role: "Analytics Lead",
    },
    {
      text:
        "The team's strategic guidance helped us ship faster and smarter.",
      image:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=150&h=150&fit=crop&crop=face",
      name: "Hannah Lee",
      role: "Engineering Manager",
    },
  ];

  const normalized: TestimonialItem[] = useMemo(() => {
    const mapped = (propTestimonials || []).map((t) => ({
      text: t.content,
      image:
        t.avatar ||
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      name: t.name,
      role: t.role,
    }));

    // If custom testimonials provided, only use them (repeat to fill 9),
    // otherwise fall back to defaults
    const pool = mapped.length > 0 ? mapped : defaults;
    const out: TestimonialItem[] = [];
    for (let i = 0; i < 9; i++) {
      out.push(pool[i % pool.length]);
    }
    return out;
  }, [propTestimonials]);

  const firstColumn = normalized.slice(0, 3);
  const secondColumn = normalized.slice(3, 6);
  const thirdColumn = normalized.slice(6, 9);

  return (
    <section className={`py-24 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header (keep current title and subtitle) */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="flex justify-center gap-6 mt-2 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}

export default TestimonialsColumns;
