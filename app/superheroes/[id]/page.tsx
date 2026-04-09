import Superhero from '@/components/ui/shop-superhero';

export default async function Product({ params }: { params: Promise<{ id: string }> }) {
  const API_KEY = process.env.API_KEY;
  const { id } = await params;
  console.log('This is the id from dynamic page', id);
  const res = await fetch(`https://superheroapi.com/api/${API_KEY}/${id}`);
  const hero = await res.json();

  if (hero.response === 'error') {
    throw new Error('Hero not found');
  }

  return <Superhero hero={hero} />;
}
