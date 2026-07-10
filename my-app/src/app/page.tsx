"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Project from "@/types/Project";
import RevealSection from "@/components/RevealSection";
import ProjectGrid from "@/components/ProjectGrid";
import ContactButton from "@/components/ContactButton";
import LogoCarousel from "../../LogoCarousel";
import NewsCarousel from "../../NewsletterCarousel";
import LinkButton from "../../LinkButton";

const words = [
  "dans l'industrie audiovisuel",
  "dans la concpetion fictive",
  "à Paris",
  "à Lyon",
];

const stats = [
  {
    icon: "/source-code-icon.png",
    label: "Sites web realises",
    value: "4500",
  },
  {
    label: "Logiciels edites",
    value: "2500",
    customIcon: true,
  },
  {
    icon: "/graumans-chinese-theatre.png",
    label: "Participations aux evenements promotionnels",
    value: "4780",
  },
  {
    icon: "/trophy.png",
    label: "Clients satisfaits",
    value: "800",
  },
];

const services = [
  {
    image: "/fiction-app.jpg",
    label: "Contenus web fictifs",
  },
  {
    image: "/software.jpg",
    label: "Edition de logiciels",
  },
  {
    image: "/creative-events.jpg",
    label: "Setups interactifs promotionnels",
  },
];

export default function Home() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [currentWord, setCurrentWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [index, setIndex] = useState(0);
  const [showHeroVideo, setShowHeroVideo] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [tech, setTech] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadVideo = () => setShowHeroVideo(true);
    const browserWindow = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (
          callback: IdleRequestCallback,
          options?: IdleRequestOptions,
        ) => number;
        cancelIdleCallback?: (handle: number) => void;
      };

    if (browserWindow.requestIdleCallback) {
      const idleId = browserWindow.requestIdleCallback(loadVideo, {
        timeout: 2200,
      });
      return () => browserWindow.cancelIdleCallback?.(idleId);
    }

    const timer = setTimeout(loadVideo, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleType = () => {
      const fullText = words[loopNum % words.length];
      setCurrentWord(
        isDeleting
          ? fullText.substring(0, index - 1)
          : fullText.substring(0, index + 1),
      );
      setIndex(isDeleting ? index - 1 : index + 1);

      if (!isDeleting && index === fullText.length) {
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && index === 0) {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, isDeleting ? 50 : 150);

    return () => clearTimeout(timer);
  }, [isDeleting, index, loopNum]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const techParam = queryParams.get('tech');
    if (techParam) {
      setTech(techParam); 
    }
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let query = '/api/projet';
        if (tech) {
          query += `?tech=${tech}`; 
        }
        const response = await fetch(query);
        const data = await response.json();
        setProjects(data.slice(data.length - 4, data.length));
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Une erreur est survenue : ${err.message}`);
        } else {
          setError('Une erreur inconnue est survenue.');
        }
      }
    };
    fetchProjects();
  }, [tech]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="flex flex-col items-center overflow-hidden" aria-label="Page d'accueil">
        <header className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[url('/img/mountains.jpg')] bg-cover bg-center px-4 text-center" aria-label="Haut de page">
          <div className="absolute inset-0 z-20 bg-white/35" aria-label="Présentation de l'entreprise"/>
          {showHeroVideo && (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 z-10 h-full w-full object-cover"
            >
              <source
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
            </video>
          )}

          <div className="relative z-30 flex w-full max-w-6xl flex-col items-center gap-8">
            <div className="flex flex-wrap justify-center gap-4 rounded-full bg-white/80 px-5 py-3 text-sm font-semibold text-black backdrop-blur sm:text-base">
              <p aria-label="Nom de l'entrepise">L24 Agency</p>
            </div>

            <h1 className="max-w-5xl text-balance font-dm-sans text-4xl font-bold leading-tight text-black sm:text-5xl lg:text-7xl" aria-label="Slogan de l'entreprise">
              Agence digitale pour le cinéma à Paris et Lyon
            </h1>

            <button
              onClick={scrollToBottom}
              className="rounded-full bg-blue-900 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800 sm:text-lg"
              aria-label="Bouton de défilement vers le bas de la page"
            >
              En savoir plus
            </button>
          </div>
        </header>

        <RevealSection className="pt-16" slideFrom="bottom">
          <div ref={bottomRef} className="flex gap-5">
            <p className="text-balance font-raleway text-3xl leading-tight sm:text-4xl" aria-label="Description des services de l'entreprise">
              Services web pour des productions cinematographiques : applications, contenus et simulations de stream.
            </p>
          </div>
        </RevealSection>

        <RevealSection className="max-w-none bg-blue-900" slideFrom="left">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-7 px-4">
            <h2 className="max-w-4xl text-balance text-white font-dm-sans text-3xl leading-tight sm:text-5xl">
              {"Une agence web, d'edition logiciels specialisée "} {currentWord}
            </h2>
            <p className="max-w-4xl whitespace-pre-line font-raleway text-base text-white leading-8 sm:text-lg" aria-label="Description de l'agence">
              {"L24 est une agence specialisee dans le developpement web,"}
              {"l'edition de logiciels et la creation de contenus creatifs pour"}
              {"l'industrie cinematographique. Nous vous accompagnons dans la"}
              {"realisation de sites web innovants, de logiciels sur mesure et de"}
              {"projets creatifs varies."}
            </p>
          </div>
        </RevealSection>

        <RevealSection slideFrom="right">
          <div className="flex flex-col items-center gap-5">
            <h2 className="font-dm-sans text-3xl sm:text-5xl">
              Contenus fictifs
            </h2>
            <p className="max-w-4xl font-raleway text-base leading-8 sm:text-lg" aria-label="Description des types de services proposés">
              {"Nous creons des contenus web fictifs pour repondre aux besoins de"}
              {"l'industrie cinematographique : applications personnalisees, sites"}
              {"innovants, plateformes interactives et outils de gestion de"}
              {"contenu pour enrichir les productions."}
            </p>
          </div>
        </RevealSection>

        <RevealSection className="max-w-none bg-blue-900" slideFrom="left">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-7 px-4">
            <h2 className="max-w-4xl text-balance text-white font-dm-sans text-3xl leading-tight sm:text-5xl">
              {"Et si votre projet passait a l'IA generative ?"}
            </h2>
            <p className="max-w-4xl whitespace-pre-line font-raleway text-base text-white leading-8 sm:text-lg" aria-label="Description des services de contenu 3D et 2D">
              {"Nous creons des assets graphiques 3D ou 2D automatises pour vos"}
              {"productions cinematographiques. De la conception a la realisation,"}
              {"notre technologie vous aide a produire des elements visuels qui"}
              {"s'integrent naturellement a vos projets."}
            </p>
            <ContactButton />
          </div>
        </RevealSection>

        <RevealSection lazy slideFrom="bottom" aria-label="Principaux statistiques">
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <article
                key={stat.label}
                className="flex flex-col items-center gap-3 rounded-lg bg-white p-5 shadow-sm ring-1 ring-black/5"
              >
                {stat.customIcon ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="86"
                    height="86"
                    viewBox="0 0 24 24"
                    style={{ fill: "#737373" }}
                    aria-hidden
                  >
                    <path d="M12.174.721c-.103 0-.208.014-.307.045L1.951 3.902a1 1 0 0 0-.773.977v12.984c0 .396.232.756.595.916l9.993 4.416a.997.997 0 0 0 .808 0c.949-.422 9.291-4.129 9.811-4.39.339-.17.552-.517.551-.896l-.034-13.028a1 1 0 0 0-.689-.953L12.479.768a1.01 1.01 0 0 0-.305-.047ZM12.164 2.77 19.037 5l-6.867 2.529-6.936-2.566 6.93-2.193ZM3.178 6.332l7.992 2.959v11.453l-7.992-3.531V6.332Zm17.728.109.028 10.83c-1.501.681-5.581 2.501-7.764 3.471V9.293l7.736-2.852Z" />
                  </svg>
                ) : (
                  <Image
                    src={stat.icon ?? ""}
                    alt=""
                    width={86}
                    height={86}
                    loading="lazy"
                  />
                )}
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="font-barlow text-base">{stat.label}</p>
              </article>
            ))}
          </div>
        </RevealSection>

        <RevealSection lazy slideFrom="right" aria-label="Exemples de réalisation de site web">
          <div className="flex flex-col items-center gap-6">
            <p
              className="font-dm-sans text-2xl text-black"
            >
              Exemples de réalisation de site web
            </p>
            <ProjectGrid projects={projects} error={typeof error === "undefined" ? "Une erreur est survenue" : error} />
            <LinkButton classname="inline-flex justify-center rounded-full bg-blue-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800" pageRoute="/projet" aria-label="Voir plus de projets">
                Voir plus de projets
            </LinkButton>
          </div>
        </RevealSection>

        <RevealSection lazy slideFrom="left" aria-label="Exemples de réalisation logiciels">
          <div className="flex flex-col items-center gap-6">
            <p
              className="font-dm-sans text-2xl text-black"
            >
              Exemples de réalisation de logiciels ou contenus fictifs
            </p>
            <ProjectGrid projects={projects} error={typeof error === "undefined" ? "Une erreur est survenue" : error} />
            <LinkButton classname="inline-flex justify-center rounded-full bg-blue-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800" pageRoute="/projet" aria-label="Voir plus de projets">
                Voir plus de projets
            </LinkButton>
          </div>
        </RevealSection>

        <RevealSection lazy slideFrom="right" aria-label="Exemples de réalisations créatives">
          <div className="flex flex-col items-center gap-6">
            <h2 className="font-dm-sans text-2xl">
              Exemples de réalisations créatives évènementielles
            </h2>
            <ProjectGrid projects={projects} error={typeof error === "undefined" ? "Une erreur est survenue" : error} />
            <LinkButton classname="inline-flex justify-center rounded-full bg-blue-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800" pageRoute="/projet" aria-label="Voir plus de projets">
                Voir plus de projets
            </LinkButton>
          </div>
        </RevealSection>

        <RevealSection lazy slideFrom="bottom" aria-label="Les services de l'agence">
          <div className="flex flex-col items-center gap-7">
            <h2 className="font-dm-sans text-2xl">Les services de L24</h2>
            <div className="grid w-full grid-cols-1 gap-7 sm:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.label}
                  className="flex flex-col items-center gap-4"
                >
                  <Image
                    src={service.image}
                    alt={service.label}
                    width={220}
                    height={220}
                    loading="lazy"
                    sizes="(max-width: 640px) 70vw, 220px"
                    className="aspect-square w-48 rounded-full object-cover"
                  />
                  <p className="font-quicksand text-2xl">{service.label}</p>
                </article>
              ))}
            </div>
          </div>
        </RevealSection>

        <RevealSection slideFrom="bottom" aria-label="Contactez-nous">
          <ContactButton />
        </RevealSection>

        <RevealSection slideFrom="left" aria-label="Les clients qui nous font confiance">
          <div className="flex flex-col items-center gap-7">
            <h2 className="font-dm-sans text-2xl">Ils nous font confiance</h2>
            <LogoCarousel />
          </div>
        </RevealSection>

        <RevealSection slideFrom="right" aria-label="Actualités de l'agence">
          <div className="flex flex-col items-center gap-7">
            <h2 className="font-dm-sans text-2xl">Articles récents</h2>
            <NewsCarousel />
          </div>
        </RevealSection>
      </main>
    </div>
  );
}
