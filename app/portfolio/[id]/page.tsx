import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);
  if (!project) return notFound();

  return (
    <div className="w-full bg-white text-gray-800 py-12 px-4 sm:px-6 lg:px-16 space-y-12">
      {/* Project content here */}
    </div>
  );
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}
