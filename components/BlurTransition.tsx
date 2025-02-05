"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const BlurTransition = () => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(overlayRef.current, {
        backdropFilter: "blur(0px)",
        visibility: "hidden",
      });
    });

    return () => ctx.revert();
  }, []);



  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[9999] pointer-events-none"
    />
  );
};

export default BlurTransition;
