import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import mask from '@/public/mask.jpg';
import gloves from '@/public/gloves.jpg';
import shield from '@/public/shield.jpg';
import outfit from '@/public/outfit.jpg';
import Link from 'next/link';

const items = [
  { id: 1, image: outfit, rarity: 'Legendary', description: 'Shadow ops tactical suit', price: 2450 },
  { id: 2, image: gloves, rarity: 'Epic', description: 'Plasma surge gauntlets', price: 1890 },
  { id: 3, image: mask, rarity: 'Rare', description: 'Phantom visor MK-IV', price: 1250 },
  { id: 4, image: shield, rarity: 'Legendary', description: 'Liberty defender shield', price: 3200 },
];

const [featured, ...rest] = items;

export default function ShopFeaturedProducts() {
  return (
    <section className="p-4 pb-16 diagonal-stripes ">
      <div className="mx-auto max-w-260 w-full">
        <header className="p-4 py-8 relative grid items-center">
          <div className="absolute h-7 w-1 bg-effect-red"></div>
          <h2 className="text-base-white font-bold uppercase italic">Trending Gear</h2>
          <small className="text-basic-400">Most requested by active heroes</small>
        </header>

        <div className="flex gap-4">
          {/* Featured */}
          <Link
            href={'/'}
            key={featured.id}
            className="group overflow-clip relative w-auto border-2 glow-red border-base-white font-bold"
          >
            <Image
              className="object-cover w-100 h-140 group-hover:scale-110 transition-all duration-300"
              src={featured.image}
              alt={featured.description}
              width={250}
              height={500}
            />
            {/* Rarity */}
            <span
              className={`absolute text-[.7rem] border-base-white border rounded-sm px-2 top-2 left-2 
              ${
                featured.rarity === 'Legendary'
                  ? 'bg-rarity-legendary text-base-black'
                  : featured.rarity === 'Epic'
                    ? 'bg-rarity-epic'
                    : featured.rarity === 'Rare'
                      ? 'bg-rarity-rare'
                      : 'bg-rarity-uncommon text-base-black'
              }`}
            >
              {featured.rarity}
            </span>
            <div className="absolute flex flex-col p-4 bottom-0 left-0">
              {/* Description */}
              <span className="uppercase text-sm italic">{featured.description}</span>
              {/* Price */}
              <span className="text-sm text-effect-yellow">${featured.price}</span>
            </div>
          </Link>

          {/* Rest */}
          <div className="w-fit flex flex-col gap-4">
            {rest.map((item) => (
              <Link
                href={'/'}
                key={item.id}
                className="flex glow-red group items-center benday-dots w-120 border-2 bg-effect-gray border-base-white font-bold"
              >
                <div className="overflow-clip">
                  <Image
                    className="size-30 group-hover:scale-110 transition-transform duration-300 object-cover"
                    src={item.image}
                    alt={item.description}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="flex flex-col p-4">
                  {/* Rarity */}
                  <span
                    className={`w-fit text-[.7rem] border-base-white border rounded-sm px-2 my-2 
              ${
                item.rarity === 'Legendary'
                  ? 'bg-rarity-legendary text-base-black'
                  : item.rarity === 'Epic'
                    ? 'bg-rarity-epic'
                    : item.rarity === 'Rare'
                      ? 'bg-rarity-rare'
                      : 'bg-rarity-uncommon text-base-black'
              }`}
                  >
                    {item.rarity}
                  </span>
                  {/* Description */}
                  <span className="uppercase text-sm italic">{item.description}</span>
                  {/* Price */}
                  <span className="text-sm text-effect-yellow">${item.price}</span>
                </div>
                <ArrowRight className="mr-4 group-hover:text-effect-red size-6 ml-auto" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
