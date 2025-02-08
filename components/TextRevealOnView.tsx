"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useLangaugeStore } from "@/hooks/LanguageStore";

interface TextRevealOnViewProps {
  text: string;
  fontSize?: string;
  from?: "start" | "end";
  linesbreak?: boolean;
}

const TextRevealOnView = ({
  text,
  fontSize = "text-6xl",
  from = "start",
  linesbreak = false,
}: TextRevealOnViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { langauge , font , direction } = useLangaugeStore();

  const words = (text: string) => {
    return text.trim().split(" ");
  };

  const lines = (words: string[]) => {
    const wordsPerLines = 2;
    const groupes: string[] = [];
    if (words.length <= wordsPerLines) return words;
    for (let i = 0; i < words.length; i += wordsPerLines) {
      groupes.push(words.slice(i, i + wordsPerLines).join(" "));
    }
    return groupes;
  };

  
  const chainedText = (text: string) => {
    return text.trim().split("");
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const letters = containerRef.current?.querySelectorAll(".letter");

    if (!letters) return;

    gsap.set(letters, {
      y: 100,
      opacity: 0,
    });

    gsap.to(letters, {
      y: 0,
      opacity: 1,
      duration: 0.75,
      ease: "circ.inOut",
      stagger: {
        each: 0.05,
        from: from,
      },
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [text, from]);

  return (
    <div ref={containerRef} className="flex overflow-hidden gap-[2px]">
      {langauge === "ar" && !linesbreak ? (
        <div className="overflow-hidden">
          <p className={`${fontSize} letter font-cairo`}>{text}</p>
        </div>
      ) : !linesbreak ? (
        chainedText(text).map((char: string, index: number) => (
          <div key={index} className="overflow-hidden">
            <p className={`${fontSize}  font-light letter font-playful`}>
              {char}
            </p>
          </div>
        ))
      ) : (
        <div className="flex flex-col">
          {lines(words(text)).map((line: string, index: number) => (
            <div key={index} className="overflow-hidden">
              <p dir={direction} className={`${fontSize} !${font} font-light letter font-playful`}>
                {line}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TextRevealOnView;
