import Image from 'next/image';

const logos = [
  { src: "/warner.png", alt: "Warner Bros" },
  { src: "/pixar.png", alt: "Pixar" },
  { src: "/sandfall-interactive.png", alt: "Standfall Interactive" },
  { src: "/apple.png", alt: "Apple" },
  { src: "/netflix.png", alt: "Netflix" },
  { src: "/kbs.svg", alt: "KBC" },
  { src: "/rakuten.png", alt: "Rakuten" },
  { src: "/universal.svg", alt: "Universal" },
];

const LogoCarousel: React.FC = () => {
  const animatedLogos = [...logos, ...logos];

  return (
    <div className="relative mx-auto flex w-full max-w-7xl overflow-hidden py-8 [mask-image:_linear-gradient(to_right,transparent_0,_black_96px,_black_calc(100%-96px),transparent_100%)]">
      <ul className="flex min-w-max animate-infinite-scroll items-center gap-12 pr-12 will-change-transform">
        {animatedLogos.map((logo, index) => (
          <li
            key={`${logo.alt}-${index}`}
            className="flex h-32 w-56 shrink-0 items-center justify-center rounded-lg bg-white p-6 shadow-md ring-1 ring-black/10 sm:h-40 sm:w-72"
            aria-hidden={index >= logos.length}
          >
            <Image
              src={logo.src}
              alt={index >= logos.length ? "" : logo.alt}
              width={220}
              height={110}
              loading="lazy"
              sizes="(max-width: 640px) 224px, 288px"
              className="max-h-24 w-auto object-contain sm:max-h-28"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogoCarousel;
