import ShopHeader from '@/components/ui/shop-header';
import ShopBanner from '@/components/ui/shop-banner';
import ShopCategories from '@/components/ui/shop-categories';
import ShopFeaturedProducts from '@/components/ui/shop-featured-products';
import ShopTestimonials from '@/components/ui/shop-testimonials';
import ShopNewsLetter from '@/components/ui/shop-newsletter';
import ShopFooter from '@/components/ui/shop-footer';
import ShopAllHeroes from '@/components/ui/shop-all-heroes';

const skipLinks = [
  { id: 1, link: '#header-searchbar', description: 'Go to searchbar' },
  { id: 2, link: '#all-superheroes-section', description: 'Go to all superheroes' },
  { id: 3, link: '#categories-section', description: 'Go to categories' },
  { id: 4, link: '#featured-products-section', description: 'Go to featured products' },
  { id: 5, link: '#testimonials-section', description: 'Go to testimonials' },
  { id: 6, link: '#newsletter-section', description: 'Go to newsletter' },
  { id: 7, link: '#footer-section', description: 'Go to footer' },
];

export default async function Shop() {
  return (
    <>
      {skipLinks.map((section) => (
        <a
          key={section.id}
          href={`${section.link}`}
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 bg-black text-white px-4 py-2 rounded"
        >
          {section.description}
        </a>
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
