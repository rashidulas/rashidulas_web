import { projects } from "@/data/projects";
import { notFound } from "next/navigation";

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);
  if (!project) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={project.image}
        alt={project.title}
        className="rounded mb-6 w-full object-cover max-h-[500px]"
      />
      <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
      <p className="text-gray-700">{project.description}</p>
    </div>
  );
}
