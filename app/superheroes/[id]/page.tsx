import type { Hero } from "@/app/types";
import Superhero from "@/components/ui/shop-superhero";

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    throw new Error("API_URL is not set");
  }

  // test comment
  const data = await fetch(`${apiUrl}/superheroes`);

  if(!data.ok) {
    const body = await data.text();
    throw new Error(
      `Failed to fetch superheroes: ${data.status} ${data.statusText}. Body ${body}`
    )
  }

  const heroes = await data.json();

  const hero = heroes.find((h: Hero) => h.id === Number(id));
  if (!hero) {
    return <div>Hero not found</div>;
  }

  return <Superhero hero={hero} />;
}
