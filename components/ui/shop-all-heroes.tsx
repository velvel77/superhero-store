// import heroes from '@/data/heroes.json';
import Link from 'next/link';
import Image from 'next/image';
import type { Hero } from '@/app/types';

export default async function ShopAllHeroes() {
  const data = await fetch('http://localhost:5000/superheroes');
  const heroes = await data.json();

  console.log('This is heroess', heroes);

  return (
    <section className="diagonal-stripes py-8">
      <div className="max-w-260 mx-auto px-4">
        <div className="text-base-white relative p-4 grid items-center">
          <div className="absolute mx-4 h-7 w-1 bg-rarity-epic"></div>
          <h2 className="px-4">All Heroes</h2>
          <small className="px-4 text-basic-300">Browse selection</small>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 rounded-md px-2">
          {heroes.map((hero: Hero) => (
            <Link
              className=" group hover:glow-epic rounded-sm hover:cursor-pointer border border-primary-400"
              href={`/superheroes/${hero.id}`}
              key={hero.id}
            >
              <div className="relative mb-2">
                <div className="relative h-100 overflow-clip border-b border-primary-400 group-hover:glow-epic group-hover:border-rarity-epic rounded-sm">
                  <Image
                    className="w-full object-cover group-hover:scale-105 transition-all duration-200 rounded-sm"
                    src={hero.image_url}
                    alt={hero.name}
                    fill
                  />
                  <div className="inset-0 absolute bg-black/30 group-hover:bg-transparent transition-all duration-200"></div>
                </div>
                {/* Status */}
                <span
                  className={`text-xs ${hero.name.includes('e') ? 'text-rarity-uncommon' : 'text-secondary-500'} backdrop-blur-2xl px-2 rounded-sm absolute top-2 right-2 text-shadow-sm text-shadow-black`}
                >
                  {hero.name.includes('e') ? 'Available' : 'Unavailable'}
                </span>
              </div>
              <div className="flex flex-col p-2">
                <span className="text-2xl italic group-hover:tracking-widest transition-all duration-200 group-hover:text-shadow-rarity-epic font-bold text-shadow-secondary-600 text-shadow-sm">
                  {hero.name}
                </span>
                <div className="py-4 mb-4">
                  {/* Hourly fee */}
                  <span className="text-primary-500 text-2xl">500</span> <span className="text-[.5rem]"> / hour</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
