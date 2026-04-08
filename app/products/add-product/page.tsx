// import { API_URL } from "@/lib/config";
// import CreateForm from "@/components/ui/create-form";
// import type { Category } from "@/lib/types";

// export default async function CreatePage() {
// 	const categories: Category[] = await fetch(`${API_URL}/categories`).then(
// 		(res) => res.json(),
// 	);

// 	return (
// 		<main className="flex justify-center px-6 py-16">
// 			<div className="w-full max-w-4xl">
// 				<h1 className="text-4xl font-bold mb-12 text-center">
// 					Create New Product
// 				</h1>

// 				<CreateForm categories={categories} />
// 			</div>
// 		</main>
// 	);
// }

import CreateForm from "@/components/ui/create-form";

export default function CreatePage() {
	return (
		<main className="bg-basic-900 flex justify-center px-6 py-16">
			<div className="w-full max-w-4xl">
				<h1 className="text-4xl font-bold text-basic-100 mb-12 text-center">
					Create New Product
				</h1>

				<CreateForm />
			</div>
		</main>
	);
}