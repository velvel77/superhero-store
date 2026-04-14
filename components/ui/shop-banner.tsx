import { Zap, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const stats = [
  { title: 'Heroes Equipped', number: '12,850+' },
  { title: '5-Star Reviews', number: '98.7%' },
  { title: 'HQ Support', number: '24/7' },
];

export default function ShopBanner() {
  return (
    <section className="relative flex items-center border-b-2 border-ui-border h-140">
      <Image
        className="absolute -z-10 w-full object-cover bg-cover h-140"
        src={'/hero-landing.jpg'}
        alt="A caped hero standing on a rooftop, looking out over a city towards a lightningstorm in the distance"
        loading="eager"
        width={1920}
        height={800}
      />
      {/* Benday dots overlay on image*/}
      <div className="absolute inset-0 benday-dots z-10" aria-hidden="true"></div>

      {/* Gradient overlay on image */}
      <div className="absolute inset-0 bg-linear-to-r from-basic-900 via-basic-900/85 to-basic-900/40"></div>

      {/* Info overlay on image */}
      <div className="flex flex-col p-4 gap-4 w-full max-w-260 mx-auto z-10">
        <span className="px-4 tracking-[.2rem] text-[.6rem] uppercase text-secondary-500 text-shadow-black text-shadow-sm">
          /// Kinetic voltage collection - 2026 ///
        </span>
        <h1
          aria-describedby="site-description"
          className="uppercase text-basic-100 text-6xl font-bold italic flex flex-col px-2 gap-3"
        >
          <span className="text-shadow-md text-shadow-secondary-500">Unleash your</span>{' '}
          <span className="text-primary-500">inner legend</span>
        </h1>
        <div className="relative flex items-center pl-6">
          <span className="absolute left-4 h-0.5 w-20 bg-secondary-500"></span>
          <small id="site-description" className="text-basic-400 px-4 py-4 pl-20">
            Premium heroic equipment & tactical gear for the modern vigilante
          </small>
        </div>

        {/* Buttons */}
        <div className="text-basic-100 italic font-bold flex gap-2 px-4">
          <button className="group hover:cursor-pointer uppercase bg-secondary-500 flex gap-2 p-4 border-2 border-ui-border">
            <Zap className="" /> Shop Now{' '}
            <ArrowRight className="transition-transform duration-150 group-hover:translate-x-1" />
          </button>
          <button className="p-4 uppercase bg-basic-600 border-2 border-ui-border catalog-hover">View Catalog</button>
        </div>

        {/* Stats */}
        <div className="flex gap-4 p-4">
          {stats.map((stat) => (
            <div key={stat.title}>
              <span className="text-primary-500 font-bold pr-2 italic">{stat.number}</span>
              <small className="text-basic-400 text-[.6rem] uppercase">{stat.title}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
