"use client";

import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollReveal.css";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  // New: control pinning behavior so users can't scroll past before animation ends
  pin?: boolean;
  pinEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
  pin = false,
  pinEnd,
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const createdTriggers: ScrollTrigger[] = [];
    const createdTweens: gsap.core.Tween[] = [];

    // If pinning is enabled, pin the section so the user can't scroll past it
    // until the animation completes
    if (pin) {
      const resolvedPinEnd = pinEnd ?? wordAnimationEnd;
      const pinTrigger = ScrollTrigger.create({
        trigger: el,
        scroller,
        start: "center center",
        end: resolvedPinEnd,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });
      createdTriggers.push(pinTrigger);
    }

    const rotationStartValue = pin ? "top center" : "center bottom";
    const wordsStartValue = pin ? "center center" : "center bottom-=20%";

    const rotationTween = gsap.fromTo(
      el,
      { transformOrigin: "0% 50%", rotate: baseRotation },
      {
        ease: "none",
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: rotationStartValue,
          end: rotationEnd,
          scrub: true,
        },
      }
    );
    createdTweens.push(rotationTween);

    const wordElements = el.querySelectorAll<HTMLElement>(".word");

    const opacityTween = gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: "opacity" },
      {
        ease: "none",
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: wordsStartValue,
          end: wordAnimationEnd,
          scrub: true,
        },
      }
    );
    createdTweens.push(opacityTween);

    if (enableBlur) {
      const blurTween = gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: "none",
          filter: "blur(0px)",
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: wordsStartValue,
            end: wordAnimationEnd,
            scrub: true,
          },
        }
      );
      createdTweens.push(blurTween);
    }

    return () => {
      createdTweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
      createdTriggers.forEach((tr) => tr.kill());
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
    pin,
    pinEnd,
  ]);

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </h2>
  );
};

export default ScrollReveal;