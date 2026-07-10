// app/projet/[id]/page.tsx
import { getProjectById } from "@/lib/project-cache";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export const dynamic = "force-static";
export const revalidate = 31536000;

export default async function ProjetDetailsPage(props: Props) {
    const params = await props.params;
    const id = Number(params.id);

    if (!Number.isSafeInteger(id) || id <= 0 || id > 2_147_483_647) {
        notFound();
    }

    const projet = await getProjectById(id);

    if (!projet) {
        notFound();
    }

    return (
        <div className="p-6 lg:p-12 bg-gray-50" aria-label={"Page de détail du projet" + projet.name}>

            <div className="mb-20">
                <h1 className="text-5xl lg:text-5xl text-gray-900 font-sans">{projet.name}</h1>
                <p className="text-lg text-gray-600" aria-label="Client du projet">
                    <strong className="text-lg font-semibold text-gray-700">Client :</strong> {projet.client}
                </p>
            </div>


            <div className="flex flex-col lg:flex-row items-center lg:items-start  gap-12">

                <div className="w-full lg:w-1/2 flex justify-center">
                    <Image
                        src={projet.images}
                        width={400}
                        height={300}
                        alt={projet.name}
                        priority={true}
                        className="rounded-xl shadow-lg"
                    />
                </div>

                <div className="grid grid-cols-2 gap-y-4 mt-10" aria-label="Informations sur le projet">
                    <div className="text-lg font-semibold text-gray-700" aria-label="Contexte du projet">Contexte</div>
                    <div className="text-lg text-gray-600">{projet.contexte}</div>

                    <div className="text-lg font-semibold text-gray-700" aria-label="Objectifs du projet">Objectifs</div>
                    <div className="text-lg text-gray-600">{projet.objectifs}</div>

                    <div className="text-lg font-semibold text-gray-700" aria-label="Technologies intégrés dans le projet">Technologies</div>
                    <div className="text-lg text-gray-600">{projet.technologies}</div>

                    <div className="text-lg font-semibold text-gray-700" aria-label="Résultats du projet">Résultats</div>
                    <div className="text-lg text-gray-600">{projet.resultats}</div>

                    {projet.testimonials && (
                        <>
                            <div className="text-lg font-semibold text-gray-700" aria-label="Témoignage sur le projet">Témoignages</div>
                            <div className="text-lg text-gray-600">{projet.testimonials}</div>
                        </>
                    )}

                    {projet.videos && (
                        <>
                            <div className="text-lg font-semibold text-gray-700" aria-label="Lien de la vidéo du projet">Vidéos</div>
                            <a className="text-lg text-blue-800 underline hover:text-blue-900 font-bold" href={projet.videos} target="_blank" rel="noopener noreferrer">Lien</a>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
