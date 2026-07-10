import prisma from "@/app/Prisma";
import { unstable_cache } from "next/cache";

const ONE_YEAR_IN_SECONDS = 31_536_000;
const CACHE_VERSION =
  process.env.CACHE_VERSION ?? process.env.VERCEL_GIT_COMMIT_SHA ?? "v1";

class ProjectNotFoundError extends Error {}

export const getProjects = unstable_cache(
  async (technology: string | null = null) =>
    prisma.projet.findMany({
      where: technology
        ? {
            technologies: {
              contains: technology,
            },
          }
        : {},
      select: {
        id: true,
        name: true,
        images: true,
        description: true,
      },
    }),
  ["projects", CACHE_VERSION],
  {
    revalidate: ONE_YEAR_IN_SECONDS,
    tags: ["projects"],
  },
);

const getExistingProjectById = unstable_cache(
  async (id: number) =>
    prisma.projet
      .findUnique({
        where: { id },
      })
      .then((project) => {
        if (!project) {
          throw new ProjectNotFoundError();
        }

        return project;
      }),
  ["project-by-id", CACHE_VERSION],
  {
    revalidate: ONE_YEAR_IN_SECONDS,
    tags: ["projects"],
  },
);

export async function getProjectById(id: number) {
  try {
    return await getExistingProjectById(id);
  } catch (error) {
    if (error instanceof ProjectNotFoundError) {
      return null;
    }

    throw error;
  }
}
