import ShopBanner from '@/components/ui/shop-banner';
import ShopFooter from '@/components/ui/shop-footer';
import ShopHeader from '@/components/ui/shop-header';
import ShopTestimonials from '@/components/ui/shop-testimonials';

export default function Shop() {
  return (
    <>
      <ShopHeader />
      <ShopBanner />
      <ShopTestimonials />
      <ShopFooter />
    </>
  );
}
