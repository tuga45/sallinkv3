"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const CalendarDay: React.FC<{ day: number | string; isHeader?: boolean }> = ({
  day,
  isHeader,
}) => {
  // Stable, deterministic styling to avoid SSR/CSR mismatch
  const isNumber = typeof day === 'number';
  const isAccent = isNumber && (Number(day) % 5 === 0);
  const baseInteractive = "transition-all duration-200 hover:scale-105";
  const accent = "bg-purple-600 text-white hover:bg-purple-700";
  const normal = "text-purple-600 hover:bg-purple-100 hover:text-purple-700";

  return (
    <div
      className={`col-span-1 row-span-1 flex h-8 w-8 items-center justify-center ${
        isHeader ? "text-purple-500" : "cursor-pointer rounded-xl"
      } ${!isHeader ? baseInteractive : ''} ${!isHeader ? (isAccent ? accent : normal) : ''}`}
    >
      <span className={`font-medium ${isHeader ? "text-xs" : "text-sm"}`}>
        {day}
      </span>
    </div>
  );
};

export function Calendar() {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = new Date(
    currentYear,
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const bookingLink = `https://api.leadconnectorhq.com/widget/booking/KJz3LChWr0r4xwXr31wR`;

  const renderCalendarDays = () => {
    let days: React.ReactNode[] = [
      ...dayNames.map((day, i) => (
        <CalendarDay key={`header-${day}`} day={day} isHeader />
      )),
      ...Array.from({ length: firstDayOfWeek }).map((_, i) => (
        <div
          key={`empty-start-${i}`}
          className="col-span-1 row-span-1 h-8 w-8"
        />
      )),
      ...Array(daysInMonth)
        .fill(null)
        .map((_, i) => <CalendarDay key={`date-${i + 1}`} day={i + 1} />),
    ];

    return days;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <BentoCard height="h-auto" linkTo={bookingLink} className="w-full" showHoverGradient={false}>
        <div className="grid h-full gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center">
            <h2 className="mb-4 text-2xl md:text-4xl font-semibold text-purple-600">
              Book a Free Consultation Today!
            </h2>
            <p className="mb-6 text-sm md:text-lg text-purple-500">
              Elevate your business to new heights with our cutting-edge artificial intelligence solutions deployed worldwide.
            </p>
            <Button className="mt-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white w-fit">
              Book Now
            </Button>
          </div>
          <div className="flex justify-center items-center">
            <div className="w-full max-w-md">
              <div className="h-full w-full rounded-[24px] border border-purple-200 p-3 transition-colors duration-100 group-hover:border-purple-400 bg-purple-50">
                <div
                  className="h-full rounded-2xl border-2 border-purple-100 p-4 bg-white"
                  style={{ boxShadow: "0px 2px 1.5px 0px rgba(147,51,234,0.1) inset" }}
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <p className="text-sm text-purple-600">
                      <span className="font-medium">
                        {currentMonth}, {currentYear}
                      </span>
                    </p>
                    <span className="h-1 w-1 rounded-full bg-purple-400">&nbsp;</span>
                    <p className="text-xs text-purple-500">30 min call</p>
                  </div>
                  <div className="grid grid-cols-7 grid-rows-6 gap-2">
                    {renderCalendarDays()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BentoCard>
    </div>
  );
}

interface BentoCardProps {
  children: React.ReactNode;
  height?: string;
  rowSpan?: number;
  colSpan?: number;
  className?: string;
  showHoverGradient?: boolean;
  hideOverflow?: boolean;
  linkTo?: string;
}

export function BentoCard({
  children,
  height = "h-auto",
  rowSpan = 8,
  colSpan = 7,
  className = "",
  showHoverGradient = true,
  hideOverflow = true,
  linkTo,
}: BentoCardProps) {
  const cardContent = (
    <div
      className={`group relative flex flex-col rounded-2xl border border-purple-200 bg-white p-6 ring-1 ring-purple-100 ${
        hideOverflow && "overflow-hidden"
      } ${height} row-span-${rowSpan} col-span-${colSpan} ${className}`}
    >
      {linkTo && (
        <div className="absolute bottom-4 right-6 z-[999] flex h-12 w-12 rotate-6 items-center justify-center rounded-full bg-purple-600 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-[-8px] group-hover:rotate-0 group-hover:opacity-100">
          <svg
            className="h-6 w-6 text-white"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.25 15.25V6.75H8.75"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 7L6.75 17.25"
            ></path>
          </svg>
        </div>
      )}
      {showHoverGradient && (
        <div className="user-select-none pointer-events-none absolute inset-0 z-30 bg-gradient-to-tl from-purple-400/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></div>
      )}
      {children}
    </div>
  );

  if (linkTo) {
    return linkTo.startsWith("/") ? (
      <Link href={linkTo} className="block">
        {cardContent}
      </Link>
    ) : (
      <a
        href={linkTo}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
