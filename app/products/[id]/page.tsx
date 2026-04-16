import { notFound } from "next/navigation";
import {
	getProductById,
	getProductDetailsById,
	getRelatedProducts,
} from "@/lib/queries/products";
import ShopProduct from "@/components/ui/shop-product";

type Props = {
	params: Promise<{
		id: string;
	}>;
};

export async function generateMetadata({ params }: PageProps<"/products/[id]">) {
	const { id } = await params;
	const product = await getProductById(Number(id));
	return {
		title: `Superhero Store - ${product.name}`,
		description: product.description
	}
}

export default async function ProductPage({ params }: Props) {
	const { id } = await params;
	const productId = Number(id);
	const apiUrl = process.env.API_URL;

	if (!apiUrl) {
		throw new Error("API_URL is not set");
	}

	if (Number.isNaN(productId)) {
		notFound();
	}

	const [product, rawRelatedProducts] = await Promise.all([
		getProductDetailsById(productId),
		getRelatedProducts(6),
	]);

	if (!product) {
		notFound();
	}

	const relatedProducts = rawRelatedProducts
		.filter((item) => item.id !== productId)
		.slice(0, 3);

	return <ShopProduct product={product} relatedProducts={relatedProducts} />;
}
