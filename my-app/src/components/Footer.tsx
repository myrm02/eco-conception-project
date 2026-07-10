import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-blue-950 px-4 py-10 text-white sm:px-8 lg:px-20">
                <div className="mx-auto flex max-w-6xl flex-col gap-8 text-center lg:text-left">
                  <div className="flex flex-col gap-4 border-b border-white/30 pb-8 text-xl font-bold lg:flex-row lg:justify-between">
                    <Link href="/" className="font-dm-sans">L24 Agency</Link>
                    <p>Agence et prestataire de realisations web pour le cinema</p>
                  </div>
        
                  <div className="grid gap-8 text-base lg:grid-cols-2" aria-label="Informations générale">
                    <div className="flex flex-col gap-3" aria-label="Informations générale de l'agence">
                      <p className="font-dm-sans font-bold" aria-label="Titre de l'entreprise">
                        L24 Corporation PARIS & LYON
                      </p>
                      <p aria-label="Téléphone de l'entreprise">
                        <span className="font-bold">Telephone : </span>
                        06 37 89 46 91 70
                      </p>
                      <p aria-label="Adresse de l'entreprise">
                        <span className="font-bold">Adresses : </span>2 rue Pasquier -
                        75008 Paris & 5 avenue Maurice Denis - 30070 Lyon
                      </p>
                      <p aria-label="E-mail de l'entreprise">
                        <span className="font-bold">E-mail : </span><Link href="mailto:contact@l24.com" className="underline">contact@l24.com</Link> ou <Link href="/contact" className="underline">Formulaire de contact</Link>
                      </p>
                    </div>
        
                    <div className="flex flex-col gap-3" aria-label="Liens rapides">
                      <p className="font-dm-sans font-bold">Liens rapides</p>
                      <div className="flex flex-row gap-x-2 ">
                        <Link href="/projet">Contenus fictifs web</Link> - <Link href="/projet">Editions de logiciels</Link> - <Link href="/projet">Applications évènementiels</Link>
                      </div>
                    </div>
                  </div>
        
                  <div className="flex justify-center gap-8 border-b border-white/30 pb-8">
                    <Link href="https://www.instagram.com/a24/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                      Instagram
                    </Link>
                    <Link href="https://www.linkedin.com/company/a24/" aria-label="LinkedIn">
                      LinkedIn
                    </Link>
                    <Link href="https://www.youtube.com/@A24" aria-label="YouTube">
                      YouTube
                    </Link>
                  </div>
        
                  <div className="flex flex-col items-center justify-center gap-3 text-sm sm:flex-row">
                    <Image
                      src="/copyright.png"
                      width={14}
                      height={14}
                      alt="Copyright logo"
                    />
                    <p className="font-dm-sans font-bold">2026</p>
                    <p className="font-raleway">Tous droits reservés L24 Corporation</p>
                  </div>
                </div>
              </footer>
    )
}