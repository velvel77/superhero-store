"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function LoginPage() {
	const router = useRouter()
	const [showPassword, setShowPassword] = useState(false);
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	}

	async function handleLogin() {
		const res = await signIn("credentials", {
			email: form.email,
			password: form.password,
			redirect: false,
		});

		if (res?.error) {
			alert(res.error);
		} else {
			router.push("/welcome");
		}
	}



	return (
		<div className="min-h-screen bg-basic-900 text-basic-100 flex items-center justify-center relative overflow-hidden">
			{/* Background pattern */}
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,0,0,0.15),transparent_60%)]" />

			{/* Card */}
			<div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-basic-800/90 border border-ui-border shadow-2xl backdrop-blur">
				{/* Logo */}
				<div className="flex items-center gap-2 mb-6">
					<div className="bg-secondary-500 p-2 rounded-md">⚡</div>
					<h1 className="font-bold text-lg tracking-wide">
						HERO VAULT
					</h1>
				</div>

				{/* Title */}
				<h2 className="text-3xl font-extrabold mb-2">Welcome Back</h2>
				<p className="text-basic-300 mb-6">
					Access your gear and unleash your power
				</p>

				{/* Email */}
				<div className="mb-4">
					<label className="text-sm text-basic-300 mb-1 block">
						Email
					</label>
					<div className="flex items-center bg-basic-900 border border-ui-border rounded-lg px-3 py-2 focus-within:border-secondary-500 transition">
						<Mail className="w-4 h-4 text-basic-300 mr-2" />
						<input
							name="email"
							onChange={handleChange}
							type="email"
							placeholder="you@example.com"
							className="bg-transparent outline-none w-full text-sm"
						/>
					</div>
				</div>

				{/* Password */}
				<div className="mb-4">
					<label className="text-sm text-basic-300 mb-1 block">
						Password
					</label>
					<div className="flex items-center bg-basic-900 border border-ui-border rounded-lg px-3 py-2 focus-within:border-secondary-500 transition">
						<Lock className="w-4 h-4 text-basic-300 mr-2" />
						<input
							name="password"
							onChange={handleChange}
							type={showPassword ? "text" : "password"}
							placeholder="••••••••"
							className="bg-transparent outline-none w-full text-sm"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="text-basic-300 hover:text-white"
						>
							{showPassword ? (
								<EyeOff size={16} />
							) : (
								<Eye size={16} />
							)}
						</button>
					</div>
				</div>

				{/* Forgot password */}
				<div className="text-right mb-6">
					<button className="text-sm text-secondary-500 hover:underline">
						Forgot password?
					</button>
				</div>

				{/* Login button */}
				<button
					className="w-full bg-secondary-500 hover:bg-secondary-600 transition py-3 rounded-lg font-semibold shadow-lg shadow-secondary-500/30"
					onClick={handleLogin}
				>
					Login
				</button>

				{/* Divider */}
				<div className="flex items-center gap-3 my-6">
					<div className="flex-1 h-px bg-ui-border" />
					<span className="text-xs text-basic-400">OR</span>
					<div className="flex-1 h-px bg-ui-border" />
				</div>

				{/* Social */}
				<div className="flex gap-3">
					<button className="flex-1 border border-ui-border py-2 rounded-lg hover:bg-ui-border/40 transition text-sm">
						Google
					</button>
					<button className="flex-1 border border-ui-border py-2 rounded-lg hover:bg-ui-border/40 transition text-sm">
						GitHub
					</button>
				</div>

				{/* Signup */}
				<p className="text-center text-sm text-basic-300 mt-6">
					Don’t have an account?{" "}
					<span className="text-secondary-500 cursor-pointer hover:underline">
						Sign up
					</span>
				</p>
			</div>
		</div>
	);
}
