import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "@/lib/db/index";

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {},
				password: {},
			},

			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Missing credentials");
				}

				// 1. Get user from DB
				const result = await db.query(
					"SELECT * FROM users WHERE email = $1",
					[credentials.email],
				);

				const user = result.rows[0];

				if (!user) {
					throw new Error("User not found");
				}

				// 2. Compare password
				const isValid = await bcrypt.compare(
					credentials.password,
					user.password,
				);

				if (!isValid) {
					throw new Error("Invalid password");
				}

				// 3. Return user (IMPORTANT)
				return {
					id: user.id.toString(),
					name: user.first_name,
					email: user.email,
				};
			},
		}),
	],

	session: {
		strategy: "jwt",
	},

	pages: {
		signIn: "/login",
	},

	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
