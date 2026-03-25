import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createUser, getUserByEmail } from "@/lib/queries/users";

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const { firstName, lastName, email, password, address, phone } = body;

		// ✅ updated validation
		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!address ||
			!phone
		) {
			return NextResponse.json(
				{ error: "All fields are required" },
				{ status: 400 },
			);
		}

		const existingUser = await getUserByEmail(email);

		if (existingUser) {
			return NextResponse.json(
				{ error: "User already exists" },
				{ status: 400 },
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		// ✅ pass address + phone
		const user = await createUser(
			firstName,
			lastName,
			email,
			hashedPassword,
			address,
			phone,
		);

		return NextResponse.json(user, { status: 201 });
	} catch (error) {
		console.error("REGISTER ERROR:", error);

		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 500 },
		);
	}
}
