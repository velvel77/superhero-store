import ShopPageUI from "@/components/ui/shop";
import { getProductsForShop } from "@/lib/queries/products";
import { getSuperheroes } from "@/lib/queries/superheroes";
import ShopHeader from "@/components/ui/shop-header";

export default async function ShopPage() {
	const [products, superheroes] = await Promise.all([
		getProductsForShop(),
		getSuperheroes({ page: 1, limit: 100 }),
	]);

	return (
    <div>
      <ShopHeader />
			<ShopPageUI products={products} superheroes={superheroes} />;
		</div>
	);
}
