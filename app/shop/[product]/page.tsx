'use client';

import ShopHeader from '@/components/ui/shop-header';
import Image from 'next/image';
import Link from 'next/link';
import mask from '@/public/mask.jpg';
import { Award, Truck, RotateCcw, Heart } from 'lucide-react';

export default function Product() {
  return (
    <>
      <ShopHeader />
      <Link className="uppercase text-[.5rem] p-4" href={'/shop'}>
        {`< Back to catalog`}
      </Link>
      <main className="flex p-4 gap-4">
        <div>
          <div className="relative">
            <Image className="w-200" src={mask} alt="" width={250} height={500} />
            <span className="absolute top-0 left-0 p-2">rarity</span>
            <span className="absolute top-0 right-0 p-2">status</span>
            {/* Extra images */}
          </div>
        </div>

        {/* Right panel */}
        <aside>
          <div>
            <span>Suits</span>
            <h2>SHADOW OPS TACTICAL SUIT</h2>
            <div>
              <span className="text-effect-yellow">$2450</span> <span className="text-[.5rem]"> / unit</span>
            </div>
          </div>
          <div>
            <p>
              Engineered with quantum-weave fiber and shock-absorbing plating. This suit adapts to the wearer's
              movements, redistributing kinetic energy across micro-channels for maximum impact resistance.
            </p>
            {/* Power raiting */}
            <div>
              <span>Power Raiting</span>
              <span>Defense</span>
              <span>Agility</span>
              <span>Stealth</span>
              <span>Durability</span>
            </div>

            {/* Purchase buttons */}
            <div className="bg-pink-800 flex">
              {/* Increase / Decrease amount */}
              <div className="flex p-2 gap-4 bg-effect-light-blue w-fit">
                <button>-</button>
                <div>1</div>
                <button>+</button>
              </div>
              {/* Add to cart */}
              <button className="bg-effect-red p-4">Add to cart</button>
              {/* Favorite */}
              <button>
                <Heart />
              </button>
            </div>
          </div>

          {/* Policy */}
          <section className="flex gap-6 bg-amber-500 text-[.7rem]">
            <div className="flex flex-col items-center p-2 gap-2 bg-effect-gray">
              <Truck className="text-effect-red" />
              <div className="flex flex-col">
                <span className="italic font-bold uppercase">Free shipping</span>
                <span>Orders over $500</span>
              </div>
            </div>
            <div className="flex flex-col items-center p-2 gap-2 bg-effect-gray">
              <RotateCcw className="text-effect-red" />
              <div className="flex flex-col">
                <span className="italic font-bold uppercase">30-day returns</span>
                <span>No questions asked</span>
              </div>
            </div>
            <div className="flex flex-col items-center p-2 gap-2 bg-effect-gray">
              <Award className="text-effect-red" />
              <div className="flex flex-col">
                <span className="italic font-bold uppercase">Hero certified</span>
                <span>Field-tested gear</span>
              </div>
            </div>
          </section>
        </aside>
      </main>
    </>
  );
}
