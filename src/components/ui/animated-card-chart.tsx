"use client";

import * as React from "react";
import { useMemo, useRef, useState } from "react";
import { useInViewport } from "@/hooks/use-in-viewport";
import { FiLayers } from "react-icons/fi";
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
        "group/animated-card relative w-[356px] min-h-[280px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-transform duration-300 will-change-transform hover:-translate-y-1 hover:scale-[1.01] dark:border-zinc-900 dark:bg-white",
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

// --- Visual3 Component and its Sub-components ---

interface Visual3Props {
  mainColor?: string;
  secondaryColor?: string;
  gridColor?: string;
}

export function Visual3({
  mainColor = "#8b5cf6",
  secondaryColor = "#7c3aed",
  gridColor = "#80808015",
}: Visual3Props) {
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
        <Layer4
          color={mainColor}
          secondaryColor={secondaryColor}
          hovered={hovered}
          isActive={isActive}
        />
        <Layer3 color={mainColor} isActive={isActive} />
        <Layer2 color={mainColor} isActive={isActive} />
        <Layer1 color={mainColor} secondaryColor={secondaryColor} isActive={isActive} />
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

const GridLayer: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div
      style={{ "--grid-color": color } as React.CSSProperties}
      className="pointer-events-none absolute inset-0 z-[4] h-full w-full bg-transparent bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:20px_20px] bg-center opacity-70 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"
    />
  );
};

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

const Layer1: React.FC<LayerProps> = ({ color, secondaryColor, isActive }) => {
  return (
    <div
      className={cn(
        "absolute top-4 left-4 z-[8] flex items-center gap-1",
        isActive ? "" : ""
      )}
      style={
        {
          "--color": color,
          "--secondary-color": secondaryColor,
        } as React.CSSProperties
      }
    >
      {/* Removed percentage chips */}
    </div>
  );
};

const Layer2: React.FC<{ color: string; isActive?: boolean }> = ({ color, isActive }) => {
  return (
    <div
      className="group relative h-full w-[356px]"
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
  const rectsData = [
    {
      width: 15,
      height: 20,
      y: 110,
      hoverHeight: 20,
      hoverY: 130,
      x: 40,
      fill: "currentColor",
      hoverFill: secondaryColor,
    },
    {
      width: 15,
      height: 20,
      y: 90,
      hoverHeight: 20,
      hoverY: 130,
      x: 60,
      fill: color,
      hoverFill: color,
    },
    {
      width: 15,
      height: 40,
      y: 70,
      hoverHeight: 30,
      hoverY: 120,
      x: 80,
      fill: color,
      hoverFill: color,
    },
    {
      width: 15,
      height: 30,
      y: 80,
      hoverHeight: 50,
      hoverY: 100,
      x: 100,
      fill: color,
      hoverFill: color,
    },
    {
      width: 15,
      height: 30,
      y: 110,
      hoverHeight: 40,
      hoverY: 110,
      x: 120,
      fill: "currentColor",
      hoverFill: secondaryColor,
    },
    {
      width: 15,
      height: 50,
      y: 110,
      hoverHeight: 20,
      hoverY: 130,
      x: 140,
      fill: "currentColor",
      hoverFill: secondaryColor,
    },
    {
      width: 15,
      height: 50,
      y: 60,
      hoverHeight: 30,
      hoverY: 120,
      x: 160,
      fill: color,
      hoverFill: color,
    },
    {
      width: 15,
      height: 30,
      y: 80,
      hoverHeight: 20,
      hoverY: 130,
      x: 180,
      fill: color,
      hoverFill: color,
    },
    {
      width: 15,
      height: 20,
      y: 110,
      hoverHeight: 40,
      hoverY: 110,
      x: 200,
      fill: "currentColor",
      hoverFill: secondaryColor,
    },
    {
      width: 15,
      height: 40,
      y: 70,
      hoverHeight: 60,
      hoverY: 90,
      x: 220,
      fill: color,
      hoverFill: color,
    },
    {
      width: 15,
      height: 30,
      y: 110,
      hoverHeight: 70,
      hoverY: 80,
      x: 240,
      fill: "currentColor",
      hoverFill: secondaryColor,
    },
    {
      width: 15,
      height: 50,
      y: 110,
      hoverHeight: 50,
      hoverY: 100,
      x: 260,
      fill: "currentColor",
      hoverFill: secondaryColor,
    },
    {
      width: 15,
      height: 20,
      y: 110,
      hoverHeight: 80,
      hoverY: 70,
      x: 280,
      fill: "currentColor",
      hoverFill: secondaryColor,
    },
    {
      width: 15,
      height: 30,
      y: 80,
      hoverHeight: 90,
      hoverY: 60,
      x: 300,
      fill: color,
      hoverFill: color,
    },
  ];

  return (
    <div
      className={cn(
        "ease-[cubic-bezier(0.6, 0, 1)] absolute inset-0 z-[8] flex h-[180px] w-[356px] items-center justify-center text-neutral-800/10 dark:text-white/15",
        isActive
          ? "transition-transform duration-500 group-hover/animated-card:scale-150"
          : "transition-none duration-0",
      )}
    >
      <svg width="356" height="180" xmlns="http://www.w3.org/2000/svg">
        {rectsData.map((rect, index) => (
          <rect
            key={index}
            width={rect.width}
            height={isActive && hovered ? rect.hoverHeight : rect.height}
            x={rect.x}
            y={isActive && hovered ? rect.hoverY : rect.y}
            fill={isActive && hovered ? (rect.hoverFill as string) : (rect.fill as string)}
            rx="2"
            ry="2"
            className={cn(
              "ease-[cubic-bezier(0.6, 0.6, 0, 1)]",
              isActive ? "transition-all duration-500" : "transition-none duration-0",
            )}
          />
        ))}
      </svg>
    </div>
  );
};

export function AnimatedCard3Demo() {
  return (
    <AnimatedCard>
      <CardVisual>
        <Visual3 mainColor="#a855f7" secondaryColor="#7c3aed" />
      </CardVisual>
      <CardBody className="items-center text-center">
        <span className="mb-1" aria-hidden>
          <FiLayers size={22} color="#8b5cf6" />
        </span>
        <CardTitle className="text-center">Scalability</CardTitle>
        <CardDescription className="mt-1">Scale from 10 to 10,000 without adding headcount.</CardDescription>
      </CardBody>
    </AnimatedCard>
  );
}
