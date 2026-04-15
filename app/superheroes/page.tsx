import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getSuperheroes, getSuperheroesCount } from "@/lib/queries/superheroes";
import ShopHeader from "@/components/ui/shop-header";

type RankingFilter = "" | "S" | "A" | "B" | "C" | "D" | "E" | "F";
type AvailabilityFilter = "" | "available" | "unavailable";

type SearchParams = Promise<{
	page?: string;
	q?: string;
	ranking?: RankingFilter;
	availability?: AvailabilityFilter;
}>;

const PAGE_SIZE = 12;

function formatPrice(value: number | null) {
	if (value == null) return "N/A";

	return `$${value.toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`;
}

function getRankingClasses(ranking: RankingFilter) {
	switch (ranking) {
		case "S":
			return "bg-primary-500 text-black";
		case "A":
			return "bg-secondary-500 text-white";
		case "B":
			return "bg-rarity-rare text-white";
		case "C":
			return "bg-rarity-epic text-white";
		default:
			return "bg-basic-300 text-black";
	}
}

function getAvailabilityText(isAvailable: boolean) {
	return isAvailable ? "Available" : "Unavailable";
}

function getAvailabilityClasses(isAvailable: boolean) {
	return isAvailable ? "text-rarity-uncommon" : "text-secondary-500";
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

export default async function SuperheroesPage({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	const session = await getServerSession();

	if (!session) {
		redirect("/login");
	}

	const params = await searchParams;

	const page = Math.max(1, Number(params.page ?? "1") || 1);
	const q = params.q?.trim() ?? "";
	const ranking = (params.ranking ?? "") as RankingFilter;
	const availability = (params.availability ?? "") as AvailabilityFilter;

	const [superheroes, totalCount] = await Promise.all([
		getSuperheroes({
			page,
			limit: PAGE_SIZE,
			q,
			ranking,
			availability,
		}),
		getSuperheroesCount({
			q,
			ranking,
			availability,
		}),
	]);

	const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

	const availableCount = superheroes.filter(
		(hero) => hero.is_available,
	).length;
	const averagePrice =
		superheroes.length > 0
			? superheroes.reduce(
					(sum, hero) => sum + Number(hero.price ?? 0),
					0,
				) / superheroes.length
			: 0;

	const makeHref = (nextPage: number) => {
		const qs = new URLSearchParams();

		if (nextPage > 1) qs.set("page", String(nextPage));
		if (q) qs.set("q", q);
		if (ranking) qs.set("ranking", ranking);
		if (availability) qs.set("availability", availability);

		const query = qs.toString();
		return query ? `/superheroes?${query}` : "/superheroes";
	};

	return (
    <div className="min-h-screen bg-basic-900 text-basic-100">
      <ShopHeader />
			<div className="mx-auto max-w-375 px-6 py-8 xl:px-8">
				<div className="mb-8 flex flex-col gap-4 border border-ui-border bg-basic-800 p-6 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-secondary-500">
							Hero roster
						</p>
						<h1 className="text-3xl font-black uppercase italic text-basic-100">
							Superheroes
						</h1>
						<p className="mt-2 text-sm text-basic-300">
							Welcome {session.user?.name}
						</p>
					</div>

					<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
						<div className="border border-ui-border bg-basic-700 px-4 py-3">
							<p className="text-[10px] uppercase tracking-[0.18em] text-basic-400">
								Total
							</p>
							<p className="mt-1 text-2xl font-black">
								{totalCount}
							</p>
						</div>

						<div className="border border-ui-border bg-basic-700 px-4 py-3">
							<p className="text-[10px] uppercase tracking-[0.18em] text-basic-400">
								Available
							</p>
							<p className="mt-1 text-2xl font-black">
								{availableCount}
							</p>
						</div>

						<div className="border border-ui-border bg-basic-700 px-4 py-3">
							<p className="text-[10px] uppercase tracking-[0.18em] text-basic-400">
								Page
							</p>
							<p className="mt-1 text-2xl font-black">
								{page}/{totalPages}
							</p>
						</div>
					</div>
				</div>

				<form
					action="/superheroes"
					method="GET"
					className="mb-8 grid gap-4 border border-ui-border bg-basic-800 p-5 lg:grid-cols-[1fr_180px_180px_auto_auto]"
				>
					<div>
						<label
							htmlFor="q"
							className="mb-2 block text-[11px] font-black uppercase tracking-[0.16em] text-basic-300"
						>
							Search
						</label>
						<input
							id="q"
							name="q"
							defaultValue={q}
							placeholder="Search by name, description, powers..."
							className="w-full border border-ui-border bg-basic-700 px-4 py-3 text-sm text-basic-100 outline-none placeholder:text-basic-400"
						/>
					</div>

					<div>
						<label
							htmlFor="ranking"
							className="mb-2 block text-[11px] font-black uppercase tracking-[0.16em] text-basic-300"
						>
							Ranking
						</label>
						<select
							id="ranking"
							name="ranking"
							defaultValue={ranking}
							className="w-full border border-ui-border bg-basic-700 px-4 py-3 text-sm text-basic-100 outline-none"
						>
							<option value="">All</option>
							<option value="S">S</option>
							<option value="A">A</option>
							<option value="B">B</option>
							<option value="C">C</option>
							<option value="D">D</option>
							<option value="E">E</option>
							<option value="F">F</option>
						</select>
					</div>

					<div>
						<label
							htmlFor="availability"
							className="mb-2 block text-[11px] font-black uppercase tracking-[0.16em] text-basic-300"
						>
							Status
						</label>
						<select
							id="availability"
							name="availability"
							defaultValue={availability}
							className="w-full border border-ui-border bg-basic-700 px-4 py-3 text-sm text-basic-100 outline-none"
						>
							<option value="">All</option>
							<option value="available">Available</option>
							<option value="unavailable">Unavailable</option>
						</select>
					</div>

					<button
						type="submit"
						className="h-fit self-end border border-ui-border bg-secondary-500 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white"
					>
						Apply
					</button>

					<Link
						href="/superheroes"
						className="h-fit self-end border border-ui-border bg-basic-700 px-5 py-3 text-center text-xs font-black uppercase tracking-[0.16em] text-basic-100"
					>
						Reset
					</Link>
				</form>

				<div className="mb-8 grid gap-3 sm:grid-cols-3">
					<div className="border border-ui-border bg-basic-800 p-4">
						<p className="text-[10px] uppercase tracking-[0.18em] text-basic-400">
							Average price
						</p>
						<p className="mt-1 text-xl font-black text-primary-500">
							{formatPrice(averagePrice)}
						</p>
					</div>

					<div className="border border-ui-border bg-basic-800 p-4">
						<p className="text-[10px] uppercase tracking-[0.18em] text-basic-400">
							Showing now
						</p>
						<p className="mt-1 text-xl font-black">
							{superheroes.length}
						</p>
					</div>

					<div className="border border-ui-border bg-basic-800 p-4">
						<p className="text-[10px] uppercase tracking-[0.18em] text-basic-400">
							Signed in as
						</p>
						<p className="mt-1 truncate text-sm font-bold text-basic-100">
							{session.user?.email ??
								session.user?.name ??
								"Unknown user"}
						</p>
					</div>
				</div>

				{superheroes.length === 0 ? (
					<div className="border border-ui-border bg-basic-800 px-6 py-16 text-center">
						<h2 className="text-2xl font-black uppercase">
							No superheroes found
						</h2>
						<p className="mt-2 text-basic-300">
							Try a different search or clear the filters.
						</p>
					</div>
				) : (
					<>
						<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
							{superheroes.map((hero) => (
								<div
									key={hero.id}
									className="catalog-hover overflow-hidden border border-ui-border bg-basic-800"
								>
									<div className="benday-dots relative aspect-[0.82/1] overflow-hidden bg-basic-900">
										<div className="absolute left-3 top-3 z-10 flex gap-2">
											{hero.ranking ? (
												<span
													className={`px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${getRankingClasses(
														hero.ranking,
													)}`}
												>
													{hero.ranking}
												</span>
											) : null}

											<span
												className={`px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${
													hero.is_available
														? "bg-rarity-uncommon text-black"
														: "bg-secondary-500 text-white"
												}`}
											>
												{hero.is_available
													? "Available"
													: "Unavailable"}
											</span>
										</div>

										<img
											src={
												hero.image_url ||
												"https://placehold.co/700x850/111827/ffffff?text=Hero"
											}
											alt={hero.name}
											className="h-full w-full object-cover"
										/>
									</div>

									<div className="p-4">
										<div className="mb-2 flex items-start justify-between gap-3">
											<h2 className="text-lg font-black uppercase leading-tight text-basic-100">
												{hero.name}
											</h2>
											<span className="text-xs text-basic-400">
												#{hero.id}
											</span>
										</div>

										<p className="mb-3 min-h-10 text-sm text-basic-300">
											{hero.description ||
												"No description available."}
										</p>

										<p className="mb-4 min-h-10 text-sm text-basic-400">
											<span className="font-black uppercase text-basic-200">
												Powers:{" "}
											</span>
											{hero.superpowers ||
												"No powers listed."}
										</p>

										<div className="mb-4 grid grid-cols-3 gap-2">
											<div className="border border-ui-border bg-basic-700 p-3">
												<p className="text-[10px] uppercase tracking-[0.16em] text-basic-400">
													Str
												</p>
												<p className="mt-1 text-lg font-black text-basic-100">
													{hero.stats?.strength ??
														"-"}
												</p>
											</div>

											<div className="border border-ui-border bg-basic-700 p-3">
												<p className="text-[10px] uppercase tracking-[0.16em] text-basic-400">
													Speed
												</p>
												<p className="mt-1 text-lg font-black text-basic-100">
													{hero.stats?.speed ?? "-"}
												</p>
											</div>

											<div className="border border-ui-border bg-basic-700 p-3">
												<p className="text-[10px] uppercase tracking-[0.16em] text-basic-400">
													Combat
												</p>
												<p className="mt-1 text-lg font-black text-basic-100">
													{hero.stats?.combat ?? "-"}
												</p>
											</div>
										</div>

										<div className="mb-4 border border-ui-border bg-basic-700 p-3">
											<p className="text-[10px] uppercase tracking-[0.16em] text-basic-400">
												Power score
											</p>
											<p className="mt-1 text-lg font-black text-primary-500">
												{makeHeroScore(hero.stats)}
											</p>
										</div>

										<div className="flex items-center justify-between gap-3">
											<div>
												<p className="text-lg font-black text-primary-500">
													{formatPrice(hero.price)}
												</p>
												<p
													className={`text-xs font-black uppercase tracking-[0.14em] ${getAvailabilityClasses(
														hero.is_available,
													)}`}
												>
													{getAvailabilityText(
														hero.is_available,
													)}
												</p>
											</div>

											<div className="flex gap-2">
												<Link
													href={`/superheroes/${hero.id}`}
													className="border border-ui-border bg-basic-700 px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-basic-100"
												>
													View
												</Link>
												<Link
													href={`/superheroes/${hero.id}/edit`}
													className="border border-ui-border bg-basic-700 px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-basic-100"
												>
													Edit
												</Link>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="mt-8 flex flex-wrap justify-center gap-2">
							<Link
								href={makeHref(Math.max(1, page - 1))}
								aria-disabled={page === 1}
								className={`min-w-11 border px-4 py-3 text-xs font-black uppercase tracking-[0.14em] ${
									page === 1
										? "pointer-events-none border-ui-border bg-basic-700 text-basic-400 opacity-40"
										: "border-ui-border bg-basic-700 text-basic-100"
								}`}
							>
								Prev
							</Link>

							{Array.from(
								{ length: totalPages },
								(_, i) => i + 1,
							).map((pageNumber) => (
								<Link
									key={pageNumber}
									href={makeHref(pageNumber)}
									className={`min-w-11 border px-4 py-3 text-center text-xs font-black uppercase tracking-[0.14em] ${
										page === pageNumber
											? "border-secondary-500 bg-secondary-500/15 text-basic-100"
											: "border-ui-border bg-basic-700 text-basic-100"
									}`}
								>
									{pageNumber}
								</Link>
							))}

							<Link
								href={makeHref(Math.min(totalPages, page + 1))}
								aria-disabled={page === totalPages}
								className={`min-w-11 border px-4 py-3 text-xs font-black uppercase tracking-[0.14em] ${
									page === totalPages
										? "pointer-events-none border-ui-border bg-basic-700 text-basic-400 opacity-40"
										: "border-ui-border bg-basic-700 text-basic-100"
								}`}
							>
								Next
							</Link>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
