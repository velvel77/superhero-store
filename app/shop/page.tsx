import ShopBanner from '@/components/ui/shop-banner';
import ShopNewsLetter from '@/components/ui/shop-newsletter';
import ShopFooter from '@/components/ui/shop-footer';
import ShopHeader from '@/components/ui/shop-header';
import ShopTestimonials from '@/components/ui/shop-testimonials';

export default function Shop() {
  return (
    <>
      <ShopHeader />
      <ShopBanner />
      <ShopTestimonials />
      <ShopNewsLetter />
      <ShopFooter />
    </>
  );
}
