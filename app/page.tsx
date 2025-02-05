import HomeTemplate from "@/components/Templates/HomeTemplate";
import { getCategories, getProjects } from "@/services/ProjectsService";

export default async function Home() {

  const categories = await getCategories()
  const projects = await getProjects()

  return (
    <section className="max-container h-[200vh] ">
      <HomeTemplate categories={categories} projects = {projects} />
    </section>
  );
}
