"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import TextRevealOnView from "../TextRevealOnView";
import { Project } from "@/lib/interfaces";
import { useLangaugeStore } from "@/hooks/LanguageStore";
import { ProjectDetailsTranslations } from "@/constants";
import { urlFor } from "@/lib/sanity";
import { SlugStore } from "@/hooks/SlugStore";
import { useRouteStore } from "@/hooks/RouteStore";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import Image from "next/image";
import Skeleton from "../Skeleton";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface SingleProjectTemplateProps {
  project: Project;
}

const SingleProjectTemplate = ({ project }: SingleProjectTemplateProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const { langauge, font, direction } = useLangaugeStore();
  const { setCurrentRoute } = useRouteStore();
  const { setSlug } = SlugStore();
  const [isMobile, setIsMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: number]: boolean }>({});

  const handleImageLoad = (idx: number) => {
    setImagesLoaded(prev => ({
      ...prev,
      [idx]: true
    }));
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setSlug(project.currentSlug);
    setCurrentRoute("/projects");

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".panel");

      gsap.to(sections, {
        xPercent: isMobile
          ? -100 * (sections.length - 1)
          : -100 * (sections.length - 2),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "-60px top",
          end: () =>
            "+=" +
            (container.offsetWidth -
              (isMobile ? window.innerWidth : window.innerWidth)),
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, [langauge, isMobile]);

  // photoswipe gallery
  useEffect(() => {
    if (!galleryRef.current) return;
    const lightbox = new PhotoSwipeLightbox({
      gallery: galleryRef.current,
      children: "a",
      pswpModule: () => import("photoswipe"),
      showHideAnimationType: "fade",
      clickToCloseNonZoomable: true,
      closeOnVerticalDrag: true,
    });

    lightbox.init();

    return () => lightbox.destroy();
  }, []);

  // prevent a tags from navigating
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  return (
    <div className="relative bottom-0 left-0 overflow-hidden  max-container ">
      <div
        ref={containerRef}
        className=" custom-height flex flex-nowrap"
        style={{ width: `${project.images.length * 100}vw` }}
      >
        <div
          dir={direction}
          className="panel min-w-[100vw] lg:min-w-[50vw] lg:w-[50vw] custom-height padding-y flex flex-col justify-around px-4"
        >
          <TextRevealOnView linesbreak text={project.title[langauge]} />
          <div>
            <div className="border-b py-4">
              <p className={`!${font} font-inter text-xl font-extralight`}>
                {ProjectDetailsTranslations.location[langauge]} :{" "}
                {project.location[langauge]}
              </p>
            </div>
            <div className="border-b py-4">
              <p className={`!${font} font-inter text-xl font-extralight`}>
                {ProjectDetailsTranslations.client[langauge]} :{" "}
                {project.client[langauge]}
              </p>
            </div>
            <div className="border-b py-4">
              <p className={`!${font} font-inter text-xl font-extralight`}>
                {ProjectDetailsTranslations.budget[langauge]} :{" "}
                {project.budjet[langauge]}
              </p>
            </div>
            <div className="border-b py-4">
              <p className={`!${font} font-inter text-xl font-extralight`}>
                {ProjectDetailsTranslations.area[langauge]} :{" "}
                {project.area[langauge]}
              </p>
            </div>
          </div>
        </div>
        <div className={`photoswipe-gallery flex flex-nowrap`} ref={galleryRef}>
          {project.images.map((image, idx) => {
            const ref = image.asset._ref;
            const dimensionsMatch = ref.match(/-(\d+)x(\d+)-/);
            const width = dimensionsMatch ? parseInt(dimensionsMatch[1], 10) : 900;
            const height = dimensionsMatch ? parseInt(dimensionsMatch[2], 10) : 900;
            
            return (
              <a
                key={idx}
                className="p-4 lg:p-16 group panel relative w-[100vw] lg:w-[50vw] custom-height flex items-center justify-center"
                href={urlFor(image).url()}
                data-pswp-width={width}
                data-pswp-height={height}
                onClick={handleClick}
              >
                <div className="relative w-full h-[50vh] lg:h-full">
                  {!imagesLoaded[idx] && (
                    <div className="absolute inset-0 z-10">
                      <Skeleton />
                    </div>
                  )}
                  <Image
                    src={urlFor(image).url()}
                    alt="project image"
                    className={`w-full h-full object-cover rounded-3xl transition-opacity duration-500 ${
                      imagesLoaded[idx] ? 'opacity-100' : 'opacity-0'
                    }`}
                    width={width}
                    height={height}
                    priority={idx === 0}
                    onLoad={() => handleImageLoad(idx)}
                  />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SingleProjectTemplate;
