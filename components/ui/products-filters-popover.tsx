"use client";

import { Funnel } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type StatusFilter = "" | "out" | "low" | "in";
type RarityFilter = "" | "COMMON" | "RARE" | "EPIC" | "LEGENDARY";

export default function ProductFiltersPopover() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [open, setOpen] = useState(false);
	const [rarity, setRarity] = useState<RarityFilter>(
		(searchParams.get("rarity") as RarityFilter) || "",
	);
	const [status, setStatus] = useState<StatusFilter>(
		(searchParams.get("status") as StatusFilter) || "",
	);

	useEffect(() => {
		setRarity((searchParams.get("rarity") as RarityFilter) || "");
		setStatus((searchParams.get("status") as StatusFilter) || "");
	}, [searchParams]);

	const applyFilters = () => {
		const params = new URLSearchParams(searchParams.toString());

		if (rarity) {
			params.set("rarity", rarity);
		} else {
			params.delete("rarity");
		}

		if (status) {
			params.set("status", status);
		} else {
			params.delete("status");
		}

		params.set("page", "1");

		router.push(`${pathname}?${params.toString()}`);
		setOpen(false);
	};

	const clearFilters = () => {
		const params = new URLSearchParams(searchParams.toString());

		params.delete("rarity");
		params.delete("status");
		params.set("page", "1");

		router.push(`${pathname}?${params.toString()}`);

		setRarity("");
		setStatus("");
		setOpen(false);
	};

	return (
		<div className="relative">
			<button
				className="flex gap-2 px-2 items-center text-basic-100"
				type="button"
				onClick={() => setOpen((prev) => !prev)}
			>
				<Funnel className="w-4 h-4" />
				Filter
			</button>

			{open && (
				<div className="absolute right-0 top-[calc(100%+0.75rem)] z-20 w-80 rounded-2xl border border-ui-border bg-basic-800 p-4 shadow-lg">
					<div className="flex flex-col gap-4">
						<div>
							<label
								htmlFor="rarity-filter"
								className="mb-2 block text-sm font-medium text-basic-300"
							>
								Rarity
							</label>
							<select
								id="rarity-filter"
								value={rarity}
								onChange={(e) => setRarity(e.target.value as RarityFilter)}
								className="w-full rounded-xl border border-ui-border bg-basic-900 p-2 text-basic-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
							>
								<option value="">All rarities</option>
								<option value="COMMON">COMMON</option>
								<option value="RARE">RARE</option>
								<option value="EPIC">EPIC</option>
								<option value="LEGENDARY">LEGENDARY</option>
							</select>
						</div>

						<div>
							<label
								htmlFor="status-filter"
								className="mb-2 block text-sm font-medium text-basic-300"
							>
								Stock status
							</label>
							<select
								id="status-filter"
								value={status}
								onChange={(e) => setStatus(e.target.value as StatusFilter)}
								className="w-full rounded-xl border border-ui-border bg-basic-900 p-2 text-basic-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
							>
								<option value="">All status</option>
								<option value="out">Out of stock</option>
								<option value="low">Low stock</option>
								<option value="in">In stock</option>
							</select>
						</div>

						<div className="flex justify-end gap-3 pt-2">
							<button
								type="button"
								onClick={clearFilters}
								className="rounded-xl border border-ui-border px-4 py-2 text-basic-100 transition hover:bg-basic-700"
							>
								Clear
							</button>

							<button
								type="button"
								onClick={applyFilters}
								className="rounded-xl bg-secondary-500 px-4 py-2 text-basic-100 transition hover:bg-secondary-600"
							>
								Apply
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}