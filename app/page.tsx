import ShopHeader from '@/components/ui/shop-header';
import ShopBanner from '@/components/ui/shop-banner';
import ShopCategories from '@/components/ui/shop-categories';
import ShopFeaturedProducts from '@/components/ui/shop-featured-products';
import ShopTestimonials from '@/components/ui/shop-testimonials';
import ShopNewsLetter from '@/components/ui/shop-newsletter';
import ShopFooter from '@/components/ui/shop-footer';
import ShopAllHeroes from '@/components/ui/shop-all-heroes';

export default async function Shop() {
  return (
    <>
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
