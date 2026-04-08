"use client";

import { FormState, subscribeNewsletter } from "@/app/contact/action";
import Form from "next/form";
import { useActionState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Mail } from "lucide-react";

const initialState: FormState = {};

export default function NewsletterForm() {
	const [state, action, pending] = useActionState(
		subscribeNewsletter,
		initialState,
	);

	useEffect(() => {
		if (state.success)
			toast.success("You're subscribed to our newsletter!");
		if (state.error) toast.error(state.error);
	}, [state]);

	return (
		<div className="relative w-full max-w-2xl mx-auto">
			<div className="absolute inset-0 rounded-4xl bg-secondary-500/10 blur-2xl pointer-events-none" />
			<div className="absolute -top-6 right-10 h-24 w-24 rounded-full bg-primary-500/15 blur-2xl pointer-events-none" />

			<Form
				action={action}
				className="relative z-10 w-full rounded-4xl border border-ui-border bg-basic-800/95 p-6 md:p-8 shadow-[0_0_40px_rgba(220,38,38,0.12)] backdrop-blur"
			>
				<div className="mb-6 text-center">
					<div className="inline-block rounded-full border border-ui-border bg-basic-900 px-4 py-1 text-sm font-medium text-primary-400 shadow-[0_0_16px_rgba(255,212,59,0.15)]">
						Hero Updates
					</div>

					<h2 className="mt-4 text-2xl md:text-3xl font-bold text-basic-100">
						Subscribe to our newsletter
					</h2>

					<p className="mt-2 text-basic-300">
						Get the latest gear drops, rare finds, and store
						updates.
					</p>
				</div>

				<div className="flex flex-col gap-4 md:flex-row md:items-end">
					<div className="flex-1">
						<label
							htmlFor="email"
							className="mb-2 block text-sm font-medium text-basic-300"
						>
							Email
						</label>

						<div className="relative">
							<Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-basic-400 w-4 h-4" />
							<input
								id="email"
								type="email"
								name="email"
								placeholder="Your email..."
								required
								className="w-full rounded-xl border border-ui-border bg-basic-900 py-3 pl-11 pr-4 text-basic-100 placeholder:text-basic-400 outline-none transition focus:border-primary-500 focus:shadow-[0_0_12px_var(--color-primary-500)]"
							/>
						</div>
					</div>

					<button
						type="submit"
						disabled={pending}
						className="inline-flex h-12.5 items-center justify-center rounded-xl bg-secondary-500 px-6 font-semibold text-basic-100 transition hover:bg-secondary-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.35)] disabled:cursor-not-allowed disabled:opacity-50"
					>
						{pending ? "Subscribing..." : "Subscribe"}
					</button>
				</div>

				<Toaster
					position="bottom-center"
					toastOptions={{
						className:
							"bg-basic-800 text-basic-100 border border-ui-border",
					}}
				/>
			</Form>
		</div>
	);
}
