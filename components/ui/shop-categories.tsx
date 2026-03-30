import Image from 'next/image';
import masks from '@/public/masks.jpg';
import suits from '@/public/suits.jpg';
import weapons from '@/public/weapons.jpg';
import tech from '@/public/tech.jpg';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    name: 'MASKS & VISORS',
    count: 124,
    image: masks,
    accent: 'border-(--color-effect-red) glow-red',
    textColor: 'text-(--color-effect-red)',
  },
  {
    name: 'TACTICAL SUITS',
    count: 89,
    image: suits,
    accent: 'border-(--color-effect-light-blue) glow-blue',
    textColor: 'text-(--color-effect-light-blue)',
  },
  {
    name: 'WEAPONS',
    count: 156,
    image: weapons,
    accent: 'border-(--color-effect-red) glow-red',
    textColor: 'text-(--color-effect-red)',
  },
  {
    name: 'TECH & GADGETS',
    count: 203,
    image: tech,
    accent: 'border-(--color-effect-yellow) glow-yellow',
    textColor: 'text-(--color-effect-yellow)',
  },
];

export default function ShopCategories() {
  return (
    <section className="benday-dots bg-effect-blue py-8">
      <div className=" mx-auto w-full max-w-260">
        <div className="text-base-white relative p-4 grid items-center">
          <div className="absolute mx-4 h-7 w-1 bg-effect-yellow"></div>
          <h2 className="px-4">Gear Categories</h2>
          <small className="px-4 text-basic-400">Browse by division</small>
        </div>

        <div className="gap-6 place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-4">
          {categories.map((item) => (
            <Link
              className={`group relative overflow-hidden aspect-square grid border-2 ${item.accent}`}
              key={item.name}
              href={'/'}
            >
              <Image
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                src={item.image}
                alt={item.name}
                width={500}
                height={500}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-effect-blue via-effect-blue/40 to-transparent"></div>
              <span className="absolute bottom-4 left-4">
                <small className={`uppercase  ${item.textColor}`}>{item.count} items</small>
                <h3 className="text-base-white font-bold italic">{item.name}</h3>
                <div className="uppercase flex gap-2 items-center text-basic-400 text-[.6rem]">
                  <span className="transition-colors duration-300 group-hover:text-base-white">Explore</span>{' '}
                  <ArrowRight className="size-3 transition-all duration-300 group-hover:translate-x-1 group-hover:text-base-white" />
                </div>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
