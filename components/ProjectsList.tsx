"use client"

import { ProjectsListProps } from "@/lib/interfaces"
import { urlFor } from "@/lib/sanity"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from 'gsap'
import { useLangaugeStore } from "@/hooks/LanguageStore"
import { Project } from "@/lib/interfaces"

import { useFilter } from "@/hooks/UseFilter"
import { LoadMoreTranslation } from "@/constants"

const shortenTitle = (title: string) => {
  let shortTitle = "";
  const wordsInTitle = title.trim().split(" ");
  wordsInTitle.slice(0, 3).forEach((word) => {
    shortTitle += word[0];
  });

  return shortTitle;
};


const ProjectsList = ({homeList , projects}  : ProjectsListProps) => {
  const { langauge , font } = useLangaugeStore()
  const { selectedFilter } = useFilter()
  const [filteredProjects , setFilteredProjects] = useState<Project[]>([])
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const loadMoreRef = useRef(null)
  const projectsPerPage = 6
  const gridRef = useRef<HTMLDivElement>(null)
  const projectCellsRef = useRef<HTMLDivElement[]>([])
  const animationsRef = useRef<gsap.Context[]>([])
  const prevProjectsLength = useRef(0)

  // Update filtering logic
  useEffect(() => {
    const filtered = selectedFilter === 'all' 
      ? projects 
      : projects.filter((project) => project.category === selectedFilter);
    
    setFilteredProjects(filtered);
    setDisplayedProjects(filtered.slice(0, projectsPerPage));
    setPage(1);
    prevProjectsLength.current = 0;
    
    // Cleanup GSAP animations
    return () => {
      animationsRef.current.forEach(context => context.revert())
      animationsRef.current = []
    }
  }, [projects, selectedFilter, projectsPerPage]) // Add selectedFilter as dependency

  const loadMoreProjects = useCallback(() => {
    if (displayedProjects.length >= filteredProjects.length || isLoading) return;
    
    setIsLoading(true);
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    
    setTimeout(() => {
      setDisplayedProjects(prevProjects => {
        const newProjects = filteredProjects.slice(startIndex, endIndex);
        const uniqueProjects = [...new Map([...prevProjects, ...newProjects].map(
          project => [project.currentSlug, project]
        )).values()];
        return uniqueProjects;
      });
      setPage(nextPage);
      setIsLoading(false);
    }, 500);
  }, [displayedProjects.length, filteredProjects, page, isLoading]);

  // Intersection Observer effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoading && !homeList) {
          loadMoreProjects();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [loadMoreProjects, isLoading, homeList]);

  // Setup hover animations
  const setupHoverAnimations = useCallback(() => {
    projectCellsRef.current.forEach((cell, index) => {
      if (!cell) return;

      const overlay = cell.querySelector('.overlay');
      const title = cell.querySelector('.project-title');
      const description = cell.querySelector('.project-description');

      if (!overlay || !title || !description) return;

      const context = gsap.context(() => {
        const tl = gsap.timeline({ paused: true })
          .fromTo(overlay, {
            opacity: 0,
            backdropFilter: 'blur(0px)',
          }, {
            opacity: 1,
            backdropFilter: 'blur(3px)',
            duration: 0.3,
            ease: 'power2.out',
          })
          .fromTo([title, description], {
            clipPath: 'inset(100% 0 0 0)',
            y: 20,
            opacity: 0,
          }, {
            clipPath: 'inset(0% 0 0 0)',
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power3.out',
          }, "-=0.1");

        cell.addEventListener('mouseenter', () => tl.play());
        cell.addEventListener('mouseleave', () => tl.reverse());
      }, cell);

      animationsRef.current[index] = context;
    });
  }, []);

  // Animation effect
  useEffect(() => {
    if (displayedProjects.length > 0) {
      const currentRefs = [...projectCellsRef.current];
      const newProjects = currentRefs.slice(prevProjectsLength.current);
      
      if (newProjects.length > 0) {
        const tl = gsap.timeline();
        
        tl.fromTo(
          newProjects,
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: {
              amount: 0.4,
              grid: [3, 3],
              from: "start"
            },
            onComplete: setupHoverAnimations
          }
        );

        // Ensure proper document height update
        gsap.set(gridRef.current, {
          height: 'auto',
          onComplete: () => {
            document.body.style.height = 'auto';
            window.dispatchEvent(new Event('resize'));
          }
        });
      }
      
      prevProjectsLength.current = displayedProjects.length;
    }

    return () => {
      const currentRefs = projectCellsRef.current;
      gsap.killTweensOf(currentRefs);
    };
  }, [displayedProjects, setupHoverAnimations]);

  // Update empty check to use filteredProjects
  const isEmpty = !filteredProjects || filteredProjects.length === 0;
  if (isEmpty) {
    return (
      <section className="w-full h-[50vh] flex justify-center items-center">
        <p className="text-xl text-gray-500">No projects available.</p>
      </section>
    );
  }
  
  return (
    <section className="w-full h-full py-10">
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-10 w-full">
        {displayedProjects.map((project, index) => (
          <div 
            className=" group h-[400px] w-full lg:w-[450px] rounded-3xl overflow-hidden opacity-0" 
            key={project.currentSlug}
            ref={el => {
              if (el) projectCellsRef.current[index] = el;
            }}
          >
            <Link className="relative w-full h-full block overflow-hidden" href={`/projects/${project.currentSlug}`}>
              <Image
                className="w-full h-full object-cover"
                src={urlFor(project.thumbnail).url()}
                alt={project.title[langauge]}
                width={700}
                height={700}
              />
              <div className="overlay absolute inset-0 bg-black/40 opacity-0">
                <div className="flex flex-col gap-4 justify-center items-center h-full text-white">
                  <h2 className="project-title text-4xl font-medium">
                    {shortenTitle(project.title['en'])}
                  </h2>
                  <p className={`${font} project-description text-center max-w-[30ch]`}>
                    {project.description[langauge]}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      {/* Loading indicator and trigger */}
      {displayedProjects.length < filteredProjects.length && (
        <div 
          ref={loadMoreRef}
          className="w-full flex justify-center items-center py-8"
        >
          {isLoading ? (
            <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
          ) : (
            <div className="h-4" /> // Invisible trigger element
          )}
        </div>
      )}
      <div className="flex justify-center my-6">

      <button onClick={() => loadMoreProjects()} className={`${font} text-lg rounded-full py-4 border font-inter font-light px-10 hover:bg-slate-100`} >{LoadMoreTranslation[langauge]}</button>
      </div>
    </section>
  );
}

export default ProjectsList