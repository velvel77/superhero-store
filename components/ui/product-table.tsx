import Image from "next/image";
import { FilePenLine } from "lucide-react";
import ProductTablePagination from "./product-table-pagination";
import Link from "next/link";
import { getSearchParamsAsString } from "@/utils/getSearchParams";
import { ProductActions } from "@/components/ui/delete-actions";
import { getProducts } from "@/lib/queries/products";
import AddToCartButton from "./add-to-cart-btn";

const thStyle = "p-4 text-sm font-semibold text-basic-300";
const tdStyle =
	"border-t border-ui-border text-center p-4 text-ellipsis truncate";

const getColourFromAvailabilityStatus = (stock: number): string => {
	if (stock === 0) {
		return "text-secondary-500";
	}

	if (stock < 10) {
		return "text-primary-500";
	}

	return "text-rarity-uncommon";
};

export default async function ProductTable({
	searchParams,
	total,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
	total: number;
}) {
	const params = await searchParams;

	const page = getSearchParamsAsString(params.page ?? "1");
	const limit = getSearchParamsAsString(params.limit ?? "5");
	const q = getSearchParamsAsString(params.q ?? "");
	const rarity = getSearchParamsAsString(params.rarity ?? "");
	const status = getSearchParamsAsString(params.status ?? "");


	const currentPage = Number(page) || 1;
	const currentLimit = Number(limit) || 5;
	const currentQuery = q;

	const totalPages = Math.ceil(total / currentLimit);

	const products = await getProducts({
		page: currentPage,
		limit: currentLimit,
		q: currentQuery,
		rarity: rarity as "" | "COMMON" | "RARE" | "EPIC" | "LEGENDARY",
		status: status as "" | "out" | "low" | "in",
	});

	return (
		<div className="border border-ui-border rounded-2xl overflow-hidden">
			<table className="w-full table-fixed">
				<thead className="bg-basic-700">
					<tr>
						<th className={`${thStyle} w-[35%]`}>Product</th>
						<th className={thStyle}>Rarity</th>
						<th className={thStyle}>Price</th>
						<th className={thStyle}>Stock</th>
						<th className={thStyle}>Status</th>
						<th className={thStyle}>Actions</th>
					</tr>
				</thead>

				<tbody>
					{products.length === 0 ? (
						<tr className="bg-basic-800">
							<td
								colSpan={6}
								className="border-t border-ui-border p-8 text-center text-basic-300"
							>
								No products found.
							</td>
						</tr>
					) : (
						products.map((product) => (
							<tr key={product.id} className="bg-basic-800">
								<td className={`${tdStyle} text-start`}>
									<div className="flex items-center">
										<Image
											className="mr-4 rounded-2xl object-cover"
											alt={product.name}
											unoptimized
											width={50}
											height={50}
											src={
												product.image_url ||
												"https://placehold.co/50x50"
											}
										/>
										<div className="min-w-0">
											<span className="block font-medium text-basic-100 truncate">
												{product.name}
											</span>
											<span className="block font-normal text-basic-400 text-sm">
												SKU: {product.id}
											</span>
										</div>
									</div>
								</td>

								<td className={`${tdStyle} text-basic-100`}>
									{product.rarity}
								</td>
								<td className={`${tdStyle} text-basic-100`}>
									{product.price} kr
								</td>
								<td className={`${tdStyle} text-basic-100`}>
									<AddToCartButton item={{ ...product, id: String(product.id), quantity: 1 }} />
								</td>

								<td
									className={`${tdStyle} ${getColourFromAvailabilityStatus(
										product.stock ?? 0,
									)}`}
								>
									{(product.stock ?? 0) === 0
										? "Out of Stock"
										: (product.stock ?? 0) < 10
											? "Low Stock"
											: "In Stock"}
								</td>

								<td className={tdStyle}>
									<Link href={`/products/edit/${product.id}`}>
										<button
											type="button"
											className="mr-2 text-primary-500"
										>
											<FilePenLine size={20} />
										</button>
									</Link>

									<ProductActions id={String(product.id)} />
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>

			<div className="p-4 bg-basic-800 border-t border-ui-border">
				{totalPages > 1 && (
					<ProductTablePagination totalPages={totalPages} />
				)}
			</div>
		</div>
	);
}