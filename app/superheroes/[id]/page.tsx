import Superhero from '@/components/ui/shop-superhero';
import type { Hero } from '@/app/types';

export default async function Product({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await fetch('http://localhost:5000/superheroes');
  const heroes = await data.json();

  const hero = heroes.find((h: Hero) => h.id === Number(id));
  if (!hero) {
    return <div>Hero not found</div>;
  }

  return <Superhero hero={hero} />;
}
