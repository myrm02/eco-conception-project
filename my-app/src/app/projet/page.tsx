import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/lib/project-cache";
import {
  isProjectTechnology,
  PROJECT_TECHNOLOGIES,
} from "@/lib/project-technologies";

type Props = {
  searchParams?: Promise<{
    tech?: string | string[];
  }>;
};

export const revalidate = 31_536_000;

export default async function ProjectsPage(props: Props) {
  const searchParams = await props.searchParams;
  const techParam = searchParams?.tech;
  const tech = Array.isArray(techParam) ? techParam[0] : techParam;
  const selectedTech = tech?.trim() || null;
  const activeTech =
    selectedTech && isProjectTechnology(selectedTech) ? selectedTech : null;
  const projects = await getProjects(activeTech);

  return (
    <div className="container">
      <h1 className="page-title">NOS PROJETS</h1>
      <div className="technologies">
        <ul className="projects-techno">
          <li className={!activeTech ? "selected" : ""}>
            <Link href="/projet">Tous les projets</Link>
          </li>
          {PROJECT_TECHNOLOGIES.map((techItem) => (
            <li
              key={techItem}
              className={techItem === activeTech ? "selected" : ""}
            >
              <Link href={`/projet?tech=${encodeURIComponent(techItem)}`}>
                {techItem}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`project-card ${
              index % 3 === 1 ? "middle" : index % 3 === 0 ? "left" : "right"
            }`}
          >
            <div className="image-container">
              <div className="flipper">
                <Image
                  src={project.images}
                  alt={project.name}
                  className="project-image"
                  width={500}
                  height={350}
                />

                <div className="overlay">
                  <h2 className="project-title">{project.name}</h2>
                  <p className="description">{project.description}</p>
                  <a href={`/projet/${project.id}`} className="more-info-button">
                    Voir plus
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
