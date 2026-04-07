"use client";

import sendMessage from "@/app/contact/action";
import Form from "next/form";
import { useActionState, useOptimistic } from "react";

export default function ContactForm() {
	const [state, action, pending] = useActionState(sendMessage, {});
	const [optimisticState, setOptimistic] = useOptimistic(state);

	async function handleAction(formData: FormData) {
		setOptimistic({ success: true });
		action(formData);
	}

	return (
		<section className="relative min-h-screen bg-basic-900 flex items-center justify-center px-6 py-16 overflow-hidden">
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-20 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-secondary-500/20 blur-3xl" />
				<div className="absolute bottom-10 right-20 h-56 w-56 rounded-full bg-primary-500/15 blur-3xl" />
				<div className="absolute top-1/3 left-16 h-40 w-40 rounded-full bg-info-blue-500/10 blur-3xl" />
			</div>

			{optimisticState.success ? (
				<div className="relative z-10 w-full max-w-2xl rounded-4xl border border-ui-border bg-basic-800/95 p-10 shadow-[0_0_40px_rgba(220,38,38,0.15)] backdrop-blur">
					<h2 className="text-3xl font-bold text-basic-100 text-center">
						Message Sent
					</h2>
					<p className="mt-4 text-center text-basic-300 text-lg">
						Your message was sent, we&apos;ll get back to you soon.
					</p>
				</div>
			) : (
				<Form
					action={handleAction}
					className="relative z-10 w-full max-w-2xl rounded-4xl border border-ui-border bg-basic-800/95 p-8 md:p-10 shadow-[0_0_45px_rgba(220,38,38,0.12)] backdrop-blur"
				>
					<div className="mb-8 text-center">
						<div className="inline-block rounded-full border border-ui-border bg-basic-900 px-4 py-1 text-sm font-medium text-primary-400 shadow-[0_0_18px_rgba(255,212,59,0.18)]">
							Hero Support
						</div>

						<h2 className="mt-4 text-4xl font-bold text-basic-100">
							Contact Us
						</h2>

						<p className="mt-3 text-basic-300 max-w-xl mx-auto">
							Have a question, feedback, or a mission for our
							team? Send us a message and we&apos;ll respond as
							soon as possible.
						</p>
					</div>

					<div className="flex flex-col gap-6">
						<div className="flex flex-col gap-2">
							<label
								htmlFor="name"
								className="text-sm font-medium text-basic-300"
							>
								Name
							</label>
							<input
								id="name"
								type="text"
								name="name"
								required
								placeholder="Your name"
								className="rounded-xl border border-ui-border bg-basic-900 px-4 py-3 text-basic-100 placeholder:text-basic-400 outline-none transition focus:border-primary-500 focus:shadow-[0_0_12px_var(--color-primary-500)]"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<label
								htmlFor="email"
								className="text-sm font-medium text-basic-300"
							>
								Email
							</label>
							<input
								id="email"
								type="email"
								name="email"
								required
								placeholder="you@example.com"
								className="rounded-xl border border-ui-border bg-basic-900 px-4 py-3 text-basic-100 placeholder:text-basic-400 outline-none transition focus:border-primary-500 focus:shadow-[0_0_12px_var(--color-primary-500)]"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<label
								htmlFor="message"
								className="text-sm font-medium text-basic-300"
							>
								Message
							</label>
							<textarea
								id="message"
								name="message"
								required
								rows={6}
								placeholder="Write your message here..."
								className="resize-none rounded-xl border border-ui-border bg-basic-900 px-4 py-3 text-basic-100 placeholder:text-basic-400 outline-none transition focus:border-secondary-500 focus:shadow-[0_0_14px_var(--color-secondary-500)]"
							/>
						</div>

						{optimisticState.error && (
							<p className="rounded-xl border border-secondary-500 bg-basic-900 px-4 py-3 text-sm text-secondary-500 shadow-[0_0_12px_rgba(220,38,38,0.15)]">
								{optimisticState.error}
							</p>
						)}

						<button
							type="submit"
							disabled={pending}
							className="mt-2 inline-flex items-center justify-center rounded-xl bg-secondary-500 px-6 py-3 font-semibold text-basic-100 transition hover:bg-secondary-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.35)] disabled:cursor-not-allowed disabled:opacity-50"
						>
							{pending ? "Sending..." : "Send Message"}
						</button>
					</div>
				</Form>
			)}
		</section>
	);
}
