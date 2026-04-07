import Sidebar from "@/components/ui/sidebar";
import ProductTable from "@/components/ui/product-table";
import Header from "@/components/ui/header";
import SearchWidget from "@/components/ui/search-widget";
import InventoryWidget from "@/components/ui/dashboard-widget";
import { getProductsCount } from "@/lib/queries/products";
import { getSearchParamsAsString } from "@/utils/getSearchParams";

export default async function Home(params: PageProps<"/">) {
	const searchParams = await params.searchParams;

	const q = getSearchParamsAsString(searchParams.q ?? "");
	const rarity = getSearchParamsAsString(searchParams.rarity ?? "");
	const status = getSearchParamsAsString(searchParams.status ?? "");

	// const total = await getProductsCount(q);

	const total = await getProductsCount({
		q,
		rarity: rarity as "" | "COMMON" | "RARE" | "EPIC" | "LEGENDARY",
		status: status as "" | "out" | "low" | "in",
	});

	return (
		<main className="flex flex-row min-h-screen">
			<Sidebar />

			<section className="flex flex-col w-full gap-4 bg-basic-900">
				<Header />
				<div className="pr-4 pl-4 pb-4 flex flex-col gap-4">
					<InventoryWidget />
					<SearchWidget />
					<ProductTable
						searchParams={params.searchParams}
						total={total}
					/>
				</div>
			</section>
		</main>
	);
}