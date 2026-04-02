// "use server";

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { addProduct, updateProductById } from "@/lib/db";
// import type { ProductFormData } from "@/lib/types";
// import { API_URL } from "@/lib/config";

// export type ActionState = {
//   message?: string;
//   data: unknown;
//   errors?: Record<string, string[]>;
//   timestamp: number;
// } | null;

// export async function addProductActionState(
//   _prevState: ActionState,
//   formData: FormData,
// ): Promise<ActionState> {
//   const title = formData.get("title") as string;
//   const price = formData.get("price") as string;
//   const description = formData.get("description") as string;
//   const thumbnail = formData.get("thumbnail") as string;
//   const categoryId = formData.get("categoryId") as string;
//   const stock = formData.get("stock") as string;
//   const brand = formData.get("brand") as string;

//   const newProduct: ProductFormData = {
//     title,
//     brand,
//     description,
//     thumbnail,
//     price: parseInt(price, 10),
//     categoryId: parseInt(categoryId, 10),
//     stock: parseInt(stock, 10),
//   };

//   if (!/^https?:\/\/.+/.test(newProduct.thumbnail)) {
//     const state: ActionState = {
//       data: newProduct,
//       errors: { thumbnail: ["Please enter a valid image URL starting with http or https"] },
//       timestamp: Date.now(),
//     };
//     return state;
//   }

//   if (newProduct.price < 10 || newProduct.price > 100_000) {
//     return {
//       data: newProduct,
//       errors: { price: ["Price must be between 10 and 100,000"] },
//       timestamp: Date.now(),
//     };
//   }

//   //   if (title.length < 3 || title.length > 20) {
//   //   return {
//   //     message: "Title must be between 3 and 20 characters",
//   //     data: newProduct,
//   //     timestamp: Date.now(),
//   //   };
//   // }

//   const res = await addProduct(newProduct);
//   if (!res.ok) {
//     return {
//       message: "Something went wrong... ",
//       // data: formData,
//       data: newProduct,
//       timestamp: Date.now(),
//     };
//   }

//   revalidatePath("/");
//   redirect("/?status=success");
// }

// export async function updateProduct(formData: FormData) {
//   const id = formData.get("id") as string;
//   const title = formData.get("title") as string;
//   const price = formData.get("price") as string;
//   const description = formData.get("description") as string;
//   const thumbnail = formData.get("thumbnail") as string;
//   const categoryId = formData.get("categoryId") as string;
//   const stock = formData.get("stock") as string;
//   const brand = formData.get("brand") as string;

//   const newProduct = {
//     title,
//     brand,
//     description,
//     thumbnail,
//     price: parseInt(price, 10),
//     categoryId: parseInt(categoryId, 10),
//     stock: parseInt(stock, 10),
//   };

//   const res = await updateProductById(id, newProduct);

//   const data = await res.json();
//   // we can do things here to see if we have a success or not later on
//   console.log(data);

//   revalidatePath("/");
//   redirect("/?status=updated");
// }

// /* Delete product */

// export async function deleteProductActionState(
//   _prevState: ActionState,
//   formData: FormData,
// ): Promise<ActionState> {
//   const id = formData.get("id") as string;
//   console.log("Deleting product with id:", id);

//   const res = await fetch(`${API_URL}/products/${id}`, {
//     method: "DELETE",
//   });

//   console.log("Response status:", res.status);

//   if (!res.ok) {
//     return {
//       message: "Failed to delete product",
//       data: null,
//       timestamp: Date.now(),
//     };
//   }

//   revalidatePath("/", "layout");

//   console.log("Returning state:", { message: "Product deleted successfully" });
//   return {
//     message: "Product deleted successfully",
//     data: null,
//     timestamp: Date.now(),
//   };
// }

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ProductFormData } from "@/lib/types";
import {
	addProduct,
	updateProductById,
	deleteProductById,
} from "@/lib/queries/products";

export type ActionState = {
	message?: string;
	data: unknown;
	errors?: Record<string, string[]>;
	timestamp: number;
} | null;

export async function addProductActionState(
	_prevState: ActionState,
	formData: FormData,
): Promise<ActionState> {
	const name = formData.get("name") as string;
	const price = formData.get("price") as string;
	const description = formData.get("description") as string;
	const image_url = formData.get("image_url") as string;
	const stock = formData.get("stock") as string;
	const rarity = formData.get("rarity") as ProductFormData["rarity"];

	const newProduct: ProductFormData = {
		name: name.trim(),
		description: description.trim(),
		image_url: image_url.trim(),
		rarity,
		price: Number(price),
		stock: Number(stock),
	};

	const errors: Record<string, string[]> = {};

	if (newProduct.name.length < 3 || newProduct.name.length > 100) {
		errors.name = ["Name must be between 3 and 100 characters"];
	}

	if (!/^https?:\/\/.+/.test(newProduct.image_url)) {
		errors.image_url = [
			"Please enter a valid image URL starting with http or https",
		];
	}

	if (Number.isNaN(newProduct.price) || newProduct.price < 0.01) {
		errors.price = ["Price must be at least 0.01"];
	}

	if (!Number.isInteger(newProduct.stock) || newProduct.stock < 0) {
		errors.stock = ["Stock must be a whole number of 0 or more"];
	}

	if (!["COMMON", "RARE", "EPIC", "LEGENDARY"].includes(newProduct.rarity)) {
		errors.rarity = ["Please select a valid rarity"];
	}

	if (
		newProduct.description.length < 5 ||
		newProduct.description.length > 400
	) {
		errors.description = [
			"Description must be between 5 and 400 characters",
		];
	}

	if (Object.keys(errors).length > 0) {
		return {
			data: newProduct,
			errors,
			timestamp: Date.now(),
		};
	}

	try {
		await addProduct(newProduct);
	} catch {
		return {
			message: "Something went wrong while creating the product.",
			data: newProduct,
			timestamp: Date.now(),
		};
	}

	revalidatePath("/products");
	redirect("/products?status=success");
}

export async function updateProductActionState(
	_prevState: ActionState,
	formData: FormData,
): Promise<ActionState> {
	const id = Number(formData.get("id"));

	const name = formData.get("name") as string;
	const price = formData.get("price") as string;
	const description = formData.get("description") as string;
	const image_url = formData.get("image_url") as string;
	const stock = formData.get("stock") as string;
	const rarity = formData.get("rarity") as ProductFormData["rarity"];

	const updatedProduct: ProductFormData = {
		name: name.trim(),
		description: description.trim(),
		image_url: image_url.trim(),
		rarity,
		price: Number(price),
		stock: Number(stock),
	};

	const errors: Record<string, string[]> = {};

	if (!id || Number.isNaN(id)) {
		errors.id = ["Invalid product id"];
	}

	if (updatedProduct.name.length < 3 || updatedProduct.name.length > 100) {
		errors.name = ["Name must be between 3 and 100 characters"];
	}

	if (!/^https?:\/\/.+/.test(updatedProduct.image_url)) {
		errors.image_url = [
			"Please enter a valid image URL starting with http or https",
		];
	}

	if (Number.isNaN(updatedProduct.price) || updatedProduct.price < 0.01) {
		errors.price = ["Price must be at least 0.01"];
	}

	if (!Number.isInteger(updatedProduct.stock) || updatedProduct.stock < 0) {
		errors.stock = ["Stock must be a whole number of 0 or more"];
	}

	if (
		!["COMMON", "RARE", "EPIC", "LEGENDARY"].includes(updatedProduct.rarity)
	) {
		errors.rarity = ["Please select a valid rarity"];
	}

	if (
		updatedProduct.description.length < 5 ||
		updatedProduct.description.length > 400
	) {
		errors.description = [
			"Description must be between 5 and 400 characters",
		];
	}

	if (Object.keys(errors).length > 0) {
		return {
			data: { id, ...updatedProduct },
			errors,
			timestamp: Date.now(),
		};
	}

	try {
		await updateProductById(id, updatedProduct);
	} catch {
		return {
			message: "Something went wrong while updating the product.",
			data: { id, ...updatedProduct },
			timestamp: Date.now(),
		};
	}

	revalidatePath("/products");
	redirect("/products?status=updated");
}

export async function deleteProductActionState(
	_prevState: ActionState,
	formData: FormData,
): Promise<ActionState> {
	const id = Number(formData.get("id"));

	if (!id || Number.isNaN(id)) {
		return {
			message: "Invalid product id",
			data: null,
			timestamp: Date.now(),
		};
	}

	try {
		await deleteProductById(id);
	} catch {
		return {
			message: "Failed to delete product",
			data: null,
			timestamp: Date.now(),
		};
	}

	revalidatePath("/products");

	return {
		message: "Product deleted successfully",
		data: null,
		timestamp: Date.now(),
	};
}