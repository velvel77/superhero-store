import ShopHeader from '@/components/ui/shop-header';
import ShopBanner from '@/components/ui/shop-banner';
import ShopCategories from '@/components/ui/shop-categories';
import ShopFeaturedProducts from '@/components/ui/shop-featured-products';
import ShopTestimonials from '@/components/ui/shop-testimonials';
import ShopNewsLetter from '@/components/ui/shop-newsletter';
import ShopFooter from '@/components/ui/shop-footer';
import ShopAllHeroes from '@/components/ui/shop-all-heroes';

const skipLinks = [
  { id: 1, link: '#header-searchbar' },
  { id: 2, link: '#all-superheroes-section' },
  { id: 3, link: '#categories-section' },
  { id: 4, link: '#featured-products-section' },
  { id: 5, link: '#testimonials-section' },
  { id: 6, link: '#news-letter-section' },
  { id: 7, link: '#footer-section' },
];

export default async function Shop() {
  return (
    <>
      {skipLinks.map((section) => (
        <a
          key={section.id}
          href={`${section.link}`}
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 bg-black text-white px-4 py-2 rounded"
        ></a>
      ))}
      <ShopHeader />
      <ShopBanner />
      <ShopAllHeroes />
      <ShopCategories />
      <ShopFeaturedProducts />
      <ShopTestimonials />
      <ShopNewsLetter />
      <ShopFooter />
    </>
  );
}
