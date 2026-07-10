import {
  NO_STORE_CACHE_HEADERS,
  ONE_YEAR_CACHE_HEADERS,
} from "@/lib/cache-policy";
import { getProjects } from "@/lib/project-cache";
import { isProjectTechnology } from "@/lib/project-technologies";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const technology = url.searchParams.get("tech")?.trim() || null;

  if (technology && !isProjectTechnology(technology)) {
    return NextResponse.json(
      { message: "Technologie de projet invalide." },
      { status: 400, headers: NO_STORE_CACHE_HEADERS },
    );
  }

  try {
    const projects = await getProjects(technology);

    return NextResponse.json(projects, {
      headers: ONE_YEAR_CACHE_HEADERS,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des projets :", error);

    return NextResponse.json(
      { message: "Erreur interne du serveur." },
      { status: 500, headers: NO_STORE_CACHE_HEADERS },
    );
  }
}
