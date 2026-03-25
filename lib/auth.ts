import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "@/lib/db/index";

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},

			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Missing credentials");
				}

				const result = await db.query(
					"SELECT * FROM users WHERE email = $1",
					[credentials.email],
				);

				const user = result.rows[0];

				if (!user) throw new Error("User not found");

				const isValid = await bcrypt.compare(
					credentials.password,
					user.password,
				);

				if (!isValid) throw new Error("Invalid password");

				return {
					id: user.id.toString(),
					name: user.first_name,
					email: user.email,
				};
			},
		}),
	],
	session: { strategy: "jwt" },
	pages: { signIn: "/login" },
	secret: process.env.NEXTAUTH_SECRET,
};
