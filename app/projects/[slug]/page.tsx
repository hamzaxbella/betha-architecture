import SingleProjectTemplate from "@/components/Templates/SingleProjectTemplate"
import { getProject } from "@/services/ProjectsService"

const page = async ({params} : {params  : Promise<{slug : string}>}) => {

  const {slug} = await params
  
  const Project = await getProject(slug)

    
  return (
    <section>
      <SingleProjectTemplate  project = {Project}/>
    </section>
  )
}

export default page