import { notFound } from "next/navigation";
import { getProductById } from "@/lib/queries/products";

type Props = {
	params: Promise<{
		id: string;
	}>;
};

function formatPrice(value: number) {
	return `$${value.toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`;
}

function getRarityClasses(rarity: string) {
	switch (rarity) {
		case "LEGENDARY":
			return "bg-primary-500 text-basic-900";
		case "EPIC":
			return "bg-rarity-epic text-basic-100";
		case "RARE":
			return "bg-rarity-rare text-basic-100";
		default:
			return "bg-basic-300 text-basic-900";
	}
}

export default async function ProductDetailsPage({ params }: Props) {
	const { id } = await params;
	const productId = Number(id);

	if (Number.isNaN(productId)) {
		notFound();
	}

	const product = await getProductById(productId);

	if (!product) {
		notFound();
	}

	return (
		<div className="min-h-screen bg-basic-900 text-basic-100">
			<div className="mx-auto max-w-350 px-6 py-10">
				<div className="mb-6">
					<a
						href="/shop"
						className="text-sm font-bold uppercase tracking-[0.16em] text-secondary-500"
					>
						← Back to shop
					</a>
				</div>

				<div className="grid gap-8 border border-ui-border bg-basic-800 p-6 lg:grid-cols-[0.95fr_1.05fr]">
					<div className="benday-dots overflow-hidden border border-ui-border bg-basic-900">
						<img
							src={
								product.image_url ||
								"https://placehold.co/900x1100/111827/ffffff?text=Product"
							}
							alt={product.name}
							className="h-full w-full object-cover"
						/>
					</div>

					<div>
						<div className="mb-4 flex items-center gap-3">
							<span
								className={`px-3 py-1 text-[10px] font-basic-900 uppercase tracking-[0.14em] ${getRarityClasses(
									product.rarity,
								)}`}
							>
								{product.rarity}
							</span>

							<span className="text-xs uppercase tracking-[0.14em] text-basic-400">
								Product #{product.id}
							</span>
						</div>

						<h1 className="text-4xl font-basic-900 uppercase italic text-basic-100">
							{product.name}
						</h1>

						<p className="mt-4 text-base leading-7 text-basic-300">
							{product.description || "No description available."}
						</p>

						<div className="mt-6 grid gap-4 sm:grid-cols-2">
							<div className="border border-ui-border bg-basic-700 p-4">
								<p className="text-[10px] uppercase tracking-[0.16em] text-basic-400">
									Price
								</p>
								<p className="mt-2 text-2xl font-basic-900 text-primary-500">
									{formatPrice(Number(product.price))}
								</p>
							</div>

							<div className="border border-ui-border bg-basic-700 p-4">
								<p className="text-[10px] uppercase tracking-[0.16em] text-basic-400">
									Stock
								</p>
								<p className="mt-2 text-2xl font-basic-900 text-basic-100">
									{product.stock}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}