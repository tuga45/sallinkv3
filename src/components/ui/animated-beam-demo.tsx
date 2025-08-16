"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { PiOpenAiLogoThin } from "react-icons/pi";
import {
  SiAirtable,
  SiSlack,
  SiNotion,
  SiGooglecalendar,
  SiGooglesheets,
} from "react-icons/si";
import Image from "next/image";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div 
      className="relative h-[560px] w-full flex flex-col items-center justify-center"
      ref={containerRef}
    >
      <div className="flex size-full flex-col max-w-2xl max-h-[300px] items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref} className="size-16">
            <PiOpenAiLogoThin size={28} color="#000000" />
          </Circle>
          <Circle ref={div5Ref} className="size-16">
            <SiNotion size={24} color="#000000" />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref} className="size-16">
            <SiAirtable size={24} color="#18BFFF" />
          </Circle>
          <Circle ref={div4Ref} className="size-20 bg-white p-2">
            <Image 
              src="/logo.svg" 
              alt="Company Logo" 
              width={40} 
              height={40} 
              className="object-contain"
            />
          </Circle>
          <Circle ref={div6Ref} className="size-16">
            <SiGooglecalendar size={24} color="#4285F4" />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref} className="size-16">
            <SiSlack size={24} color="#4A154B" />
          </Circle>
          <Circle ref={div7Ref} className="size-16">
            <SiGooglesheets size={24} color="#34A853" />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
      />
    </div>
  );
}