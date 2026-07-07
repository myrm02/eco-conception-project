"use client"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import LogoCarousel from "../../Carousel";
import NewsCarousel from "../../Newsletter Carousel";
// import { CldImage } from 'next-cloudinary';
// import Rating from "../../Rating";
// import LinkButton from "../../LinkButton";

export default function Home() {
  // const [rating, setRating] = useState(3);
  const bottomRef = useRef<HTMLDivElement>(null);

  const words: string[] = ["et de développement créatif", "spécialisé dans l'industrie cinématographique", "pionniers dans le contenu digitale fictifs", "pionners dans le développement d'expositions créatifs", "à Paris", "à Lyon"];

  const [currentWord, setCurrentWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleType = () => {
      const fullText = words[loopNum % words.length];
      setCurrentWord(isDeleting ? fullText.substring(0, index - 1) : fullText.substring(0, index + 1));
      setIndex(isDeleting ? index - 1 : index + 1);

      if (!isDeleting && index === fullText.length) {
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && index === 0) {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const typingSpeed = isDeleting ? 50 : 150;
    const timer = setTimeout(handleType, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentWord, isDeleting, index, loopNum]);


  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <main className="flex flex-col sm:items-start">
      <header className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden">
        {/* <nav className="relative z-30 p-5 text-2xl text-black bg-purple-300 bg-opacity-50 rounded-xl">
          <a href="">Nos projets web</a>
          <a href="">Contenus web</a>
        </nav> */}
        <div className="relative z-30 p-5 text-7xl text-black max-w-[1200px]">
          Agence digitale pour le cinéma à Paris et Lyon
        </div>
        <button
        onClick={scrollToBottom}
        className="relative z-30 px-4 py-2 bg-white text-black rounded hover:bg-blue-700"
      >
        En savoir plus
      </button>
        <video autoPlay loop muted className="absolute z-10 w-auto min-w-full min-h-full max-w-none">
          <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />Your browser does not support the video tag.
        </video>
      </header>
      <div className="relative flex flex-col mx-auto justify-center my-12" ref={bottomRef}>
        <p className="text-black mx-auto font-dm-sans text-xl pb-7">L24</p>
        <p className="text-black font-raleway max-w-[980px] text-4xl">Services web pour des productions cinématographique (applications, contenu, simulation de stream...)</p>
      </div>
      <div className="mb-5 h-1 bg-gray-200">
  <div className="h-1 bg-purple-500" style={{width: "75%"}}></div>
</div>
      <div className="relative w-full flex flex-col items-center justify-center mb-12 overflow-hidden">
        <div className="relative z-30 p-5 text-5xl text-black font-dm-sans max-w-[840px]">
          {"Une agence web, d'édition logiciels"} {currentWord}
        </div>
        <div className="relative z-30 p-5 text-black max-w-[1000px] font-raleway">
        {"L20 (on verra le nom après ) est une agence spécialisée dans le développement web, l'édition de logiciels et la création de contenus créatifs pour l'industrie cinématographique. Grâce à notre expertise et notre expérience, nous vous accompagnons dans la réalisation de sites web innovants, de logiciels sur mesure, et de projets créatifs variés."}
        {""}
        {"Nous offrons également des services de développement de plateformes e-learning, de gestion de contenu, et de solutions interactives pour enrichir vos projets cinématographiques. Notre équipe est dédiée à fournir des solutions de haute qualité qui répondent aux besoins spécifiques de chaque client."}
        {""}
        {"Depuis plusieurs années, nous collaborons avec des entreprises de renom dans le secteur du cinéma, et nous sommes fiers de contribuer à leur succès et à leur croissance."}
        </div>
        {/* <div>
          <LinkButton pageRoute={"/contact"}>
            <button>Contactez-nous</button>
          </LinkButton>
        </div> */}
        <Image
            aria-hidden
            src="/office.jpg"
            alt="Globe icon"
            width={0}
            height={0}
            className="absolute z-10 w-full min-w-full min-h-full max-w-none"
          />
      </div>
      <div className="relative flex flex-col mx-auto">
        <p className="text-black mx-auto text-5xl pb-3 font-dm-sans">Contenus fictifs</p>
        <p className="text-black max-w-[1000px] font-raleway">
          {"Depuis de nombreuses années, nous offrons des services d'édition de contenus web fictifs spécialement conçus pour répondre aux besoins variés de l'industrie cinématographique. Que ce soit pour des besoins temporaires ou pour la promotion d'un film ou d'une série, nous vous accompagnons dans la création de solutions web sur mesure."}
          {""}
          {"Nous développons des applications personnalisées et des sites web innovants qui répondent aux exigences uniques de chaque projet cinématographique. Notre expertise nous permet de vous offrir des plateformes interactives et des outils de gestion de contenu qui enrichissent vos productions."}
        </p>
      {/* <div>
          <LinkButton pageRoute={"/contact"}>
            <button>Contactez-nous</button>
          </LinkButton>
        </div> */}
      </div>

<div className="relative w-full flex flex-col items-center justify-center my-12 overflow-hidden">
        <div className="relative z-30 p-5 text-5xl text-black font-dm-sans">
        {"Et si votre projet passez à l'IA générative ?"}
        </div>
        <div className="relative z-30 p-5 max-w-[1000px] text-black font-raleway">
        {"Vous avez un projet de film cinématographique nécessitant des assets graphiques 3D ou 2D automatisés ? C’est maintenant possible grâce à notre service d'IA générative ! Nous créons des assets graphiques de haute qualité pour vos productions cinématographiques, qu'il s'agisse de films, de séries ou de publicités."}

{"Grâce à notre technologie avancée et à notre expertise en intelligence artificielle, nous générons des éléments visuels qui s'intègrent parfaitement à vos projets. Nous nous occupons de tout, de la conception à la réalisation, pour vous offrir des solutions graphiques innovantes et automatisées."}

{"Passez le cap de la production cinématographique avec nos services d'IA générative et donnez vie à vos idées avec des assets graphiques de qualité professionnelle."}
        </div>
        {/* <div>
          <LinkButton pageRoute={"/contact"}>
            <button>Contactez-nous</button>
          </LinkButton>
        </div> */}
        <Image
            aria-hidden
            src="/office.jpg"
            alt="Globe icon"
            width={0}
            height={0}
            className="absolute z-10 w-full min-w-full min-h-full max-w-none"
          />
      </div>
        
      <div className="relative grid grid-cols-4 gap-2 px-60 text-black my-12">
        <div className="flex flex-col">
          <Image
            aria-hidden
            src="https://img.icons8.com/material/50/737373/source-code.png"
            alt="Globe icon"
            width={86}
            height={86}
          />
          <p>4500</p>
          <p className="font-barlow">Site web réalisés</p>
        </div>
        <div className="flex flex-col">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="86" height="86" viewBox="0 0 24 24"
style={{fill:"#737373"}}>
<path d="M 12.173828 0.72070312 C 12.070828 0.72045313 11.966188 0.734625 11.867188 0.765625 L 1.9511719 3.9023438 C 1.8311719 3.9303438 1.7163281 3.9807344 1.6113281 4.0527344 C 1.3393281 4.2397344 1.1777344 4.5499063 1.1777344 4.8789062 L 1.1777344 17.863281 C 1.1777344 18.259281 1.4104375 18.619297 1.7734375 18.779297 L 11.765625 23.195312 C 11.894625 23.252312 12.032922 23.28125 12.169922 23.28125 C 12.307922 23.28125 12.445219 23.253312 12.574219 23.195312 C 13.523219 22.773312 21.864766 19.065688 22.384766 18.804688 C 22.723766 18.634687 22.936547 18.287203 22.935547 17.908203 L 22.902344 4.8808594 C 22.902344 4.8558594 22.902391 4.8287344 22.900391 4.8027344 C 22.870391 4.3987344 22.598891 4.0527344 22.212891 3.9277344 L 12.478516 0.76757812 C 12.379516 0.73557812 12.276828 0.72095312 12.173828 0.72070312 z M 12.164062 2.7695312 L 19.037109 5 L 12.169922 7.5292969 L 5.234375 4.9628906 L 12.164062 2.7695312 z M 3.1777344 6.3320312 L 11.169922 9.2910156 L 11.169922 20.744141 L 3.1777344 17.212891 L 3.1777344 6.3320312 z M 20.90625 6.4414062 L 20.933594 17.271484 C 19.432594 17.952484 15.352922 19.772188 13.169922 20.742188 L 13.169922 9.2929688 L 20.90625 6.4414062 z M 20.554688 7.984375 L 19.558594 8.3378906 L 18.722656 14.892578 L 17.630859 9.0761719 L 16.763672 9.3652344 L 15.703125 16.240234 L 14.738281 10.072266 L 13.615234 10.457031 L 15.027344 18.554688 L 16.185547 18.007812 L 17.181641 11.550781 L 18.240234 17.269531 L 19.365234 16.818359 L 20.554688 7.984375 z M 6.9003906 9.0449219 C 6.2693906 9.0449219 4.84375 9.0455625 4.84375 11.101562 C 4.84375 12.386563 6.1359062 13.40525 7.2539062 14.28125 C 8.4429063 15.21325 8.9560625 17.270672 7.4140625 17.013672 C 5.8720625 16.756672 5.9042969 14.763672 5.9042969 14.763672 C 5.9042969 14.763672 5.4550469 14.571453 4.7480469 14.314453 C 4.6520469 16.241453 6.1290625 17.784016 7.4140625 18.041016 C 8.0930625 18.177016 9.32925 18.297891 9.40625 16.337891 C 9.46925 14.698891 8.5292813 13.902063 7.8632812 13.414062 C 7.3412812 13.031062 5.8710937 11.872563 5.8710938 11.101562 C 5.8710938 10.844563 5.9683906 10.040266 6.9003906 10.072266 C 8.2813906 10.120266 8.3789063 12.193359 8.3789062 12.193359 C 8.3789062 12.193359 8.9567031 12.450125 9.4707031 12.578125 C 9.4707031 10.201125 8.1853906 9.0449219 6.9003906 9.0449219 z"></path>
</svg>
          <p>2500</p>
          <p className="font-barlow">Logiciels édités</p>
        </div>
        <div className="flex flex-col">
        <Image width={86} height={86} src="https://img.icons8.com/material-outlined/96/737373/graumans-chinese-theatre.png" alt="graumans-chinese-theatre"/>
          <p>4780</p>
          <p className="font-barlow">Participation aux évènements promotionnels</p>
        </div>
        <div className="flex flex-col">
        <Image width={86} height={86} src="https://img.icons8.com/material-outlined/96/737373/trophy.png" alt="trophy"/>
          <p>800</p>
          <p className="font-barlow">Clients satisfaits</p>
        </div>
      </div>
      <button
      type="button"
      className="relative mx-auto text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-5 transition-transform duration-500 ease-in-out transform hover:scale-110"
    >
      <Image width={96} height={96} src="https://img.icons8.com/material-rounded/96/FFFFFF/down.png" alt="down" />
      <span className="sr-only">Icon description</span>
    </button>
<div className="relative flex flex-col mx-auto my-12">
        <p className="text-black mx-auto font-[Roboto] pb-3">L24</p>
        <p className="text-black mx-auto text-2xl pb-7 font-dm-sans">Exemples de réalisation de site internet</p>
        <div className="relative grid grid-cols-4 gap-4 mx-auto text-black">
        <div className="flex flex-col">
          <Image
            aria-hidden
            src="/The-Greatest-Showman.png"
            alt="Globe icon"
            width={200}
            height={200}
          />
          <p className="font-barlow">Wesite 1</p>
        </div>
        <div className="flex flex-col">
          <Image
            aria-hidden
            src="/The-Greatest-Showman.png"
            alt="Globe icon"
            width={200}
            height={200}
          />
          <p className="font-barlow">Website 2</p>
        </div>
        <div className="flex flex-col">
          <Image
            aria-hidden
            src="/The-Greatest-Showman.png"
            alt="Globe icon"
            width={200}
            height={200}
          />
          <p className="font-barlow">Website 3</p>
        </div>
        <div className="flex flex-col">
          <Image
            aria-hidden
            src="/The-Greatest-Showman.png"
            alt="Globe icon"
            width={200}
            height={200}
          />
          <p className="font-barlow">Website 4</p>
        </div>
      </div>
      </div>
      <div className="relative flex flex-col mx-auto mbmy-12">
        <p className="text-black mx-auto font-[Roboto] pb-3">L24</p>
        <p className="text-black text-2xl pb-7 font-dm-sans">Exemples de réalisation de logiciels ou contenus fictifs</p>
        <div className="relative grid grid-cols-4 gap-4 mx-auto text-black">
        <div className="flex flex-col">
          <Image
            aria-hidden
            src="/The-Greatest-Showman.png"
            alt="Globe icon"
            width={200}
            height={200}
          />
          <p className="font-barlow">Software 1</p>
        </div>
        <div className="flex flex-col">
          <Image
            aria-hidden
            src="/The-Greatest-Showman.png"
            alt="Globe icon"
            width={200}
            height={200}
          />
          <p className="font-barlow">Software 2</p>
        </div>
        <div className="flex flex-col">
          <Image
            aria-hidden
            src="/The-Greatest-Showman.png"
            alt="Globe icon"
            width={200}
            height={200}
          />
          <p className="font-barlow">Software 3</p>
        </div>
        <div className="flex flex-col">
          <Image
            aria-hidden
            src="/The-Greatest-Showman.png"
            alt="Globe icon"
            width={200}
            height={200}
          />
          <p className="font-barlow">Software 4</p>
        </div>
      </div>
      </div>
      <div className="relative flex flex-col mx-auto my-12">
        <p className="text-black mx-auto font-nunito-sans pb-3">L24</p>
        <p className="text-black text-2xl pb-7 font-dm-sans">Exemples de réalisation créatifs évènementiels</p>
        <div className="relative grid grid-cols-4 gap-4 mx-auto text-black">
        <div className="flex flex-col">
          <Image
            aria-hidden
            src="/The-Greatest-Showman.png"
            alt="Globe icon"
            width={200}
            height={200}
          />
          <p className="font-barlow">Creative dev 1</p>
        </div>
        <div className="flex flex-col">
          <Image
            aria-hidden
            src="/The-Greatest-Showman.png"
            alt="Globe icon"
            width={200}
            height={200}
          />
          <p className="font-barlow">Creative dev 2</p>
        </div>
        <div className="flex flex-col">
          <Image
            aria-hidden
            src="/The-Greatest-Showman.png"
            alt="Globe icon"
            width={200}
            height={200}
          />
          <p className="font-barlow">Creative dev 3</p>
        </div>
        <div className="flex flex-col">
          <Image
            aria-hidden
            src="/The-Greatest-Showman.png"
            alt="Globe icon"
            width={200}
            height={200}
          />
          <p className="font-barlow">Creative dev 4</p>
        </div>
      </div>
      </div>
      <div className="relative flex flex-col mx-auto my-12">
      <p className="text-black mx-auto text-2xl pb-7 font-dm-sans">Les services de L24</p>
      <div className="grid grid-cols-3 gap-4 max-auto text-black">
        <div className="flex flex-col">
          <Image
            aria-hidden
            src="/fiction-app.jpg"
            alt="Globe icon"
            width={100}
            height={100}
            className="rounded-full object-center"
          />
          <p className="pb-3">L24</p>
          <p className="text-2xl font-quicksand">Contenus web fictifs</p>
        </div>
        <div className="flex flex-col">
          <Image
            aria-hidden
            src="/software.jpg"
            alt="Globe icon"
            width={100}
            height={100}
            className="rounded-full object-center"
          />
          <p className="pb-3">L24</p>
          <p className="text-2xl font-quicksand">Edition logiciels</p>
        </div>
        <div className="flex flex-col">
          <Image
            aria-hidden
            src="/creative-events.jpg"
            alt="Globe icon"
            width={100}
            height={100}
            className="rounded-full object-center"
          />
          <p className="pb-3">L24</p>
          <p className="text-2xl font-quicksand">Setup interactifs promotionnels</p>
        </div>
      </div>
      </div>
      
      {/* <div>
          <LinkButton pageRoute={"/contact"}>
            <button>Contactez-nous</button>
          </LinkButton>
        </div> */}
      <div className="relative flex flex-col mx-auto mb-12">
        <p className="text-black mx-auto pb-3">L24</p>
        <p className="text-black mx-auto text-2xl pb-7 font-dm-sans">Ils nous font confiance</p>
        <LogoCarousel/>
      </div>
      {/* <div className="relative flex flex-col mx-auto mb-12">
        <p className="text-black text-2xl">Ce que nos clients pensent de nos services : (grid and last review grades only at the bottom)</p>
      </div> */}
      <div className="relative flex flex-col mx-auto mb-12">
        <p className="text-black mx-auto">L24</p>
        <p className="text-black mx-auto text-2xl pb-7 font-dm-sans">Articles récents</p>
        <NewsCarousel />
      </div>
      </main>
      <footer className="flex flex-col px-20 text-white bg-blue-950">
        <div className="pt-10 text-xl">

          <div className="flex flex-col">
          <div className="flex gap-x-10 pb-10 font-bold">
          <div className="font-dm-sans">
            L24 Agency
          </div>
          <div>
            Agence et prestatire de réalisations web pour le cinéma
          </div>
          </div>
          <hr></hr>
          </div>

        </div>

        <div className="flex flex-col pt-10 text-lg">
          <div className="flex gap-x-3 pb-5">
          <div className="flex flex-col">

<div className="font-dm-sans font-bold">L24 Corporation PARIS & LYON</div> 
<div className="flex gap-x-2">
  <div className="font-bold">
    Téléphone:
  </div>
  <p>06 37 89 46 91 70</p>
</div> 

<div className="flex gap-x-2">
  <div className="font-bold">
    Adresses:
  </div>
  <p>2 rue Pasquier - 75008 Paris & 5 avenue Maurice Denis - 30070 Lyon</p>
</div> 

<div className="flex underline-offset-1 gap-x-2">
  <a href="">contact@l24.com</a>
</div> 

</div>
<div className="flex flex-col">

<div className="font-dm-sans font-bold">Liens rapides</div> 
<div className="flex">
  <div>
    Contenus fictifs web -
  </div>
  <div>
    Editions de logiciels de Chat - 
  </div>
  <div>
    Environnements créatifs
  </div>
</div> 
        </div>
          </div>
        <div className="grid grid-cols-3 mx-auto pb-10">
          <div>
            <a href="https://www.instagram.com/a24/">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 24 24"
style={{fill:"#FFFFFF"}}>
    <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path>
</svg>
            </a>
          </div>
          <div>
            <a href="https://www.linkedin.com/company/a24/">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 24 24"
style={{fill:"#FFFFFF"}}>
    <path d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M7.738,17L7.738,17 c-0.697,0-1.262-0.565-1.262-1.262v-4.477C6.477,10.565,7.042,10,7.738,10h0C8.435,10,9,10.565,9,11.262v4.477 C9,16.435,8.435,17,7.738,17z M7.694,8.717c-0.771,0-1.286-0.514-1.286-1.2s0.514-1.2,1.371-1.2c0.771,0,1.286,0.514,1.286,1.2 S8.551,8.717,7.694,8.717z M16.779,17L16.779,17c-0.674,0-1.221-0.547-1.221-1.221v-2.605c0-1.058-0.651-1.174-0.895-1.174 s-1.058,0.035-1.058,1.174v2.605c0,0.674-0.547,1.221-1.221,1.221h-0.081c-0.674,0-1.221-0.547-1.221-1.221v-4.517 c0-0.697,0.565-1.262,1.262-1.262h0c0.697,0,1.262,0.565,1.262,1.262c0,0,0.282-1.262,2.198-1.262C17.023,10,18,10.977,18,13.174 v2.605C18,16.453,17.453,17,16.779,17z"></path>
</svg></a>
          </div>
          <div>
            <a href="https://www.youtube.com/@A24">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0,0,256,256"
style={{fill:"#FFFFFF"}}>
<g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" style={{mixBlendMode: "normal"}}><g transform="scale(10.66667,10.66667)"><path d="M21.582,6.186c-0.23,-0.86 -0.908,-1.538 -1.768,-1.768c-1.56,-0.418 -7.814,-0.418 -7.814,-0.418c0,0 -6.254,0 -7.814,0.418c-0.86,0.23 -1.538,0.908 -1.768,1.768c-0.418,1.56 -0.418,5.814 -0.418,5.814c0,0 0,4.254 0.418,5.814c0.23,0.86 0.908,1.538 1.768,1.768c1.56,0.418 7.814,0.418 7.814,0.418c0,0 6.254,0 7.814,-0.418c0.861,-0.23 1.538,-0.908 1.768,-1.768c0.418,-1.56 0.418,-5.814 0.418,-5.814c0,0 0,-4.254 -0.418,-5.814zM10,14.598v-5.196c0,-0.385 0.417,-0.625 0.75,-0.433l4.5,2.598c0.333,0.192 0.333,0.674 0,0.866l-4.5,2.598c-0.333,0.193 -0.75,-0.048 -0.75,-0.433z"></path></g></g>
</svg>
            </a>
          </div>
        </div>
        <hr></hr>
        </div>

        <div className="p-4">

          <div className="flex flex-col text-base p-5">
          <div className="flex gap-10">
          <div className="flex gap-x-2 max-w-[200px]">
            <Image src="https://img.icons8.com/?size=100&id=88661&format=png&color=FFFFFF" width={10} height={10} alt="copyright"/>
            <p className="font-dm-sans font-bold">2025</p>
          </div>
          <div className="font-raleway">
            Tous droits réservés L24 Corporation
          </div>
          </div>
          </div>

        </div>
          {/* <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          /> */}
          {/* <CldImage
          src="cld-sample-5" // Use this sample image or upload your own via the Media Explorer
          width="500" // Transform the image: auto-crop to square aspect_ratio
          height="500"
          crop={{
            type: 'auto',
            source: true
          }} alt={"Random image test"}
          /> */}
          {/* <Image
          src="cld-sample-5" // Use this sample image or upload your own via the Media Explorer
          width={16}
          height={16}
          alt={"Random image test"}
          /> */}
      </footer>
    </div>
  );
}
