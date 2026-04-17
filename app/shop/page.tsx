import ShopPageUI from '@/components/ui/shop';
import ShopFooter from '@/components/ui/shop-footer';
import ShopHeader from '@/components/ui/shop-header';
import { getProductsForShop } from '@/lib/queries/products';
import { getSuperheroes } from '@/lib/queries/superheroes';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Superhero Store - Shop',
  description: 'Browse through our selection of superheroes and gear.',
};

type SearchParams = Promise<{
  q?: string;
  page?: string;
  type?: string;
  minPrice?: string;
  maxPrice?: string;
  stock?: string;
  availability?: string;
  categories?: string;
  rarities?: string;
  tiers?: string;
}>;

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const [products, superheroes] = await Promise.all([getProductsForShop(), getSuperheroes({ page: 1, limit: 100 })]);
  const skipLinks = [
    { id: 1, link: '#header-searchbar', description: 'Go to searchbar' },
    { id: 2, link: '#footer-section', description: 'Go to footer' },
  ];

  return (
    <div>
      {skipLinks.map((section) => (
        <a
          key={section.id}
          href={`${section.link}`}
          className="sr-only focus:not-sr-only focus:fixed focus:top-24 focus:left-4 focus:z-50 bg-black text-white px-4 py-2 rounded"
        >
          {section.description}
        </a>
      ))}
      <ShopHeader />
      <ShopPageUI products={products} superheroes={superheroes} initialSearchParams={params} />
      <ShopFooter />
    </div>
  );
}
