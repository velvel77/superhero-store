import ShopAllHeroes from "@/components/ui/shop-all-heroes";
import ShopBanner from "@/components/ui/shop-banner";
import ShopCategories from "@/components/ui/shop-categories";
import ShopFeaturedProducts from "@/components/ui/shop-featured-products";
import ShopFooter from "@/components/ui/shop-footer";
import ShopHeader from "@/components/ui/shop-header";
import ShopNewsLetter from "@/components/ui/shop-newsletter";
import ShopTestimonials from "@/components/ui/shop-testimonials";

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
