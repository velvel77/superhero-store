// export interface Category {
// 	id: number;
// 	name: string;
// 	slug: string;
// 	image: string;
// }

// export interface Product {
// 	id: number;
// 	name: string;
// 	description: string | null;
// 	categoryId: number;
// 	category?: Category;
// 	price: number;
// 	discountPercentage?: number;
// 	rating?: number;
// 	stock?: number;
// 	tags?: string[];
// 	brand?: string;
// 	sku?: string;
// 	weight?: number;
// 	dimensions?: {
// 		width: number;
// 		height: number;
// 		depth: number;
// 	};
// 	warrantyInformation?: string;
// 	shippingInformation?: string;
// 	availabilityStatus?: string;
// 	reviews?: {
// 		rating: number;
// 		comment: string;
// 		date: string;
// 		reviewerName: string;
// 		reviewerEmail: string;
// 	}[];
// 	returnPolicy?: string;
// 	minimumOrderQuantity?: number;
// 	meta: {
// 		createdAt: string;
// 		updatedAt: string;
// 		barcode?: string;
// 		qrCode?: string;
// 	};
// 	image_url: string | null;
// 	images: string[];
// 	thumbnail: string;
// 	rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
// 	created_at: string;
// 	updated_at: string;
// }

// export interface ProductsResponse {
// 	products: Product[];
// 	total: number;
// 	limit: number;
// 	page: number;
// 	pages: number;
// }

// export type ProductFormData = Pick<
// 	Product,
// 	| "title"
// 	| "brand"
// 	| "price"
// 	| "description"
// 	| "thumbnail"
// 	| "categoryId"
// 	| "stock"
// >;

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