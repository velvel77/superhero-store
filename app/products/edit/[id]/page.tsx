// import { API_URL } from "@/lib/config";
// import EditForm from "@/components/ui/edit-form";
// import type { Category, Product } from "@/lib/types";

// export default async function UpdatePage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   const product: Product = await fetch(
//     `${API_URL}/products/${id}`
//   ).then((res) => res.json());

//   return (
//     <main className="bg-basic-300 flex justify-center px-6 py-16">
//       <div className="w-full max-w-4xl">
//         <h1 className="text-4xl font-bold mb-12 text-center">
//           Edit Product
//         </h1>

//           <EditForm product={product} />

//       </div>
//     </main>
//   );
// }

import EditForm from "@/components/ui/edit-form";
import { getProductById } from "@/lib/queries/products";
import type { Product } from "@/lib/types";

export default async function UpdatePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const product: Product = await getProductById(Number(id));

	return (
		<main className="bg-basic-900 flex justify-center px-6 py-16">
			<div className="w-full max-w-4xl">
				<h1 className="text-4xl font-bold text-basic-100 mb-12 text-center">
					Edit Product
				</h1>

				<EditForm product={product} />
			</div>
		</main>
	);
}