import { db } from "@/lib/db/index";

export async function getProducts() {
	const res = await db.query("SELECT * FROM products");
	return res.rows;
}