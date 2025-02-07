"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import TextRevealOnView from "../TextRevealOnView";
import { Project } from "@/lib/interfaces";
// import { useLangaugeStore } from "@/hooks/LanguageStore";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const panels = [
  {
    id: "panel-1",
    title: "Panel 1",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    color: "bg-red-500",
  },
  {
    id: "panel-2",
    title: "Panel 2",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    color: "bg-orange-500",
  },
  {
    id: "panel-3",
    title: "Panel 3",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    color: "bg-purple-500",
  },
  {
    id: "panel-4",
    title: "Panel 4",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    color: "bg-green-500",
  },
  {
    id: "panel-5",
    title: "Panel 5",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    color: "bg-gray-500",
  },
];

interface SingleProjectTemplateProps {
  project: Project;
}

const SingleProjectTemplate = ({ project }: SingleProjectTemplateProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
//   const {langauge , font , direction} = useLangaugeStore()
console.log(project)
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".panel");

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "-60px top",
          end: () => "+=" + (container.offsetWidth - window.innerWidth),
          invalidateOnRefresh: true,
        },
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden mt-[60px] max-container">
      <div
        ref={containerRef}
        className="relative custom-height flex flex-nowrap"
        style={{ width: `${panels.length * 100}vw` }}
      >
        <div className="panel w-[50vw] custom-height padding-y">
          <TextRevealOnView text="Hello World" />
          <div>

          </div>
        </div>
        {panels.map((panel) => (
          <div
            key={panel.id}
            id={panel.id}
            className={`panel relative w-[50vw] custom-height flex items-center justify-center ${panel.color}`}
          >
            <div className="container mx-auto px-4"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleProjectTemplate;
