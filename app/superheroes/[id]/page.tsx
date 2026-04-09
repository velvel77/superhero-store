import Superhero from '@/components/ui/shop-superhero';
import heroes from '@/data/heroes.json';

export default async function Product({ params }: { params: Promise<{ id: string }> }) {
  // const API_KEY = process.env.API_KEY;
  const { id } = await params;
  // console.log('This is the id from dynamic page', id);
  // const res = await fetch(`https://superheroapi.com/api/${API_KEY}/${id}`);
  // const hero = await res.json();

  // if (hero.response === 'error') {
  //   throw new Error('Hero not found');
  // }

  const hero = heroes.find((h) => h.id === id);
  if (!hero) {
    return <div>Hero not found</div>;
  }

  return <Superhero hero={hero} />;
}
