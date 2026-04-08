export interface Product {
	id: number;
	name: string;
	description: string | null;
	price: number;
	stock: number;
	image_url: string | null;
	rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
	created_at: string;
	updated_at: string;
}

export interface ProductsResponse {
	products: Product[];
	total: number;
	limit: number;
	page: number;
	pages: number;
}

export type ProductFormData = {
	name: string;
	price: number;
	description: string;
	stock: number;
	image_url: string;
	rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
};
