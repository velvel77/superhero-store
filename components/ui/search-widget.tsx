// "use client";

// import { ChevronDown, Funnel, Search } from "lucide-react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { ChangeEvent } from "react";

// export default function SearchWidget() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const currentLimit = Number(searchParams.get("limit")) || 5;

//   const createPageURL = (query: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("q", query.toString());
//     params.set("page", "1");
//     params.set("limit", currentLimit.toString());
//     router.push(`${pathname}?${params.toString()}`);
//   };

//   const searchHandler = (e: ChangeEvent) => {
//       const target = e.target as HTMLInputElement;
//       console.log(target.value);
//       createPageURL(target.value);
//   };

//   return (
//     <section className="flex bg-basic-800 rounded-2xl p-3 gap-10 border border-ui-border items-center">
//       <div className="flex gap-3 relative w-full p-1.5 border border-ui-border rounded-xl focus-within:border-primary-500 focus-within:border">
//         <Search className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
//         <input
//           type="text"
//           placeholder="Search products..."
//           className="w-full pl-10 focus:outline-none"
//           onChange={(e) => {
//             searchHandler(e);
//           }}
//         />
//       </div>

//       <div className="flex p-1.5 border border-ui-border rounded-xl">
//         <button
//           className="flex whitespace-nowrap gap-4 px-2 items-center"
//           type="button"
//         >
//           All categories
//           <ChevronDown />
//         </button>
//       </div>

//       <div className="flex p-1.5 border border-ui-border rounded-xl">
//         <button
//           className="flex whitespace-nowrap gap-4 px-2 items-center"
//           type="button"
//         >
//           All status
//           <ChevronDown />
//         </button>
//       </div>

//       <div className="flex p-1.5 border border-ui-border rounded-xl">
//         <button className="flex gap-2 px-2 items-center" type="button">
//           <Funnel className="w-4 h-4 fill-basic-100 stroke-basic-100" />
//           Filter
//         </button>
//       </div>
//     </section>
//   );
// }

"use client";

import { ChevronDown, Funnel, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ChangeEvent } from "react";

export default function SearchWidget() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const currentLimit = Number(searchParams.get("limit")) || 5;
	const currentQuery = searchParams.get("q") || "";

	const updateSearchParams = (query: string) => {
		const params = new URLSearchParams(searchParams.toString());

		params.set("q", query);
		params.set("page", "1");
		params.set("limit", currentLimit.toString());

		router.push(`${pathname}?${params.toString()}`);
	};

	const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
		updateSearchParams(e.target.value);
	};

	return (
		<section className="flex bg-basic-800 rounded-2xl p-3 gap-10 border border-ui-border items-center">
			<div className="flex gap-3 relative w-full p-1.5 border border-ui-border rounded-xl focus-within:border-primary-500">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-basic-300" />
				<input
					type="text"
					placeholder="Search products..."
					defaultValue={currentQuery}
					onChange={searchHandler}
					className="w-full pl-10 bg-transparent text-basic-100 placeholder:text-basic-400 focus:outline-none"
				/>
			</div>

			<div className="flex p-1.5 border border-ui-border rounded-xl">
				<button
					className="flex whitespace-nowrap gap-4 px-2 items-center text-basic-100"
					type="button"
				>
					All categories
					<ChevronDown className="text-basic-300" />
				</button>
			</div>

			<div className="flex p-1.5 border border-ui-border rounded-xl">
				<button
					className="flex whitespace-nowrap gap-4 px-2 items-center text-basic-100"
					type="button"
				>
					All status
					<ChevronDown className="text-basic-300" />
				</button>
			</div>

			<div className="flex p-1.5 border border-ui-border rounded-xl">
				<button
					className="flex gap-2 px-2 items-center text-basic-100"
					type="button"
				>
					<Funnel className="w-4 h-4" />
					Filter
				</button>
			</div>
		</section>
	);
}