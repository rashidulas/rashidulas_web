import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function PortfolioPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 pt-24 pb-10 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </main>
  );
}
