import { db } from "@/lib/db/index";
import type { Product, ProductFormData } from "@/lib/types";

type StatusFilter = "" | "out" | "low" | "in";
type RarityFilter = "" | "COMMON" | "RARE" | "EPIC" | "LEGENDARY";

type GetProductsParams = {
	page?: number;
	limit?: number;
	q?: string;
	rarity?: RarityFilter;
	status?: StatusFilter;
};

export async function getProducts({
	page = 1,
	limit = 5,
	q = "",
	rarity = "",
	status = "",
}: GetProductsParams = {}): Promise<Product[]> {
	const offset = (page - 1) * limit;

	const { whereClause, values } = buildProductFilters({
		q,
		rarity,
		status,
	});

	values.push(limit);
	values.push(offset);

	const res = await db.query(
		`
    SELECT *
    FROM products
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT $${values.length - 1} OFFSET $${values.length}
    `,
		values,
	);

	return res.rows;
}

export async function getProductsCount({
	q = "",
	rarity = "",
	status = "",
}: {
	q?: string;
	rarity?: RarityFilter;
	status?: StatusFilter;
} = {}): Promise<number> {
	const { whereClause, values } = buildProductFilters({
		q,
		rarity,
		status,
	});

	const res = await db.query(
		`
    SELECT COUNT(*)::int AS count
    FROM products
    ${whereClause}
    `,
		values,
	);

	return res.rows[0].count;
}

export async function addProduct(product: ProductFormData): Promise<Product> {
	const res = await db.query(
		`
    INSERT INTO products (name, price, description, stock, image_url, rarity, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    RETURNING *;
    `,
		[
			product.name,
			product.price,
			product.description,
			product.stock,
			product.image_url,
			product.rarity,
		],
	);

	return res.rows[0];
}

export async function getProductById(id: number): Promise<Product> {
	const res = await db.query(
		`
    SELECT *
    FROM products
    WHERE id = $1
    `,
		[id],
	);

	return res.rows[0];
}

export async function updateProductById(
	id: number,
	product: ProductFormData,
): Promise<Product> {
	const res = await db.query(
		`
    UPDATE products
    SET
      name = $1,
      price = $2,
      description = $3,
      stock = $4,
      image_url = $5,
      rarity = $6,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $7
    RETURNING *;
    `,
		[
			product.name,
			product.price,
			product.description,
			product.stock,
			product.image_url,
			product.rarity,
			id,
		],
	);

	return res.rows[0];
}

export async function deleteProductById(id: number): Promise<void> {
	await db.query(
		`
    DELETE FROM products
    WHERE id = $1
    `,
		[id],
	);
}

function buildProductFilters({
	q = "",
	rarity = "",
	status = "",
}: {
	q?: string;
	rarity?: RarityFilter;
	status?: StatusFilter;
}) {
	const conditions: string[] = [];
	const values: (string | number)[] = [];

	if (q.trim()) {
		values.push(`%${q.trim()}%`);
		conditions.push(`name ILIKE $${values.length}`);
	}

	if (rarity) {
		values.push(rarity);
		conditions.push(`rarity = $${values.length}`);
	}

	if (status === "out") {
		conditions.push(`stock = 0`);
	} else if (status === "low") {
		conditions.push(`stock > 0 AND stock < 10`);
	} else if (status === "in") {
		conditions.push(`stock >= 10`);
	}

	const whereClause = conditions.length
		? `WHERE ${conditions.join(" AND ")}`
		: "";

	return { whereClause, values };
}

export type ShopProduct = {
	id: number;
	name: string;
	price: number;
	description: string | null;
	stock: number;
	image_url: string | null;
	rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
	categories: string[];
	stats: {
		POWER?: number;
		DURABILITY?: number;
		SPECIAL?: number;
	};
};

export async function getProductsForShop(): Promise<ShopProduct[]> {
	const res = await db.query(
		`
    SELECT
      p.id,
      p.name,
      p.price::float AS price,
      p.description,
      p.stock,
      p.image_url,
      p.rarity,
      COALESCE(cat.categories, ARRAY[]::text[]) AS categories,
      COALESCE(stat_block.stats, '{}'::jsonb) AS stats
    FROM products p
    LEFT JOIN LATERAL (
      SELECT ARRAY_AGG(c.name ORDER BY c.name) AS categories
      FROM product_categories pc
      INNER JOIN categories c ON c.id = pc.category_id
      WHERE pc.product_id = p.id
    ) cat ON true
    LEFT JOIN LATERAL (
      SELECT JSONB_OBJECT_AGG(ps.stat_name, ps.value) AS stats
      FROM product_stats ps
      WHERE ps.product_id = p.id
    ) stat_block ON true
    ORDER BY p.created_at DESC, p.id DESC
    `,
	);

	return res.rows;
}

export type RelatedProduct = {
	id: number;
	name: string;
	price: number;
	image_url: string | null;
	rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
	category: string;
};

export async function getRelatedProducts(limit = 3): Promise<RelatedProduct[]> {
	const res = await db.query(
		`
    SELECT
      p.id,
      p.name,
      p.price::float AS price,
      p.image_url,
      p.rarity,
      COALESCE(cat.name, 'Misc') AS category
    FROM products p
    LEFT JOIN LATERAL (
      SELECT c.name
      FROM product_categories pc
      INNER JOIN categories c ON c.id = pc.category_id
      WHERE pc.product_id = p.id
      ORDER BY c.name
      LIMIT 1
    ) cat ON true
    ORDER BY p.created_at DESC, p.id DESC
    LIMIT $1
    `,
		[limit],
	);

	return res.rows;
}

export type ProductDetails = {
	id: number;
	name: string;
	price: number;
	description: string | null;
	stock: number;
	image_url: string | null;
	rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
	categories: string[];
	stats: {
		POWER?: number;
		DURABILITY?: number;
		SPECIAL?: number;
	};
};

export async function getProductDetailsById(
	id: number,
): Promise<ProductDetails | null> {
	const res = await db.query(
		`
    SELECT
      p.id,
      p.name,
      p.price::float AS price,
      p.description,
      p.stock,
      p.image_url,
      p.rarity,
      COALESCE(cat.categories, ARRAY[]::text[]) AS categories,
      COALESCE(stat_block.stats, '{}'::jsonb) AS stats
    FROM products p
    LEFT JOIN LATERAL (
      SELECT ARRAY_AGG(c.name ORDER BY c.name) AS categories
      FROM product_categories pc
      INNER JOIN categories c ON c.id = pc.category_id
      WHERE pc.product_id = p.id
    ) cat ON true
    LEFT JOIN LATERAL (
      SELECT JSONB_OBJECT_AGG(ps.stat_name, ps.value) AS stats
      FROM product_stats ps
      WHERE ps.product_id = p.id
    ) stat_block ON true
    WHERE p.id = $1
    LIMIT 1
    `,
		[id],
	);

	return res.rows[0] ?? null;
}