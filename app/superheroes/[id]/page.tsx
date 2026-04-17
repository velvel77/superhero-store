import Superhero from "@/components/ui/shop-superhero";
import { notFound } from "next/navigation";
import { getRelatedProducts } from "@/lib/queries/products";

type Props = {
	params: Promise<{
		id: string;
	}>;
};

export default async function SuperheroPage({ params }: Props) {
	const { id } = await params;
	const apiUrl = process.env.API_URL;

	if (!apiUrl) {
		throw new Error("API_URL is not set");
	}

	const [heroRes, relatedProducts] = await Promise.all([
		fetch(`${apiUrl}/superheroes/${id}`, {
			cache: "no-store",
		}),
		getRelatedProducts(3),
	]);

	if (!heroRes.ok) {
		notFound();
	}

	const hero = await heroRes.json();

	if (!hero) {
		notFound();
	}

	return <Superhero hero={hero} relatedProducts={relatedProducts} />;
}
