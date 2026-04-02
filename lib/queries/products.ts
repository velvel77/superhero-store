// import { db } from "@/lib/db/index";
// import type { Product } from "@/types";

// type GetProductsParams = {
// 	page?: number;
// 	limit?: number;
// 	q?: string;
// };

// export async function getProducts({
// 	page = 1,
// 	limit = 5,
// 	q = "",
// }: GetProductsParams = {}): Promise<Product[]> {
// 	const offset = (page - 1) * limit;

// 	if (q.trim()) {
// 		const res = await db.query(
// 			`
//       SELECT *
//       FROM products
//       WHERE name ILIKE $1
//       ORDER BY created_at DESC
//       LIMIT $2 OFFSET $3
//       `,
// 			[`%${q}%`, limit, offset],
// 		);

// 		return res.rows;
// 	}

// 	const res = await db.query(
// 		`
//     SELECT *
//     FROM products
//     ORDER BY created_at DESC
//     LIMIT $1 OFFSET $2
//     `,
// 		[limit, offset],
// 	);

// 	return res.rows;
// }

// export async function getProductsCount(q = ""): Promise<number> {
// 	if (q.trim()) {
// 		const res = await db.query(
// 			`
//       SELECT COUNT(*)::int AS count
//       FROM products
//       WHERE name ILIKE $1
//       `,
// 			[`%${q}%`],
// 		);

// 		return res.rows[0].count;
// 	}

// 	const res = await db.query(`
//     SELECT COUNT(*)::int AS count
//     FROM products
//   `);

// 	return res.rows[0].count;
// }

import { db } from "@/lib/db/index";
import type { Product, ProductFormData } from "@/lib/types";

type GetProductsParams = {
	page?: number;
	limit?: number;
	q?: string;
};

export async function getProducts({
	page = 1,
	limit = 5,
	q = "",
}: GetProductsParams = {}): Promise<Product[]> {
	const offset = (page - 1) * limit;

	if (q.trim()) {
		const res = await db.query(
			`
      SELECT *
      FROM products
      WHERE name ILIKE $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3
      `,
			[`%${q}%`, limit, offset],
		);

		return res.rows;
	}

	const res = await db.query(
		`
    SELECT *
    FROM products
    ORDER BY created_at DESC
    LIMIT $1 OFFSET $2
    `,
		[limit, offset],
	);

	return res.rows;
}

export async function getProductsCount(q = ""): Promise<number> {
	if (q.trim()) {
		const res = await db.query(
			`
      SELECT COUNT(*)::int AS count
      FROM products
      WHERE name ILIKE $1
      `,
			[`%${q}%`],
		);

		return res.rows[0].count;
	}

	const res = await db.query(`
    SELECT COUNT(*)::int AS count
    FROM products
  `);

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