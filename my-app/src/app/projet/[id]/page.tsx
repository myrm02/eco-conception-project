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
        <div className="p-6 lg:p-12 bg-gray-50">

            <div className="mb-20">
                <h1 className="text-5xl lg:text-5xl text-gray-900 font-sans">{projet.name}</h1>
                <p className="text-lg text-gray-500">
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

                <div className="grid grid-cols-2 gap-y-4 mt-10">
                    <div className="text-lg font-semibold text-gray-700">Contexte</div>
                    <div className="text-lg text-gray-500">{projet.contexte}</div>

                    <div className="text-lg font-semibold text-gray-700">Objectifs</div>
                    <div className="text-lg text-gray-500">{projet.objectifs}</div>

                    <div className="text-lg font-semibold text-gray-700">Technologies</div>
                    <div className="text-lg text-gray-500">{projet.technologies}</div>

                    <div className="text-lg font-semibold text-gray-700">Résultats</div>
                    <div className="text-lg text-gray-500">{projet.resultats}</div>

                    {projet.testimonials && (
                        <>
                            <div className="text-lg font-semibold text-gray-700">Témoignages</div>
                            <div className="text-lg text-gray-500">{projet.testimonials}</div>
                        </>
                    )}

                    {projet.videos && (
                        <>
                            <div className="text-lg font-semibold text-gray-700">Vidéos</div>
                            <a className="text-lg text-blue-500 underline hover:text-blue-700" href={projet.videos} target="_blank" rel="noopener noreferrer"
> Lien</a>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
