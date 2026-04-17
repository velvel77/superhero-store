import ShopPageUI from "@/components/ui/shop";
import ShopHeader from "@/components/ui/shop-header";
import { getProductsForShop } from "@/lib/queries/products";
import { getSuperheroes } from "@/lib/queries/superheroes";

export const dynamic = "force-dynamic";

export const metadata = {
	title: "Superhero Store - Shop",
	description: "Browse through our selection of superheroes and gear.",
}

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

export default async function ShopPage({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	const params = await searchParams;

	const [products, superheroes] = await Promise.all([
		getProductsForShop(),
		getSuperheroes({ page: 1, limit: 100 }),
	]);

	return (
		<div>
			<ShopHeader />
			<ShopPageUI
				products={products}
				superheroes={superheroes}
				initialSearchParams={params}
			/>
		</div>
	);
}
