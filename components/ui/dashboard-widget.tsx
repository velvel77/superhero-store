import "server-only";
import { getInventoryProducts } from "@/lib/db";
import { Package2, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import type { Product } from "@/lib/types";

type ProductForInventoryWidget = Pick<Product, "stock">;

const getAvailabilityStatus = (stock: number | null | undefined) => {
	const s = stock ?? 0;
	if (s === 0) return "Out of Stock";
	if (s < 45) return "Low Stock";
	return "In Stock";
};

export default async function InventoryWidget() {
	try {
		const products: ProductForInventoryWidget[] =
			await getInventoryProducts();

		const stats = [
			{
				label: "Total products",
				value: products.length,
				icon: Package2,
				iconColor: "text-primary-500",
				iconBg: "bg-primary-100",
			},
			{
				label: "In stock",
				value: products.filter(
					(p) => getAvailabilityStatus(p.stock) === "In Stock",
				).length,
				icon: CheckCircle2,
				iconColor: "text-green-500",
				iconBg: "bg-green-100",
			},
			{
				label: "Low stock",
				value: products.filter(
					(p) => getAvailabilityStatus(p.stock) === "Low Stock",
				).length,
				icon: AlertTriangle,
				iconColor: "text-orange-500",
				iconBg: "bg-orange-100",
			},
			{
				label: "Out of stock",
				value: products.filter(
					(p) => getAvailabilityStatus(p.stock) === "Out of Stock",
				).length,
				icon: XCircle,
				iconColor: "text-secondary-500",
				iconBg: "bg-secondary-100",
			},
		];

		return (
			<section>
				<div className="grid grid-cols-4 gap-4">
					{stats.map(
						({ label, value, icon: Icon, iconColor, iconBg }) => (
							<article
								key={label}
								className="bg-basic-800 rounded-xl p-5 shadow-sm border border-ui-border"
							>
								<div className="flex items-center justify-between">
									<div>
										<h2 className="text-xs font-medium text-basic-300">
											{label}
										</h2>
										<h2 className="text-2xl font-bold text-basic-100 mt-1">
											{value}
										</h2>
									</div>
									<div
										className={`${iconBg} ${iconColor} p-3 rounded-xl`}
									>
										<Icon size={25} aria-hidden="true" />
									</div>
								</div>
							</article>
						),
					)}
				</div>
			</section>
		);
	} catch (error) {
		return (
			<section>
				<div className="bg-white rounded-xl p-5 shadow-sm border border-warning-500">
					<p className="text-warning-500 font-medium">
						Failed to fetch inventory data. Please try again later.
					</p>
				</div>
			</section>
		);
	}
}
