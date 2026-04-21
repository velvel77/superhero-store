import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import placeholder from '@/public/placeholder.jpg';

const items = [
  {
    id: 1,
    image: placeholder,
    rarity: 'Legendary',
    description: 'Shadow ops tactical suit',
    price: 2450,
  },
  {
    id: 2,
    image: placeholder,
    rarity: 'Epic',
    description: 'Plasma surge gauntlets',
    price: 1890,
  },
  {
    id: 3,
    image: placeholder,
    rarity: 'Rare',
    description: 'Phantom visor MK-IV',
    price: 1250,
  },
  {
    id: 4,
    image: placeholder,
    rarity: 'Legendary',
    description: 'Liberty defender shield',
    price: 3200,
  },
];

const [featured, ...rest] = items;

export default function ShopFeaturedProducts() {
  return (
    <section id="featured-products-section" className="scroll-mt-18 p-4 pb-16 diagonal-stripes ">
      <div className="mx-auto max-w-260 w-full">
        <header className="p-4 py-8 relative grid items-center">
          <div className="absolute h-7 w-1 bg-secondary-500"></div>
          <h2 className="text-basic-100 font-bold uppercase italic">Featured products</h2>
          <small className="text-basic-300">Most requested by active heroes</small>
        </header>

        <div className="flex gap-4">
          {/* Featured */}
          <Link
            href={'/shop'}
            key={featured.id}
            className="group overflow-clip relative w-auto border-2 glow-red border-ui-border font-bold"
          >
            <Image
              className="object-cover w-100 h-140 group-hover:scale-110 transition-all duration-300"
              src={featured.image}
              alt=""
              width={1920}
              height={1080}
            />
            {/* Rarity */}
            <span
              className={`absolute text-[.7rem] border-ui-border border rounded-sm px-2 top-2 left-2 
              ${
                featured.rarity === 'Legendary'
                  ? 'bg-rarity-legendary text-basic-900'
                  : featured.rarity === 'Epic'
                    ? 'bg-rarity-epic'
                    : featured.rarity === 'Rare'
                      ? 'bg-rarity-rare'
                      : 'bg-rarity-uncommon text-basic-900'
              }`}
            >
              {featured.rarity}
            </span>
            <div className="absolute flex flex-col p-4 bottom-0 left-0">
              {/* Description */}
              <span className="uppercase text-sm italic">{featured.description}</span>
              {/* Price */}
              <span className="text-sm text-primary-500">${featured.price}</span>
            </div>
          </Link>

          {/* Rest */}
          <div className="w-fit flex flex-col gap-4">
            {rest.map((item) => (
              <Link
                href={'/shop'}
                key={item.id}
                className="flex glow-red group items-center benday-dots w-120 border-2 bg-basic-600 border-ui-border font-bold"
              >
                <div className="overflow-clip">
                  <Image
                    className="size-30 group-hover:scale-110 transition-transform duration-300 object-cover"
                    src={item.image}
                    alt=""
                    width={200}
                    height={200}
                  />
                </div>
                <div className="flex flex-col p-4">
                  {/* Rarity */}
                  <span
                    className={`w-fit text-[.7rem] border-ui-border border rounded-sm px-2 my-2 
              ${
                item.rarity === 'Legendary'
                  ? 'bg-rarity-legendary text-basic-900'
                  : item.rarity === 'Epic'
                    ? 'bg-rarity-epic'
                    : item.rarity === 'Rare'
                      ? 'bg-rarity-rare'
                      : 'bg-rarity-uncommon text-basic-900'
              }`}
                  >
                    {item.rarity}
                  </span>
                  {/* Description */}
                  <span className="uppercase text-sm italic">{item.description}</span>
                  {/* Price */}
                  <span className="text-sm text-primary-500">${item.price}</span>
                </div>
                <ArrowRight className="mr-4 group-hover:text-secondary-500 size-6 ml-auto" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
