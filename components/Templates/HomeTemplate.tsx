"use client";
import Image from "next/image";
import { heroImg } from "@/public";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLangaugeStore } from "@/hooks/LanguageStore";
import { heroDescription, projectTranslation } from "@/constants";
import TextRevealOnView from "../TextRevealOnView";
import { HomeTemplateProps } from "@/lib/interfaces";
import Categories from "../Categories";
import ProjectsList from "../ProjectsList";
import CTA from "../CTA";
import Footer from "../Footer";

const HomeTemplate = ({categories , projects} : HomeTemplateProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { langauge } = useLangaugeStore();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !imageRef.current) return;

    // Set initial position
    gsap.set(imageRef.current, {
      scale: 1.2,
      y: -50,
    });

    const animation = gsap.to(imageRef.current, {
      y: 50,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <section>
      <section className="py-8">
        <div
          ref={containerRef}
          className="w-full h-[450px] overflow-hidden rounded-xl relative"
        >
          <Image
            ref={imageRef}
            src={heroImg}
            className="w-full h-[120%] object-cover absolute top-0 left-0"
            alt="hero"
            width={1920}
            height={1080}
            priority
          />
        </div>
        <div className="flex justify-center text-center py-4">
          <p className={`${langauge === 'ar' && '!font-cairo'} font-playful max-w-[50ch] text-xl leading-8`}>
            {heroDescription[langauge]}
          </p>
        </div>
        
      </section>

      <section className="py-20">
        <div className="flex justify-center items-center">

        <TextRevealOnView 
          text={projectTranslation[langauge]}
          fontSize="text-4xl "
          from="start" 
        />

        </div>
        <div className="my-6">
          <Categories categories={categories} />
        </div>
        <ProjectsList projects={projects} homeList />
      </section>
      <div className="padding-y ">
          <CTA />
      </div>
      <Footer />
  </section>
  );
};

export default HomeTemplate;
