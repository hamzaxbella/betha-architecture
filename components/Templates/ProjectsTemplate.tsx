"use client";
import { useFilter } from "@/hooks/UseFilter";
import { HomeTemplateProps } from "@/lib/interfaces";
import TextRevealOnView from "../TextRevealOnView";
import { useLangaugeStore } from "@/hooks/LanguageStore";
import ProjectsList from "../ProjectsList";
import Categories from "../Categories";
import { AllTranslation } from "@/constants";
import Footer from "../Footer";
import { useRouteStore } from "@/hooks/RouteStore";
import { useEffect } from "react";

const ProjectsTemplate = ({ projects, categories }: HomeTemplateProps) => {
  const { selectedFilter } = useFilter();
  const { langauge } = useLangaugeStore();
  const { setCurrentRoute} = useRouteStore()

  useEffect(() => {
    setCurrentRoute('/projects')
  } , [setCurrentRoute])
  return (
    <section>
      <section className="padding-y">
        <div className="flex justify-center items-center padding-y">
          <TextRevealOnView
            text={
              selectedFilter === "all"
                ? AllTranslation[langauge]
                : categories.find(
                    (category) => category.currentSlug === selectedFilter
                  )?.categoryName[langauge] || ""
            }
            fontSize="text-4xl lg:text-8xl uppercase"
          />
        </div>
        <div>
          <Categories categories={categories} />
        </div>
        <div>
          <ProjectsList projects={projects} />
        </div>
      </section>
      <div>
        <Footer />
      </div>
    </section>
  );
};

export default ProjectsTemplate;
