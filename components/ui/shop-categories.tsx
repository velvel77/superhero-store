import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { SuperheroSearchResponse } from "@/app/types";
import masks from "@/public/masks.jpg";
import suits from "@/public/suits.jpg";
import tech from "@/public/tech.jpg";
import weapons from "@/public/weapons.jpg";

const categories = [
  {
    name: "MASKS & VISORS",
    count: 124,
    image: masks,
    accent: "border-secondary-500 glow-red",
    textColor: "text-secondary-500",
  },
  {
    name: "TACTICAL SUITS",
    count: 89,
    image: suits,
    accent: "border-effect-light-blue glow-blue",
    textColor: "text-effect-light-blue",
  },
  {
    name: "WEAPONS",
    count: 156,
    image: weapons,
    accent: "border-secondary-500 glow-red",
    textColor: "text-secondary-500",
  },
  {
    name: "TECH & GADGETS",
    count: 203,
    image: tech,
    accent: "border-primary-500 glow-yellow",
    textColor: "text-primary-500",
  },
];

export default async function ShopCategories() {
  let result: SuperheroSearchResponse | null = null;
  const API_KEY = process.env.API_KEY;

  try {
    const response = await fetch(
      `https://superheroapi.com/api/${API_KEY}/search/a`,
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    result = (await response.json()) as SuperheroSearchResponse;
    if (!result || result.response === "error") {
      return <div>Failed to load</div>;
    }
    // console.log(result);
  } catch (error) {
    console.log(error);
  }

  // Null check to fix squiggly line in row 68
  if (!result || !result.results) {
    return <div>Failed to load</div>;
  }

  return (
    <section className="benday-dots bg-basic-700 py-8">
      <div className=" mx-auto w-full max-w-260">
        <section className="grid grid-cols-4 gap-2 rounded-md">
          {result.results.map((hero) => (
            <Link
              className="border border-amber-200"
              href={`/shop/${hero.id}`}
              key={hero.id}
            >
              <Image
                className="w-full max-w-50"
                src={hero.image.url}
                alt={hero.name}
                width={100}
                height={200}
              />
              <div>{hero.name}</div>
            </Link>
          ))}
        </section>
        <div className="text-base-white relative p-4 grid items-center">
          <div className="absolute mx-4 h-7 w-1 bg-effect-yellow"></div>
          <h2 className="px-4">Gear Categories</h2>
          <small className="px-4 text-basic-300">Browse by division</small>
        </div>

        <div className="gap-6 place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-4">
          {categories.map((item) => (
            <Link
              className={`group relative overflow-hidden aspect-square grid border-2 ${item.accent}`}
              key={item.name}
              href={"/"}
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
                <small className={`uppercase  ${item.textColor}`}>
                  {item.count} items
                </small>
                <h3 className="text-basic-100 font-bold italic">{item.name}</h3>
                <div className="uppercase flex gap-2 items-center text-basic-300 text-[.6rem]">
                  <span className="transition-colors duration-300 group-hover:text-white">
                    Explore
                  </span>{" "}
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
