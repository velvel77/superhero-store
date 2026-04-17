import { NextResponse } from "next/server";

function authDisabledResponse() {
	return NextResponse.json(
		{ error: "Authentication is temporarily disabled." },
		{ status: 404 },
	);
}

export const GET = authDisabledResponse;
export const POST = authDisabledResponse;
