"use client";
import React from "react";
import { motion } from "motion/react";
import { User } from "lucide-react";

export type TestimonialItem = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) => {
  const { className, testimonials, duration } = props;
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-6 md:p-8 rounded-3xl border border-white shadow-lg shadow-primary/10 max-w-xs w-full bg-white"
                  key={`${index}-${i}`}
                >
                  <div className="text-sm md:text-base text-purple-700 leading-relaxed">{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-purple-700">{name}</div>
                      <div className="leading-5 text-purple-600/80 tracking-tight text-sm">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
