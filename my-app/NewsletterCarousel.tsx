import Image from 'next/image';

const cinemaLogos = [
  { src: "/The-Greatest-Showman.png", alt: "Projet cinema" },
  { src: "/fiction-app.jpg", alt: "Application fictive" },
  { src: "/creative-events.jpg", alt: "Evenement creatif" },
  { src: "/software.jpg", alt: "Logiciel sur mesure" },
  { src: "/office.jpg", alt: "Studio de creation" },
  { src: "/test.jpg", alt: "Prototype digital" },
];

const NewsCarousel: React.FC = () => {
  const animatedLogos = [...cinemaLogos, ...cinemaLogos];

  return (
    <div className="relative mx-auto flex w-full max-w-7xl overflow-hidden py-8 [mask-image:_linear-gradient(to_right,transparent_0,_black_96px,_black_calc(100%-96px),transparent_100%)]">
      <ul className="flex min-w-max animate-infinite-scroll items-stretch gap-8 pr-8 will-change-transform">
        {animatedLogos.map((logo, index) => (
          <li
            key={`${logo.alt}-${index}`}
            className="flex h-72 w-72 shrink-0 flex-col overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black/10 sm:h-80 sm:w-96"
            aria-hidden={index >= cinemaLogos.length}
          >
            <Image
              src={logo.src}
              alt={index >= cinemaLogos.length ? "" : logo.alt}
              width={420}
              height={260}
              loading="lazy"
              sizes="(max-width: 640px) 288px, 384px"
              className="h-52 w-full object-cover sm:h-60"
            />
            <div className="flex flex-1 items-center justify-center p-4 text-center">
              <p className="font-dm-sans text-lg font-semibold text-black">
                {logo.alt}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsCarousel;
