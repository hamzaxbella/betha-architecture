"use client";
import { NavLinks } from "@/constants";
import { useLangaugeStore } from "@/hooks/LanguageStore";
import { burger_menu, close_menu } from "@/public";
import Image from "next/image";
import Link from "next/link";
import { useToggleMenuStore } from "@/hooks/ToggleMenuStore";
import { useEffect, useState } from "react";
import { useRouteStore } from "@/hooks/RouteStore";
import TextReveal from "./TextReveal";
import gsap from "gsap";

const Navbar = () => {
  const { langauge, setLangauge , direction } = useLangaugeStore();
  const { isOpen, toggleMenu, closeMenu } = useToggleMenuStore();
  const { currentRoute, setCurrentRoute } = useRouteStore();
  const [isClosing, setIsClosing] = useState(false);
  
  // handle Menu toggle
  const handleMenuToggle = () => {
    if (!isOpen) {
      setIsClosing(false);
      toggleMenu();
    } else {
      setIsClosing(true);
      gsap.delayedCall(1, () => {
        closeMenu();
        setIsClosing(false);
      });
    }
  };


  const handleLangaugeSwitch = (e : HTMLSelectElement) => {
    setLangauge(e.value as "en" | "fr" | "ar");
  }

  useEffect(() => {
    // Reset all underlines initially
    gsap.set(".active-underline", {
      width: "0%",
    });

    // Create separate timelines for opening and closing
    if (isOpen && !isClosing) {
      gsap.to(".active-underline", {
        width: "66%",
        duration: 0.75,
        ease: "expo.inOut",
        delay: 1,
      });
    }

    if (isClosing) {
      const tl = gsap.timeline();
      tl.to(".active-underline", {
        width: "0%",
        duration: 0.5,
        ease: "expo.inOut",
      });
    }

    // Cleanup function
    return () => {
      gsap.killTweensOf(".active-underline");
    };
  }, [isOpen, isClosing]);

  return (
    <nav className="flex justify-between items-center p-4 h-[60px]  relative max-container ">
      <ul
        dir={direction}
        className={`${isOpen ? "fixed left-0 top-0 flex flex-col justify-center z-[1000] bg-white  gap-8 w-screen h-screen" : "hidden"} lg:hidden  md:flex`}
      >
        {NavLinks[langauge].map((link, index) => (
          <li
            key={index}
            className="relative overflow-hidden inline-block mx-4 w-fit"
          >
            <Link
              onClick={() => {
                setCurrentRoute(link.href);
                handleMenuToggle();
              }}
              className="text-6xl font-playful"
              href={link.href}
            >
              <TextReveal
                shouldAnimate={isOpen}
                isClosing={isClosing}
                text={link.label}
              />
            </Link>
            <span
              className={`${currentRoute == link.href ? "block active-underline" : "hidden"} absolute bottom-0 ${direction === 'rtl' ? 'right-1' : 'left-1'} w-0 h-[2px] bg-black`}
            ></span>
          </li>
        ))}
        <Image
          className="absolute right-4 top-4"
          onClick={() => handleMenuToggle()}
          src={close_menu}
          width={25}
          height={25}
          alt="burger menu"
        />
      </ul>
      <ul className={` justify-center items-center gap-4 hidden lg:flex`}>
        {NavLinks[langauge].slice(0, 3).map((link, index) => (
          <li key={index} className="inline-block mx-4">
            <Link
              onClick={() => setCurrentRoute(link.href)}
              href={link.href}
              className={`${langauge === 'ar' ? 'font-cairo' : 'font-inter'} text-lg font-light ${currentRoute === link.href && 'font-medium'}`}

            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <h1 className="text-4xl font-light font-playful lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">Logo</h1>
      <div className="flex items-center justify-center gap-4">
        <select className="text-lg font-inter bg-transparent" onChange={(e) => handleLangaugeSwitch(e.target)}>
          <option value="fr">fr</option>
          <option value="ar">ar</option>
          <option value="en">en</option>
        </select>
        {!isOpen && (
          <Image
            className="lg:hidden"
            onClick={() => handleMenuToggle()}
            src={burger_menu}
            width={50}
            height={50}
            alt="burger menu"
          />
        )}
        <button className="text-white bg-black text-lg font-light rounded-full px-10 py-3 hidden lg:block">
          <Link href={'/contact'}>Contact</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
