"use client";

import {
  Award,
  Heart,
  MinusIcon,
  PlusIcon,
  RotateCcw,
  Shield,
  Truck,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Hero } from "@/app/types";
import ShopFooter from "@/components/ui/shop-footer";
import ShopHeader from "@/components/ui/shop-header";
import type { RelatedProduct } from "@/lib/queries/products";
import placeholder from "@/public/superhero.jpg";

type Props = {
  hero: Hero;
  relatedProducts: RelatedProduct[];
};

export default function Superhero({ hero, relatedProducts }: Props) {
  const [amount, setAmount] = useState(1);
  const [favorite, setFavorite] = useState(false);

  const energy = Number(hero.stats.energy);
  const intelligence = Number(hero.stats.intelligence);
  const durability = Number(hero.stats.durability);
  const combat = Number(hero.stats.combat);
  const strength = Number(hero.stats.strength);
  const speed = Number(hero.stats.speed);

  return (
    <div>
      <ShopHeader />
      <div className="max-w-260 mx-auto px-4">
        <Link className="uppercase text-[.7rem]" href={"/"}>
          {`< Back to catalog`}
        </Link>
        <div className="flex flex-col">
          <main className="flex flex-col lg:flex-row my-4 gap-4">
            {/* Left panel */}
            <div className="relative flex-1">
              <div className="relative overflow-clip lg:max-h-none lg:aspect-auto h-full max-h-175 aspect-3/4 mx-auto ">
                {/* Benday dots overlay on image*/}
                <div className="benday-dots absolute z-10 inset-0"></div>
                <Image
                  className="w-full object-cover border-2 border-basic-400/20 rounded-sm"
                  src={hero.image_url || placeholder}
                  alt={hero.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                />
                <span className="absolute top-2 right-2 text-rarity-uncommon bg-black px-2 rounded-sm">
                  {hero.is_available ? "Available" : "Unavailable"}
                </span>
              </div>
              {/* Extra images */}
            </div>

            {/* Right panel */}
            <section className="flex-1">
              <div>
                <h1
                  aria-describedby="hero-description"
                  className="text-shadow-md text-shadow-secondary-500 italic font-bold text-3xl"
                >
                  {hero.name}
                </h1>
                <div className="py-4 mb-4 border-b border-basic-400/20">
                  {/* Hourly fee */}
                  <span className="text-primary-500 text-2xl">
                    ${hero.price}
                  </span>{" "}
                  <span className="text-[.7rem]"> / hour</span>
                  <div className="flex gap-4 py-4">
                    <span
                      className={`p-2 rounded-sm text-shadow-black text-2xl px-4 ${
                        hero.ranking === "S"
                          ? "bg-rarity-legendary"
                          : hero.ranking === "A"
                            ? "bg-rarity-epic"
                            : hero.ranking === "B"
                              ? "bg-rarity-rare"
                              : "bg-rarity-uncommon"
                      } `}
                    >
                      {hero.ranking}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm text-basic-400">Hero Rank</span>
                      <span>
                        {hero.ranking === "S"
                          ? "Legendary"
                          : hero.ranking === "A"
                            ? "Epic"
                            : hero.ranking === "B"
                              ? "Rare"
                              : "Uncommon"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p id="hero-description" className=" text-basic-100">
                  {hero.description}
                </p>
                {/* Superpowers */}
                <section className="p-4 bg-pattern-benday my-4 rounded-sm border border-basic-400">
                  <div className="flex items-center gap-2 pb-2">
                    <Zap className="size-4 text-primary-500" />
                    <span className="italic font-bold uppercase tracking-wider text-xs">
                      Superpowers
                    </span>
                  </div>
                  <span>{hero.superpowers}</span>
                </section>
                {/* Power raiting */}
                <section className="flex flex-col text-sm rounded-sm border border-basic-400 bg-effect-blue p-2 benday-dots">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="size-4 text-secondary-500" />
                    <h2 className="italic uppercase font-bold text-[.7rem]">
                      Power Raiting
                    </h2>
                  </div>
                  {/* Combat */}
                  <div className="flex justify-between">
                    <span id="combat-label" className="text-basic-300">
                      Combat
                    </span>
                    <span>{combat}</span>
                  </div>
                  <div className="w-full h-2 my-2 rounded-full border border-basic-700">
                    <div
                      aria-labelledby="combat-label"
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuenow={combat}
                      aria-valuemax={100}
                      aria-valuetext={`${combat} out of 100`}
                      style={{ width: `${combat}%` }}
                      className={` h-full rounded-full bg-secondary-500`}
                    ></div>
                  </div>
                  {/* Speed */}
                  <div className="flex justify-between">
                    <span id="speed-label" className="text-basic-300">
                      Speed
                    </span>
                    <span>{speed}</span>
                  </div>
                  <div className="w-full h-2 my-2 rounded-full border border-basic-700">
                    <div
                      aria-labelledby="speed-label"
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuenow={speed}
                      aria-valuemax={100}
                      aria-valuetext={`${speed} out of 100`}
                      style={{ width: `${speed}%` }}
                      className={` h-full rounded-full bg-primary-500`}
                    ></div>
                  </div>
                  {/* Strength */}
                  <div className="flex justify-between">
                    <span id="strength-label" className="text-basic-300">
                      Strength
                    </span>
                    <span>{strength}</span>
                  </div>
                  <div className="w-full h-2 my-2 rounded-full border border-basic-700">
                    <div
                      aria-labelledby="strength-label"
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuenow={strength}
                      aria-valuemax={100}
                      aria-valuetext={`${strength} out of 100`}
                      style={{ width: `${strength}%` }}
                      className={` h-full rounded-full bg-rarity-legendary`}
                    ></div>
                  </div>
                  {/* Intelligence */}
                  <div className="flex justify-between">
                    <span id="intelligence-label" className="text-basic-300">
                      Intelligence
                    </span>
                    <span>{intelligence}</span>
                  </div>
                  <div className="w-full h-2 my-2 rounded-full border border-basic-700">
                    <div
                      aria-labelledby="intelligence-label"
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuenow={intelligence}
                      aria-valuemax={100}
                      aria-valuetext={`${intelligence} out of 100`}
                      style={{ width: `${intelligence}%` }}
                      className={` h-full rounded-full bg-effect-light-blue`}
                    ></div>
                  </div>
                  {/* Energy */}
                  <div className="flex justify-between">
                    <span id="energy-label" className="text-basic-300">
                      Energy
                    </span>
                    <span>{energy}</span>
                  </div>
                  <div className="w-full h-2 my-2 rounded-full border border-basic-700">
                    <div
                      aria-labelledby="energy-label"
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuenow={energy}
                      aria-valuemax={100}
                      aria-valuetext={`${energy} out of 100`}
                      style={{ width: `${energy}%` }}
                      className={` h-full rounded-full bg-rarity-epic`}
                    ></div>
                  </div>
                  {/* Durability */}
                  <div className="flex justify-between">
                    <span id="durability-label" className="text-basic-300">
                      Durability
                    </span>
                    <span>{durability}</span>
                  </div>
                  <div className="w-full h-2 my-2 rounded-full border border-basic-700">
                    <div
                      aria-labelledby="durability-label"
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuenow={durability}
                      aria-valuemax={100}
                      aria-valuetext={`${durability} out of 100`}
                      style={{ width: `${durability}%` }}
                      className={` h-full rounded-full bg-rarity-uncommon`}
                    ></div>
                  </div>
                </section>

                {/* Purchase buttons */}
                <div className="flex py-4 gap-4">
                  {/* Increase / Decrease amount */}
                  <div className="flex flex-1 rounded-sm border-2 border-basic-400 bg-effect-dark text-basic-400">
                    {/* Decrease amount */}
                    <button
                      type="button"
                      aria-label="Decrease amount"
                      className="h-full w-10 flex justify-center group"
                      onClick={() => (amount === 1 ? 1 : setAmount(amount - 1))}
                    >
                      <MinusIcon className="self-center size-5 group-hover:text-basic-100" />
                    </button>
                    {/* Amount */}
                    <div className="w-10 self-center text-basic-100 text-center">
                      {amount}
                    </div>
                    {/* Increase amount */}
                    <button
                      type="button"
                      aria-label="Increase amount"
                      className="h-full w-10 flex justify-center group"
                      onClick={() => setAmount(amount + 1)}
                    >
                      <PlusIcon className="self-center size-5 group-hover:text-basic-100" />
                    </button>
                  </div>
                  {/* Hire */}
                  <button
                    type="button"
                    className="bg-secondary-500 p-4 flex-2 border-2 border-basic-100 rounded-sm"
                  >
                    Hire
                  </button>
                  {/* Favorite */}
                  <button
                    type="button"
                    aria-label="Add to favorites"
                    onClick={() => setFavorite(!favorite)}
                    className={`size-16 border-2 hover:border-secondary-500 bg-effect-dark ${favorite ? "border-effect-red text-secondary-500" : "border-basic-400 text-basic-400"} rounded-sm group flex items-center justify-center`}
                  >
                    <Heart
                      className={`group-hover:text-secondary-500 ${favorite ? "fill-secondary-500" : ""}`}
                    />
                  </button>
                </div>
              </div>

              {/* Policy */}
              <section className="flex gap-6 text-[.7rem] *:policy">
                <div>
                  <Truck className="text-secondary-500" />
                  <div className="flex flex-col">
                    <span className="italic font-bold uppercase">
                      Free shipping
                    </span>
                    <span className="text-basic-400">Orders over $500</span>
                  </div>
                </div>

                <div>
                  <RotateCcw className="text-secondary-500" />
                  <div className="flex flex-col">
                    <span className="italic font-bold uppercase">
                      30-day returns
                    </span>
                    <span className="text-basic-400">No questions asked</span>
                  </div>
                </div>

                <div>
                  <Award className="text-secondary-500" />
                  <div className="flex flex-col">
                    <span className="italic font-bold uppercase">
                      Certified Hero
                    </span>
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((product) => (
                <Link
                  href={`/products/${product.id}`}
                  className="relative block"
                  key={product.id}
                >
                  <div className="relative group">
                    <div className="relative aspect-4/5 w-full overflow-hidden border-2 border-basic-400/20 bg-basic-800 group-hover:border-secondary-500">
                      <div className="benday-dots absolute inset-0 z-10"></div>

                      <Image
                        className="object-cover"
                        src={
                          product.image_url ? product.image_url : placeholder
                        }
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      <div
                        className={`absolute top-2 left-2 z-20 text-[.7rem] border-ui-border border rounded-sm px-2
						${
              product.rarity === "LEGENDARY"
                ? "bg-rarity-legendary text-basic-900"
                : product.rarity === "EPIC"
                  ? "bg-rarity-epic"
                  : product.rarity === "RARE"
                    ? "bg-rarity-rare"
                    : "bg-rarity-uncommon text-basic-900"
            }`}
                      >
                        {product.rarity}
                      </div>
                    </div>
                  </div>

                  <div className="flex min-h-18 flex-col p-2">
                    <span className="text-secondary-500 uppercase text-[.5rem] tracking-wider">
                      {product.category}
                    </span>
                    <span className="italic uppercase font-bold text-[.7rem]">
                      {product.name}
                    </span>
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
