import { notFound } from "next/navigation";
import { getSuperheroById } from "@/lib/queries/superheroes";
import ShopHeader from "@/components/ui/shop-header";

type Props = {
	params: Promise<{
		id: string;
	}>;
};

function formatPrice(value: number | null) {
	if (value == null) return "N/A";

	return `$${value.toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`;
}

function getRankingClasses(ranking: string | null) {
	switch (ranking) {
		case "S":
			return "bg-primary-500 text-basic-900";
		case "A":
			return "bg-secondary-500 text-basic-100";
		case "B":
			return "bg-rarity-rare text-basic-100";
		default:
			return "bg-basic-300 text-basic-900";
	}
}

function makeHeroScore(
	stats:
		| {
				strength?: number;
				speed?: number;
				intelligence?: number;
				durability?: number;
				energy?: number;
				combat?: number;
		  }
		| null
		| undefined,
) {
	if (!stats) return 0;

	return (
		(stats.strength ?? 0) +
		(stats.speed ?? 0) +
		(stats.intelligence ?? 0) +
		(stats.durability ?? 0) +
		(stats.energy ?? 0) +
		(stats.combat ?? 0)
	);
}

export default async function SuperheroDetailsPage({ params }: Props) {
	const { id } = await params;
	const heroId = Number(id);

	if (Number.isNaN(heroId)) {
		notFound();
	}

	const hero = await getSuperheroById(heroId);

	if (!hero) {
		notFound();
	}

	return (
		<div className="min-h-screen bg-basic-900 text-basic-100">
			<ShopHeader />
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
								hero.image_url ||
								"https://placehold.co/900x1100/111827/ffffff?text=Hero"
							}
							alt={hero.name}
							className="h-full w-full object-cover"
						/>
					</div>

					<div>
						<div className="mb-4 flex items-center gap-3">
							{hero.ranking ? (
								<span
									className={`px-3 py-1 text-[10px] font-basic-900 uppercase tracking-[0.14em] ${getRankingClasses(
										hero.ranking,
									)}`}
								>
									{hero.ranking}
								</span>
							) : null}

							<span
								className={`px-3 py-1 text-[10px] font-basic-900 uppercase tracking-[0.14em] ${
									hero.is_available
										? "bg-rarity-uncommon text-basic-900"
										: "bg-secondary-500 text-basic-100"
								}`}
							>
								{hero.is_available
									? "Available"
									: "Unavailable"}
							</span>

							<span className="text-xs uppercase tracking-[0.14em] text-basic-400">
								Hero #{hero.id}
							</span>
						</div>

						<h1 className="text-4xl font-basic-900 uppercase italic text-basic-100">
							{hero.name}
						</h1>

						<p className="mt-4 text-base leading-7 text-basic-300">
							{hero.description || "No description available."}
						</p>

						<div className="mt-5">
							<p className="text-[10px] uppercase tracking-[0.16em] text-basic-400">
								Superpowers
							</p>
							<p className="mt-2 text-basic-200">
								{hero.superpowers || "No superpowers listed."}
							</p>
						</div>

						<div className="mt-6 grid gap-4 sm:grid-cols-2">
							<div className="border border-ui-border bg-basic-700 p-4">
								<p className="text-[10px] uppercase tracking-[0.16em] text-basic-400">
									Price
								</p>
								<p className="mt-2 text-2xl font-basic-900 text-primary-500">
									{formatPrice(hero.price)}
								</p>
							</div>

							<div className="border border-ui-border bg-basic-700 p-4">
								<p className="text-[10px] uppercase tracking-[0.16em] text-basic-400">
									Power score
								</p>
								<p className="mt-2 text-2xl font-basic-900 text-basic-100">
									{makeHeroScore(hero.stats)}
								</p>
							</div>
						</div>

						<div className="mt-6 grid grid-cols-3 gap-3">
							<div className="border border-ui-border bg-basic-700 p-3">
								<p className="text-[10px] uppercase tracking-[0.16em] text-basic-400">
									Strength
								</p>
								<p className="mt-1 text-lg font-basic-900 text-basic-100">
									{hero.stats?.strength ?? "-"}
								</p>
							</div>

							<div className="border border-ui-border bg-basic-700 p-3">
								<p className="text-[10px] uppercase tracking-[0.16em] text-basic-400">
									Speed
								</p>
								<p className="mt-1 text-lg font-basic-900 text-basic-100">
									{hero.stats?.speed ?? "-"}
								</p>
							</div>

							<div className="border border-ui-border bg-basic-700 p-3">
								<p className="text-[10px] uppercase tracking-[0.16em] text-basic-400">
									Combat
								</p>
								<p className="mt-1 text-lg font-basic-900 text-basic-100">
									{hero.stats?.combat ?? "-"}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}