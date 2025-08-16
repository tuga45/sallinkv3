"use client";

import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInViewport } from "@/hooks/use-in-viewport";
import { FiClock } from "react-icons/fi";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility Function (from @/lib/utils) ---

/**
 * A utility function to conditionally join class names.
 * Requires `clsx` and `tailwind-merge` to be installed.
 * `npm install clsx tailwind-merge`
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Card Components ---

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AnimatedCard({ className, ...props }: CardProps) {
  return (
    <div
      role="region"
      aria-labelledby="card-title"
      aria-describedby="card-description"
      className={cn(
        "group/animated-card relative w-[356px] h-[320px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-transform duration-300 will-change-transform hover:-translate-y-1 hover:scale-[1.01] dark:border-zinc-900 dark:bg-white flex flex-col",
        className
      )}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: CardProps) {
  return (
    <div
      role="group"
      className={cn(
        "flex flex-col space-y-1.5 border-t border-zinc-200 p-4 dark:border-zinc-900 flex-1",
        className
      )}
      {...props}
    />
  );
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn(
        "text-xl lg:text-2xl font-bold leading-none tracking-tight text-purple-600",
        className
      )}
      {...props}
    />
  );
}

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn(
        "text-sm text-purple-500",
        className
      )}
      {...props}
    />
  );
}

export function CardVisual({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("h-[180px] w-[356px] overflow-hidden", className)}
      {...props}
    />
  );
}

// --- Visual2 Component and its Sub-components ---

interface Visual2Props {
  mainColor?: string;
  secondaryColor?: string;
  gridColor?: string;
}

export function Visual2({
  mainColor = "#8b5cf6",
  secondaryColor = "#fbbf24",
  gridColor = "#80808015",
}: Visual2Props) {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inViewport = useInViewport(containerRef);
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  const isActive = inViewport && !prefersReducedMotion;

  return (
    <>
      <div
        className="absolute inset-0 z-20"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={
          {
            "--color": mainColor,
            "--secondary-color": secondaryColor,
          } as React.CSSProperties
        }
      />
      <div ref={containerRef} className="relative h-[180px] w-[356px] overflow-hidden rounded-t-lg">
        <Layer1
          hovered={hovered}
          color={mainColor}
          secondaryColor={secondaryColor}
          isActive={isActive}
        />
        <Layer2 color={mainColor} isActive={isActive} />
        <Layer3 color={mainColor} isActive={isActive} />
        <Layer4
          color={mainColor}
          secondaryColor={secondaryColor}
          hovered={hovered}
          isActive={isActive}
        />
        <EllipseGradient color={mainColor} />
        <GridLayer color={gridColor} />
      </div>
    </>
  );
}

interface LayerProps {
  color: string;
  secondaryColor?: string;
  hovered?: boolean;
  isActive?: boolean;
}

const EllipseGradient: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div className="absolute inset-0 z-[5] flex h-full w-full items-center justify-center">
      <svg
        width="356"
        height="196"
        viewBox="0 0 356 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="356" height="180" fill="url(#paint0_radial_12_207)" />
        <defs>
          <radialGradient
            id="paint0_radial_12_207"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(178 98) rotate(90) scale(98 178)"
          >
            <stop stopColor={color} stopOpacity="0.25" />
            <stop offset="0.34" stopColor={color} stopOpacity="0.15" />
            <stop offset="1" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

const GridLayer: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div
      style={{ "--grid-color": color } as React.CSSProperties}
      className="pointer-events-none absolute inset-0 z-[4] h-full w-full bg-transparent bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:20px_20px] bg-center opacity-70 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"
    />
  );
};

const Layer1: React.FC<LayerProps> = ({ hovered, color, secondaryColor, isActive }) => {
  const [mainProgress, setMainProgress] = useState(12.5);
  const [secondaryProgress, setSecondaryProgress] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (hovered) {
      timeout = setTimeout(() => {
        setMainProgress(66);
        setSecondaryProgress(100);
      }, 200);
    } else {
      setMainProgress(12.5);
      setSecondaryProgress(0);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [hovered]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  // Soften the donut by reducing visible stroke through opacity and keeping offsets subtle
  const mainDashoffset = circumference - (mainProgress / 100) * circumference;
  const secondaryDashoffset = circumference - (secondaryProgress / 100) * circumference;

  return (
    <div className={cn(
      "ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute top-0 left-0 z-[7] flex h-[360px] w-[356px] transform items-center justify-center",
      isActive ? "transition-transform duration-500 group-hover/animated-card:-translate-y-[90px] group-hover/animated-card:scale-110" : "transition-none duration-0"
    )}>
      <div className="relative flex h-[120px] w-[120px] items-center justify-center text-purple-300">
        <div className="donut-chart-container relative">
          <svg width="120" height="120" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              opacity={0.08}
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke={secondaryColor}
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={secondaryDashoffset}
              transform="rotate(-90 50 50)"
              style={{
                transition: isActive ? "stroke-dashoffset 0.5s cubic-bezier(0.6, 0.6, 0, 1)" : "none",
                opacity: 0.15,
              }}
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke={color}
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={mainDashoffset}
              transform="rotate(-90 50 50)"
              style={{
                transition: isActive ? "stroke-dashoffset 0.5s cubic-bezier(0.6, 0, 1)" : "none",
                opacity: 0.25,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Removed percentage text to avoid showing dummy data */}
          </div>
        </div>
      </div>
    </div>
  );
};

const Layer2: React.FC<{ color: string; isActive?: boolean }> = ({ color, isActive }) => {
  return (
    <div
      className="relative h-full w-[356px]"
      style={{ "--color": color } as React.CSSProperties}
    >
      {/* Removed overlay panel with dummy text */}
    </div>
  );
};

const Layer3: React.FC<{ color: string; isActive?: boolean }> = ({ color, isActive }) => {
  return (
    <div className={cn("ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute inset-0 z-[6] flex translate-y-full items-center justify-center opacity-0",
      isActive ? "transition-all duration-500 group-hover/animated-card:translate-y-0 group-hover/animated-card:opacity-100" : "transition-none duration-0")}
    >
      <svg
        width="356"
        height="180"
        viewBox="0 0 356 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="356" height="180" fill="url(#paint0_linear_29_3)" />
        <defs>
          <linearGradient
            id="paint0_linear_29_3"
            x1="178"
            y1="0"
            x2="178"
            y2="180"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.35" stopColor={color} stopOpacity="0" />
            <stop offset="1" stopColor={color} stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const Layer4: React.FC<LayerProps> = ({ color, secondaryColor, hovered, isActive }) => {
  const items = [
    { id: 1, translateX: "100", translateY: "50", text: "ReactJS" },
    { id: 2, translateX: "100", translateY: "-50", text: "MongoDB" },
    { id: 3, translateX: "125", translateY: "0", text: "Prisma" },
    { id: 4, translateX: "-125", translateY: "0", text: "NextJs" },
    { id: 5, translateX: "-100", translateY: "50", text: "Auth.js" },
    { id: 6, translateX: "-100", translateY: "-50", text: "Stripe" },
  ];

  return (
    <div className={cn("ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute inset-0 z-[7] flex items-center justify-center opacity-0",
      isActive ? "transition-opacity duration-500 group-hover/animated-card:opacity-100" : "transition-none duration-0")}
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          className={cn("ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute flex items-center justify-center gap-1 rounded-full border border-zinc-200 bg-white px-1.5 py-0.5 dark:border-zinc-800 dark:bg-white",
            isActive ? "transition-all duration-500" : "transition-none duration-0")}
          style={{
            transform: isActive && hovered
              ? `translate(${item.translateX}px, ${item.translateY}px)`
              : "translate(0px, 0px)",
          }}
        >
          <div
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: index < 3 ? color : secondaryColor }}
          />
          {/* Removed label text to keep animation only */}
        </div>
      ))}
    </div>
  );
};

export function AnimatedCard2Demo() {
  return (
    <AnimatedCard>
      <CardVisual>
        <Visual2 mainColor="#a855f7" secondaryColor="#7c3aed" />
      </CardVisual>
      <CardBody className="items-center text-center">
        <span className="mb-1" aria-hidden>
          <FiClock size={22} color="#8b5cf6" />
        </span>
        <CardTitle className="text-center">Time Saving</CardTitle>
        <CardDescription className="mt-1">Save 6–10 hours per person, per week.</CardDescription>
      </CardBody>
    </AnimatedCard>
  );
}
