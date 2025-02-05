"use client";
import gsap from "gsap";
import { useEffect } from "react";
import { useLangaugeStore } from "@/hooks/LanguageStore";

interface TextRevealProps {
  text: string;
  shouldAnimate: boolean;
  isClosing?: boolean;
}

const TextReveal = ({ text, shouldAnimate, isClosing }: TextRevealProps) => {
  const { langauge } = useLangaugeStore();

  // split text into array of letters
  const chainedText = (text: string) => {
    const chained: string[] = text.trim().split("");
    return chained;
  };

  // animate the chained text
  useEffect(() => {
    if (!shouldAnimate) return;
    const tl = gsap.timeline();

    if (isClosing) {
      tl.to(".letter", {
        y: 200,
        duration: 1,
        ease: "circ.inOut",
        stagger: {
          each: 0.02,
          from: "end",
        },
      });
    } else {
      tl.set(".letter", {
        y: 200,
      });
      tl.to(".letter", {
        y: 0,
        duration: 0.75,
        ease: "circ.inOut",
        stagger: {
          each: 0.05,
          from: "start",
        },
      });
    }
  }, [shouldAnimate, isClosing]);

  return (
    <div className="flex overflow-hidden gap-[2px] text-heading">
      {langauge === "ar" ? (
        <div className="overflow-hidden">
          <p className="text-6xl letter transform will-change-transform">
            {text}
          </p>
        </div>
      ) : (
        chainedText(text).map((char: string, index: number) => (
          <div key={index} className="overflow-hidden">
            <p className="text-6xl letter transform will-change-transform">
              {char}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default TextReveal;
