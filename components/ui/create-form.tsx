"use client";

import Form from "next/form";
import { useActionState } from "react";
import { type ActionState, addProductActionState } from "@/lib/actions";
import type { ProductFormData, Category } from "@/lib/types";

const initialState: ActionState = null;

export default function CreateForm({ categories }: { categories: Category[] }) {
	const [state, formAction, pending] = useActionState(
		addProductActionState,
		initialState,
	);

	const data = state?.data as ProductFormData;

	return (
		<div className="w-full">
			<Form
				key={state?.timestamp}
				action={formAction}
				className="w-full bg-basic-800 p-12 rounded-3xl shadow-xl border border-ui-border"
			>
				<div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-6 items-center">
					<label
						className="font-medium text-basic-300"
						htmlFor="title"
					>
						Title
					</label>
					<input
						className="border border-ui-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-secondary-500"
						type="text"
						id="title"
						name="title"
						minLength={3}
						maxLength={20}
						defaultValue={data?.title}
						required
					/>

					<label
						className="font-medium text-basic-300"
						htmlFor="brand"
					>
						Brand
					</label>
					<input
						className="border border-ui-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-secondary-500"
						type="text"
						id="brand"
						name="brand"
						defaultValue={data?.brand}
						required
					/>

					<label
						className="font-medium text-basic-300"
						htmlFor="price"
					>
						Price
					</label>
					{/* <input
            className="border border-ui-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-secondary-500"
            type="number"
            min="0.5"
            step="0.01"
            id="price"
            name="price"
            defaultValue={data?.price}
            required
          /> */}
					<div className="col-start-2 flex flex-col space-y-1">
						<input
							className="border border-ui-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-secondary-500"
							type="number"
							id="price"
							name="price"
							min="0.5"
							step="0.01"
							defaultValue={data?.price}
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
					<input
						className="border border-ui-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-secondary-500"
						type="number"
						id="stock"
						name="stock"
						defaultValue={data?.stock}
						required
					/>

					<label
						className="font-medium text-basic-300"
						htmlFor="categoryId"
					>
						Category
					</label>
					<select
						className="bg-basic-800 border border-ui-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-secondary-500"
						id="categoryId"
						name="categoryId"
						defaultValue={data?.categoryId ?? ""}
						required
					>
						<option
							value=""
							disabled
							className="bg-basic-800 text-basic-300"
						>
							Select a category
						</option>
						{categories.map((category) => (
							<option
								key={category.id}
								value={category.id}
								className="bg-basic-800"
							>
								{category.name}
							</option>
						))}
					</select>

					<label
						className="font-medium text-basic-300"
						htmlFor="description"
					>
						Description
					</label>
					<textarea
						className="border border-ui-border rounded-lg p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-secondary-500"
						id="description"
						name="description"
						minLength={5}
						maxLength={400}
						defaultValue={data?.description}
						required
					/>

					<label
						className="font-medium text-basic-300"
						htmlFor="thumbnail"
					>
						Thumbnail
					</label>
					{/* <input
            className="border border-ui-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-secondary-500"
            type="url"
            id="thumbnail"
            name="thumbnail"
            defaultValue={data?.thumbnail}
            required
          />
        </div> */}

					<div className="col-start-2 flex flex-col space-y-1">
						<input
							type="text"
							id="thumbnail"
							name="thumbnail"
							defaultValue={data?.thumbnail}
							required
							className="border border-ui-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-secondary-500"
						/>
						{state?.errors?.thumbnail && (
							<p className="text-sm text-warning-500">
								{state.errors.thumbnail[0]}
							</p>
						)}
					</div>
				</div>

				<button
					type="submit"
					disabled={pending}
					className="mt-8 w-auto px-8 bg-secondary-500 py-2 rounded-lg font-medium hover:opacity-90 transition mx-auto block disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{pending ? "Saving..." : "Save Product"}
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
