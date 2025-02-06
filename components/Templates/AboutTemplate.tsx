"use client";
import { aboutContentTranslation } from "@/constants";
import TextRevealOnView from "../TextRevealOnView";
import { useLangaugeStore } from "@/hooks/LanguageStore";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import CTA from "../CTA";
import Footer from "../Footer";
import { useEffect } from "react";
import { useRouteStore } from "@/hooks/RouteStore";
interface AboutDataProps {
  profile: {
    en: string;
    ar: string;
    fr: string;
  };
  philosophy: {
    en: string;
    ar: string;
    fr: string;
  };
  mainImage: string;
  awards: {
    en: string;
    ar: string;
    fr: string;
  };
  about: {
    en: string;
    ar: string;
    fr: string;
  };
}

const AboutTemplate = ({ data }: { data: AboutDataProps }) => {
  const { langauge, font, direction } = useLangaugeStore();
  const { setCurrentRoute } = useRouteStore();

  
  useEffect(() => {
    setCurrentRoute('/about')
  } , [])


  // Validate data and language availability
  if (!data?.about?.[langauge]) {
    return <div>Content not available</div>;
  }


  return (
    <section dir={direction}>
      <section className="padding-y">
        <section>
          <TextRevealOnView
            text={aboutContentTranslation.studio[langauge]}
            fontSize="text-7xl"
          />
          <div className="grid grid-cols-1 items-start lg:grid-cols-3 gap-8">
            <div>
              <p className={`!${font} text-slate-600 my-4`}>
                [ {aboutContentTranslation.about[langauge]} ]
              </p>
              <p className={`!${font} leading-8 tracking-wide`}>
                {data.about[langauge]}
              </p>
            </div>
            <div>
              <p className={`!${font} text-slate-600 my-4`}>
                [ {aboutContentTranslation.philosophy[langauge]} ]
              </p>
              <p className={`!${font} leading-8 tracking-wide`}>
                {data.philosophy[langauge]}
              </p>
            </div>
            <div className="flex  justify-center items-center">
              <Image
                className="max-w-[400px]  object-cover"
                src={urlFor(data.mainImage).url()}
                alt="Studio Image"
                width={700}
                height={700}
              />
            </div>
          </div>
        </section>
        <hr className="my-24" />
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-24 relative">
            <div className="flex-1">
              <TextRevealOnView
                text={aboutContentTranslation.profile[langauge]}
                fontSize="text-7xl my-8"
              />
              <div className={`prose prose-slate max-w-none !${font}`}>
                <ReactMarkdown
                  components={{
                    p: ({ children }) => (
                      <p className={`leading-8 tracking-wide`}>
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className={`list-disc ${direction === 'rtl' ? 'pr-4' : 'pl-4'} space-y-2`}>
                        {children}
                      </ul>
                    ),
                    li: ({ children }) => (
                      <li className="leading-7">{children}</li>
                    ),
                  }}
                >
                  {data.profile[langauge]}
                </ReactMarkdown>
              </div>
            </div>
            <div className="hidden lg:block w-[1px] bg-black/20 h-full" />
            <hr className="lg:hidden w-full my-12" />
            <div className="flex-1">
              <TextRevealOnView
                text={aboutContentTranslation.awards[langauge]}
                fontSize="text-7xl my-8"
              />
              <div className={`prose prose-slate max-w-none !${font}`}>
                <ReactMarkdown
                  components={{
                    p: ({ children }) => (
                      <p className={`leading-8 tracking-wide`}>
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className={`list-disc ${direction === 'rtl' ? 'pr-4' : 'pl-4'} space-y-2`}>
                        {children}
                      </ul>
                    ),
                    li: ({ children }) => (
                      <li className="leading-7">{children}</li>
                    ),
                  }}
                >
                  {data.awards[langauge]}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </section>
        <div className="my-24">
          <CTA />
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default AboutTemplate;
