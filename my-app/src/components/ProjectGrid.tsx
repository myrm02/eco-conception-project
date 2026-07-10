import Image from "next/image";
import Project from "@/types/Project";

export default function ProjectGrid({ projects, error }: { projects: Project[], error: string }) {
  return (
    <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {projects ? projects.map((project) => (
        <article
          key={project.id}
          className="flex flex-col items-center gap-3 rounded-lg bg-white p-4 shadow-sm ring-1 ring-black/5"
        >
          <Image
            src={project.images}
            alt={project.name}
            width={240}
            height={240}
            loading="lazy"
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 220px"
            className="aspect-square w-full max-w-56 rounded-md object-cover"
          />
          <p className="font-barlow text-base text-black">{project.name}</p>
        </article>
      )) : <article
          className="flex flex-col items-center gap-3 rounded-lg bg-white p-4 shadow-sm ring-1 ring-black/5"
        >
          <p className="font-barlow text-base text-black">{error}</p>
        </article>}
    </div>
  );
}