import AboutTemplate from "@/components/Templates/AboutTemplate"
import { getAboutContent } from "@/services/AboutService"

const page = async () => {

  const aboutData = await getAboutContent()
  
  return (
    <section className="max-container ">
      <AboutTemplate data={aboutData} />
    </section>
  )
}

export default page