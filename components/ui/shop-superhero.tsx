'use client';

import ShopHeader from '@/components/ui/shop-header';
import ShopFooter from '@/components/ui/shop-footer';

import { SuperheroProp } from '@/app/types';
import Image from 'next/image';
import Link from 'next/link';
import mask from '@/public/mask.jpg';
import gloves from '@/public/gloves.jpg';
import belt from '@/public/belt.jpg';
import placeholder from '@/public/superhero.jpg';
import { Award, Truck, RotateCcw, Heart, PlusIcon, MinusIcon, Shield } from 'lucide-react';
import { useState } from 'react';

// Mock data ----------
const related = [
  { id: 1, image: gloves, rarity: 'Epic', name: 'Plasma surge gauntlets', price: 1890, category: 'Weapons' },
  { id: 2, image: belt, rarity: 'Common', name: 'Nightwatch utility belt', price: 780, category: 'Tech' },
  { id: 3, image: mask, rarity: 'Rare', name: 'Phantom Visor MK-IV', price: 1250, category: 'Masks' },
];
// --------------------

export default function Superhero({ hero }: { hero: SuperheroProp }) {
  const [amount, setAmount] = useState(1);
  const [favorite, setFavorite] = useState(false);

  console.log('This is the hero image', hero.image);

  const alignment = hero.biography.alignment;
  const power = Number(hero.powerstats.power);
  const intelligence = Number(hero.powerstats.intelligence);
  const durability = Number(hero.powerstats.durability);
  const combat = Number(hero.powerstats.combat);
  const strength = Number(hero.powerstats.strength);
  const speed = Number(hero.powerstats.speed);

  const totalPower = power + intelligence + durability + combat + strength + speed;
  const hourlyFee =
    Number(power) * 10 +
    Number(intelligence) * 10 +
    Number(durability) * 8 +
    Number(combat) * 8 +
    Number(speed) * 8 +
    Number(strength) * 5;

  type status = 'Available' | 'Unavailable';
  const raiting =
    totalPower >= 400
      ? 'Legendary'
      : totalPower < 400 && totalPower >= 300
        ? 'Epic'
        : totalPower < 300 && totalPower >= 200
          ? 'Rare'
          : 'Common';

  const rarity =
    totalPower >= 400
      ? 'text-rarity-legendary'
      : totalPower < 400 && totalPower >= 300
        ? 'text-rarity-epic'
        : totalPower < 300 && totalPower >= 200
          ? 'text-rarity-rare'
          : 'text-rarity-common';

  return (
    <div>
      <ShopHeader />
      <div className="max-w-260 mx-auto px-4">
        <Link className="uppercase text-[.5rem]" href={'/shop'}>
          {`< Back to catalog`}
        </Link>
        <div className="flex flex-col">
          <main className="flex my-4 gap-4">
            {/* Left panel */}
            <div>
              <div className="relative">
                <div className="relative">
                  {/* Benday dots overlay on image*/}
                  <div className="benday-dots absolute inset-0"></div>
                  <Image
                    className="w-120 min-w-50 border-2 border-basic-400/20 rounded-sm"
                    src={hero.image.url ? hero.image.url : placeholder}
                    alt={hero.name}
                    width={250}
                    height={500}
                  />
                </div>
                <span className={`bg-black px-2 rounded-sm absolute top-2 left-2 font-bold ${rarity}`}>{raiting}</span>
                <span className="absolute top-2 right-2 text-rarity-uncommon bg-black px-2 rounded-sm">Available</span>
                {/* Extra images */}
              </div>
            </div>

            {/* Right panel */}
            <section className="max-w-120">
              <div>
                <span
                  className={`${alignment === 'good' ? `text-rarity-uncommon` : alignment === 'neutral' ? 'text-primary-500' : `text-red-600`} 
                  uppercase tracking-widest font-bold text-[.7rem]`}
                >
                  {alignment === 'good' ? `Hero` : alignment === 'neutral' ? 'Anti-hero' : `Villain`}
                </span>
                <h2 className="text-shadow-md text-shadow-secondary-500 italic font-bold text-3xl">{hero.name}</h2>
                <div className="py-4 mb-4 border-b border-basic-400/20">
                  <span className="text-primary-500 text-2xl">{`${alignment === 'good' ? `$${hourlyFee * 10}` : `$${hourlyFee * 10 * 2}`} `}</span>{' '}
                  <span className="text-[.5rem]"> / hour</span>
                </div>
              </div>
              <div>
                <p className="text-[.7rem] mb-4 text-basic-400">{hero.work.occupation}</p>
                <div className="py-2 gap-2 flex">
                  <span>~ Alignment ~</span>
                  <span className={`capitalize ${alignment === 'good' ? 'text-rarity-uncommon' : 'text-red-600'}`}>
                    {alignment}
                  </span>
                </div>
                {/* Power raiting */}
                <div className="flex flex-col text-sm rounded-sm border-2 border-basic-400 bg-effect-blue p-2 benday-dots">
                  <h3 className="flex items-center gap-2 mb-2">
                    <span>
                      <Shield className="size-4 text-secondary-500" />
                    </span>
                    <span className="italic uppercase font-bold text-[.7rem]">Power Raiting</span>
                  </h3>
                  <span>Combat</span>
                  <input readOnly className="accent-secondary-500" type="range" min={0} max={100} value={combat} />
                  <span>Speed</span>
                  <input readOnly className="accent-primary-500" type="range" min={0} max={100} value={speed} />
                  <span>Strength</span>
                  <input readOnly className="accent-rarity-legendary" type="range" min={0} max={100} value={strength} />
                  <span>Intelligence</span>
                  <input
                    readOnly
                    className="accent-effect-light-blue"
                    type="range"
                    min={0}
                    max={100}
                    value={intelligence}
                  />
                  <span>Power</span>
                  <input readOnly className="accent-rarity-epic" type="range" min={0} max={100} value={power} />
                  <span>Durability</span>
                  <input
                    readOnly
                    className="accent-rarity-uncommon"
                    type="range"
                    min={0}
                    max={100}
                    value={durability}
                  />
                </div>

                {/* Purchase buttons */}
                <div className="flex py-4 gap-4">
                  {/* Increase / Decrease amount */}
                  <div className="flex flex-1 rounded-sm border-2 border-basic-400 bg-effect-dark text-basic-400">
                    {/* Decrease amount */}
                    <button
                      className="h-full w-10 flex justify-center group"
                      onClick={() => (amount === 1 ? 1 : setAmount(amount - 1))}
                    >
                      <MinusIcon className="self-center size-5 group-hover:text-basic-100" />
                    </button>
                    {/* Amount */}
                    <div className="w-10 self-center text-basic-100 text-center">{amount}</div>
                    {/* Increase amount */}
                    <button className="h-full w-10 flex justify-center group" onClick={() => setAmount(amount + 1)}>
                      <PlusIcon className="self-center size-5 group-hover:text-basic-100" />
                    </button>
                  </div>
                  {/* Hire */}
                  <button className="bg-secondary-500 p-4 flex-2 border-2 border-basic-100 rounded-sm">Hire</button>
                  {/* Favorite */}
                  <button
                    onClick={() => setFavorite(!favorite)}
                    className={`size-16 border-2 hover:border-secondary-500 bg-effect-dark ${favorite ? 'border-effect-red text-secondary-500' : 'border-basic-400 text-basic-400'} rounded-sm group flex items-center justify-center`}
                  >
                    <Heart className={`group-hover:text-secondary-500 ${favorite ? 'fill-secondary-500' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Policy */}
              <section className="flex gap-6 text-[.7rem] *:policy">
                {/* Shipping */}
                <div className="">
                  <Truck className="text-secondary-500" />
                  <div className="flex flex-col">
                    <span className="italic font-bold uppercase">Free shipping</span>
                    <span className="text-basic-400">Orders over $500</span>
                  </div>
                </div>
                {/* Return policy */}
                <div className="">
                  <RotateCcw className="text-secondary-500" />
                  <div className="flex flex-col">
                    <span className="italic font-bold uppercase">30-day returns</span>
                    <span className="text-basic-400">No questions asked</span>
                  </div>
                </div>
                {/* Certificate */}
                <div className="">
                  <Award className="text-secondary-500" />
                  <div className="flex flex-col">
                    <span className="italic font-bold uppercase">Certified Hero</span>
                    <span className="text-basic-400">Battle-tested</span>
                  </div>
                </div>
              </section>
            </section>
          </main>
          {/* Related section */}
          <section className="py-16">
            <div className="text-basic-100 relative p-4 grid items-center">
              <div className="absolute h-7 w-1 bg-secondary-500"></div>
              <h2 className="uppercase font-bold italic">Related gear</h2>
            </div>
            <div className="flex gap-4">
              {related.map((product) => (
                <Link href={'/shop'} className="relative" key={product.id}>
                  <div className="relative *:catalog-hover group">
                    {/* Benday dots overlay on image*/}
                    <div className="benday-dots absolute inset-0"></div>
                    <Image
                      className="w-100 border-2 border-basic-400/20 group-hover:border-secondary-500"
                      src={product.image}
                      alt="mask"
                      width={250}
                      height={250}
                    />
                  </div>
                  <div
                    className={`absolute text-[.7rem] border-ui-border border rounded-sm px-2 top-2 left-2 
              ${
                product.rarity === 'Legendary'
                  ? 'bg-rarity-legendary text-basic-900'
                  : product.rarity === 'Epic'
                    ? 'bg-rarity-epic'
                    : product.rarity === 'Rare'
                      ? 'bg-rarity-rare'
                      : 'bg-rarity-uncommon text-basic-900'
              }`}
                  >
                    {product.rarity}
                  </div>
                  {/* Product info */}
                  <div className="flex flex-col p-2">
                    <span className="text-secondary-500 uppercase text-[.5rem] tracking-wider">{product.category}</span>
                    <span className="italic uppercase font-bold text-[.7rem]">{product.name}</span>
                    <span className="text-primary-500">${product.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
      <ShopFooter />
    </div>
  );
}
