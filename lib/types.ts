

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

export type SuperheroRanking = "S" | "A" | "B" | "C" | "D" | "E" | "F";

export type SuperheroStats = {
	strength?: number;
	speed?: number;
	intelligence?: number;
	durability?: number;
	energy?: number;
	combat?: number;
	[key: string]: number | undefined;
};

export type Superhero = {
	id: number;
	name: string;
	price: number | null;
	description: string | null;
	superpowers: string | null;
	stats: SuperheroStats | null;
	image_url: string | null;
	is_available: boolean;
	joined_at: string;
	ranking: SuperheroRanking | null;
};

export type SuperheroFormData = {
	name: string;
	price: number | null;
	description: string;
	superpowers: string;
	stats: SuperheroStats | null;
	image_url: string;
	is_available: boolean;
	ranking: SuperheroRanking | null;
};