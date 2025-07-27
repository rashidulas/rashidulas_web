import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";

type Props = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.id === params.id);
  if (!project) return notFound();

  return (
    <div className="w-full bg-white text-gray-800 py-12 px-4 sm:px-6 lg:px-16 space-y-12">
      <div className="w-full max-w-7xl mx-auto relative h-[500px]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover rounded-lg shadow-md"
        />
      </div>

      <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 border-b pb-2">
          {project.title}
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-gray-700">
          {project.description}
        </p>
      </div>

      {Array.isArray(project.awards) && project.awards.length > 0 && (
        <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow p-6 sm:p-10">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
            Awards & Recognition
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {project.awards.map((award, i) => (
              <li key={i}>{award}</li>
            ))}
          </ul>
        </div>
      )}

      {project.devpost && (
        <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow p-6 sm:p-10">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Devpost</h2>
          <a
            href={project.devpost}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-lg"
          >
            View on Devpost →
          </a>
        </div>
      )}

      {project.futurePlan && (
        <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow p-6 sm:p-10">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
            Future Plan
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            {project.futurePlan}
          </p>
        </div>
      )}
    </div>
  );
}
