import Superhero from '@/components/ui/shop-superhero';
import { notFound } from 'next/navigation';
import { getProductById, getRelatedProducts } from '@/lib/queries/products';
import { getSuperheroById } from '@/lib/queries/superheroes';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: PageProps<'/superheroes/[id]'>) {
  const { id } = await params;
  const hero = await getSuperheroById(Number(id));
  return {
    title: `Superhero Store - ${hero.name}`,
    description: hero.description,
  };
}

export default async function SuperheroPage({ params }: Props) {
  const skipLinks = [
    { id: 1, link: '#header-searchbar', description: 'Go to searchbar' },
    { id: 2, link: '#footer-section', description: 'Go to footer' },
  ];
  const { id } = await params;
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    throw new Error('API_URL is not set');
  }

  const [heroRes, relatedProducts] = await Promise.all([
    fetch(`${apiUrl}/superheroes/${id}`, {
      cache: 'no-store',
    }),
    getRelatedProducts(3),
  ]);

  if (!heroRes.ok) {
    notFound();
  }

  const hero = await heroRes.json();

  if (!hero) {
    notFound();
  }

  return (
    <>
      {skipLinks.map((section) => (
        <a
          key={section.id}
          href={`${section.link}`}
          className="sr-only focus:not-sr-only focus:fixed focus:top-24 focus:left-4 focus:z-50 bg-black text-white px-4 py-2 rounded"
        >
          {section.description}
        </a>
      ))}
      <Superhero hero={hero} relatedProducts={relatedProducts} />
    </>
  );
}
