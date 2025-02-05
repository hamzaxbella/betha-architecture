import { create } from 'zustand'
import gsap from 'gsap'

type LanguageStore = {
    langauge: 'fr' | 'ar' | 'en',
    direction: 'ltr' | 'rtl',
    font: string,
    setLangauge: (lang: 'fr' | 'ar' | 'en') => void
}

export const useLangaugeStore = create<LanguageStore>((set) => ({
    langauge: 'fr',
    direction: 'ltr',
    font: 'inherit',
    setLangauge: (lang) => {
        const overlay = document.querySelector('.fixed.inset-0.z-\\[9999\\]');
        if (overlay) {
            const tl = gsap.timeline();
            tl.to(overlay, {
                visibility: "visible",
                backdropFilter: "blur(20px)",
                duration: 0.5,
                ease: "power2.inOut"
            })
            .add(() => {
                set({
                    langauge: lang,
                    direction: lang === 'ar' ? 'rtl' : 'ltr',
                    font: lang === 'ar' ? 'font-cairo' : 'inherit'
                });
            })
            .to(overlay, {
                backdropFilter: "blur(0px)",
                duration: 0.5,
                delay: 0.2,
                ease: "power2.inOut"
            })
            .set(overlay, {
                visibility: "hidden"
            });
        }
    }
}))
