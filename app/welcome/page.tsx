"use client";

import { useSession } from "next-auth/react";


export default function WelcomePage() {
	const { data: session } = useSession();

	return (
		<div>
			{session ? (
				<p>Welcome {session.user?.name}</p>
			) : (
				<p>You are not logged in</p>
			)}
		</div>
	);
}
