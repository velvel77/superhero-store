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
    accent: 'border-secondary-500 glow-red',
    textColor: 'text-secondary-500',
  },
  {
    name: 'TACTICAL SUITS',
    count: 89,
    image: suits,
    accent: 'border-effect-light-blue glow-blue',
    textColor: 'text-effect-light-blue',
  },
  {
    name: 'WEAPONS',
    count: 156,
    image: weapons,
    accent: 'border-secondary-500 glow-red',
    textColor: 'text-secondary-500',
  },
  {
    name: 'TECH & GADGETS',
    count: 203,
    image: tech,
    accent: 'border-primary-500 glow-yellow',
    textColor: 'text-primary-500',
  },
];

export default async function ShopCategories() {
  return (
    <section className="benday-dots bg-basic-700 py-8 border-y-2 border-ui-border">
      <div className=" mx-auto w-full max-w-260">
        <div className="text-base-white relative p-4 grid items-center">
          <div className="absolute mx-4 h-7 w-1 bg-primary-500"></div>
          <h2 className="px-4">Gear Categories</h2>
          <small className="px-4 text-basic-300">Browse by division</small>
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
              <div className="absolute inset-0 bg-linear-to-t from-basic-700 via-basic-700/40 to-transparent"></div>
              <span className="absolute bottom-4 left-4">
                <small className={`uppercase  ${item.textColor}`}>{item.count} items</small>
                <h3 className="text-basic-100 font-bold italic">{item.name}</h3>
                <div className="uppercase flex gap-2 items-center text-basic-300 text-[.7rem]">
                  <span className="transition-colors duration-300 group-hover:text-white">Explore</span>{' '}
                  <ArrowRight className="size-3 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
                </div>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
