// import Form from "next/form";
// import { updateProduct } from "@/lib/actions";
// import { API_URL } from "@/lib/config";
// import type { Product, Category } from "@/lib/types";

// export default async function EditForm({ product }: { product: Product }) {

//   const categories: Category[] = await fetch(`${API_URL}/categories`).then(
//     (res) => res.json()
//   );

//   return (
//     <Form action={updateProduct} className="w-full bg-[var(--color-bg)] p-12 rounded-3xl shadow-xl border border-[var(--color-border)]">
//       <input type="hidden" name="id" value={product.id} />

//       <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-6 items-center">
//         <label className="font-medium text-[var(--color-text-secondary)]" htmlFor="title">
//           Title
//         </label>
//         <input
//           id="title"
//           name="title"
//           type="text"
//           minLength={3}
//           maxLength={20}
//           defaultValue={product.title}
//           className="border border-[var(--color-border)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
//           required
//         />

//         <label className="font-medium text-[var(--color-text-secondary)]" htmlFor="brand">
//           Brand
//         </label>
//         <input
//           id="brand"
//           name="brand"
//           type="text"
//           defaultValue={product.brand}
//           className="border border-[var(--color-border)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
//           required
//         />

//         <label className="font-medium text-[var(--color-text-secondary)]" htmlFor="price">
//           Price
//         </label>
//         <input
//           id="price"
//           name="price"
//           type="number"
//           min="10"
//           max="100000"
//           step="0.01"
//           defaultValue={product.price}
//           className="border border-[var(--color-border)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
//           required
//         />

//         <label className="font-medium text-[var(--color-text-secondary)]" htmlFor="stock">
//           Stock
//         </label>
//         <input
//           id="stock"
//           name="stock"
//           type="number"
//           defaultValue={product.stock}
//           className="border border-[var(--color-border)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
//           required
//         />

//         <label className="font-medium text-[var(--color-text-secondary)]" htmlFor="categoryId">
//           Category
//         </label>
//         <select
//           id="categoryId"
//           name="categoryId"
//           defaultValue={product.categoryId}
//           className="border border-[var(--color-border)] rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
//           required
//         >
//           <option value="" disabled>
//             Select a category
//           </option>
//           {categories.map((cat) => (
//             <option key={cat.id} value={cat.id}>
//               {cat.name}
//             </option>
//           ))}
//         </select>

//         <label className="font-medium text-[var(--color-text-secondary)]" htmlFor="description">
//           Description
//         </label>
//         <textarea
//           id="description"
//           name="description"
//           minLength={5}
//           maxLength={400}
//           defaultValue={product.description}
//           className="border border-[var(--color-border)] rounded-lg p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
//           required
//         />

//         <label className="font-medium text-[var(--color-text-secondary)]" htmlFor="thumbnail">
//           Thumbnail
//         </label>
//         <input
//           id="thumbnail"
//           name="thumbnail"
//           type="text"
//           defaultValue={product.thumbnail}
//           className="border border-[var(--color-border)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
//           required
//         />
//       </div>

//       <button
//         type="submit"
//         className="mt-8 w-auto px-8 bg-[var(--color-primary)] text-white py-2 rounded-lg font-medium hover:opacity-90 transition mx-auto block"
//       >
//         Save changes
//       </button>
//     </Form>
//   );
// }

"use client";

import Form from "next/form";
import { useActionState } from "react";
import { type ActionState, updateProductActionState } from "@/lib/actions";
import type { Product, ProductFormData } from "@/lib/types";

const initialState: ActionState = null;

const inputClass =
	"bg-basic-900 text-basic-100 border border-ui-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary-500";

export default function EditForm({ product }: { product: Product }) {
	const [state, formAction, pending] = useActionState(
		updateProductActionState,
		initialState,
	);

	const data =
		(state?.data as Partial<ProductFormData & { id: number }>) ?? product;

	return (
		<div className="w-full">
			<Form
				key={state?.timestamp}
				action={formAction}
				className="w-full bg-basic-800 p-12 rounded-3xl shadow-xl border border-ui-border"
			>
				<input type="hidden" name="id" value={product.id} />

				<div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-6 items-center">
					<label
						className="font-medium text-basic-300"
						htmlFor="name"
					>
						Name
					</label>
					<div className="col-start-2 flex flex-col gap-1">
						<input
							id="name"
							name="name"
							type="text"
							minLength={3}
							maxLength={100}
							defaultValue={data.name ?? ""}
							className={inputClass}
							required
						/>
						{state?.errors?.name && (
							<p className="text-sm text-warning-500">
								{state.errors.name[0]}
							</p>
						)}
					</div>

					<label
						className="font-medium text-basic-300"
						htmlFor="price"
					>
						Price
					</label>
					<div className="col-start-2 flex flex-col gap-1">
						<input
							id="price"
							name="price"
							type="number"
							min="0.01"
							step="0.01"
							defaultValue={data.price ?? ""}
							className={inputClass}
							required
						/>
						{state?.errors?.price && (
							<p className="text-sm text-warning-500">
								{state.errors.price[0]}
							</p>
						)}
					</div>

					<label
						className="font-medium text-basic-300"
						htmlFor="stock"
					>
						Stock
					</label>
					<div className="col-start-2 flex flex-col gap-1">
						<input
							id="stock"
							name="stock"
							type="number"
							min="0"
							step="1"
							defaultValue={data.stock ?? ""}
							className={inputClass}
							required
						/>
						{state?.errors?.stock && (
							<p className="text-sm text-warning-500">
								{state.errors.stock[0]}
							</p>
						)}
					</div>

					<label
						className="font-medium text-basic-300"
						htmlFor="rarity"
					>
						Rarity
					</label>
					<div className="col-start-2 flex flex-col gap-1">
						<select
							id="rarity"
							name="rarity"
							defaultValue={data.rarity ?? ""}
							className={inputClass}
							required
						>
							<option
								value=""
								disabled
								className="bg-basic-800 text-basic-300"
							>
								Select rarity
							</option>
							<option
								value="COMMON"
								className="bg-basic-800 text-basic-100"
							>
								COMMON
							</option>
							<option
								value="RARE"
								className="bg-basic-800 text-basic-100"
							>
								RARE
							</option>
							<option
								value="EPIC"
								className="bg-basic-800 text-basic-100"
							>
								EPIC
							</option>
							<option
								value="LEGENDARY"
								className="bg-basic-800 text-basic-100"
							>
								LEGENDARY
							</option>
						</select>
						{state?.errors?.rarity && (
							<p className="text-sm text-warning-500">
								{state.errors.rarity[0]}
							</p>
						)}
					</div>

					<label
						className="font-medium text-basic-300"
						htmlFor="description"
					>
						Description
					</label>
					<div className="col-start-2 flex flex-col gap-1">
						<textarea
							id="description"
							name="description"
							minLength={5}
							maxLength={400}
							defaultValue={data.description ?? ""}
							className={`${inputClass} h-24 resize-none`}
							required
						/>
						{state?.errors?.description && (
							<p className="text-sm text-warning-500">
								{state.errors.description[0]}
							</p>
						)}
					</div>

					<label
						className="font-medium text-basic-300"
						htmlFor="image_url"
					>
						Image URL
					</label>
					<div className="col-start-2 flex flex-col gap-1">
						<input
							id="image_url"
							name="image_url"
							type="text"
							defaultValue={data.image_url ?? ""}
							className={inputClass}
							required
						/>
						{state?.errors?.image_url && (
							<p className="text-sm text-warning-500">
								{state.errors.image_url[0]}
							</p>
						)}
					</div>
				</div>

				<button
					type="submit"
					disabled={pending}
					className="mt-8 w-auto px-8 bg-secondary-500 text-basic-100 py-2 rounded-lg font-medium hover:bg-secondary-600 transition mx-auto block disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{pending ? "Saving..." : "Save changes"}
				</button>

				{state?.message && (
					<p className="mt-4 text-center text-sm text-warning-500">
						{state.message}
					</p>
				)}
			</Form>
		</div>
	);
}