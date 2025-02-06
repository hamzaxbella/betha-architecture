
import { contactButtonTranslation } from "@/constants"
import { useLangaugeStore } from "@/hooks/LanguageStore"
import Link from "next/link"

const CTA = () => {

  const {langauge , font} = useLangaugeStore()
  
  return (
    <div className="rounded-3xl border flex flex-col lg:flex-row justify-center gap-4 text-justify lg:justify-between items-center py-12 px-5 max-w-[800px] mx-auto">
        <p className={`text-gray-600 max-w-[130ch] leading-relaxed !${font}`}>
        {langauge === 'ar' ? 'نحن هنا لتحويل أفكارك إلى واقع ملموس. فريقنا من المهندسين المعماريين المحترفين مستعد لمساعدتك في تحقيق رؤيتك وخلق مساحات مبتكرة تتجاوز توقعاتك.' :
         langauge === 'fr' ? 'Nous sommes là pour transformer vos idées en réalité tangible. Notre équipe d\'architectes professionnels est prête à vous aider à concrétiser votre vision et à créer des espaces innovants qui dépassent vos attentes.' :
         'We\'re here to transform your ideas into tangible reality. Our team of professional architects is ready to help you realize your vision and create innovative spaces that exceed your expectations.'}
        </p>
      <button className={`!${font} border px-8 py-2 h-[50px] rounded-full whitespace-nowrap  bg-black text-white `}><Link href={'/contact'}>{contactButtonTranslation[langauge]} </Link></button>
    </div>
  )
}

export default CTA