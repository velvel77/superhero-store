'use server';
import ShopHeader from '@/components/ui/shop-header';
import ShopBanner from '@/components/ui/shop-banner';
import ShopCategories from '@/components/ui/shop-categories';
import ShopFeaturedProducts from '@/components/ui/shop-featured-products';
import ShopTestimonials from '@/components/ui/shop-testimonials';
import ShopNewsLetter from '@/components/ui/shop-newsletter';
import ShopFooter from '@/components/ui/shop-footer';

export default async function Shop() {
  const API_KEY = process.env.API_KEY;
  try {
    const response = await fetch(`https://superheroapi.com/api/${API_KEY}/1`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
  return (
    <>
      <ShopHeader />
      <ShopBanner />
      <ShopCategories />
      <ShopFeaturedProducts />
      <ShopTestimonials />
      <ShopNewsLetter />
      <ShopFooter />
    </>
  );
}
