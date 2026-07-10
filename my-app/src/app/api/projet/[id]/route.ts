import {
  NO_STORE_CACHE_HEADERS,
  ONE_YEAR_CACHE_HEADERS,
} from "@/lib/cache-policy";
import { getProjectById } from "@/lib/project-cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = Number(url.pathname.split("/").pop());

  if (!Number.isSafeInteger(id) || id <= 0 || id > 2_147_483_647) {
    return NextResponse.json(
      { message: "Identifiant de projet invalide." },
      { status: 400, headers: NO_STORE_CACHE_HEADERS },
    );
  }

  try {
    const project = await getProjectById(id);

    if (!project) {
      return NextResponse.json(
        { message: "Projet non trouvé." },
        { status: 404, headers: NO_STORE_CACHE_HEADERS },
      );
    }

    return NextResponse.json(project, {
      headers: ONE_YEAR_CACHE_HEADERS,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du projet :", error);

    return NextResponse.json(
      { message: "Erreur interne du serveur." },
      { status: 500, headers: NO_STORE_CACHE_HEADERS },
    );
  }
}
