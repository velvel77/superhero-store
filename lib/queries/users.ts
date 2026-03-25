import { db } from "@/lib/db/index";

export async function getUserByEmail(email: string) {
	const result = await db.query("SELECT * FROM users WHERE email = $1", [
		email,
	]);
	return result.rows[0];
}

export async function createUser(
	firstName: string,
	lastName: string,
	email: string,
	password: string,
	address: string,
	phone: string,
) {
	const result = await db.query(
		`INSERT INTO users 
		(first_name, last_name, email, password, address, phone_number)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING *`,
		[firstName, lastName, email, password, address, phone],
	);

	return result.rows[0];
}
