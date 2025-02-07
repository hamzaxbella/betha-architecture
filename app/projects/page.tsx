import ProjectsTemplate from "@/components/Templates/ProjectsTemplate"
import { getCategories, getProjects } from "@/services/ProjectsService"

const page = async () => {

  const projects = await getProjects()
  const categories = await getCategories()
  
  return (
    <section className="max-container ">
      <ProjectsTemplate categories={categories} projects = {projects} />
    </section>
  )
}

export default page