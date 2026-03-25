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
		<div className="min-h-screen bg-[#0b0f14] text-white flex items-center justify-center relative overflow-hidden">
			{/* Background pattern */}
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,0,0,0.15),transparent_60%)]" />

			{/* Card */}
			<div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-[#11161c]/90 border border-white/10 shadow-2xl backdrop-blur">
				{/* Logo */}
				<div className="flex items-center gap-2 mb-6">
					<div className="bg-red-600 p-2 rounded-md">⚡</div>
					<h1 className="font-bold text-lg tracking-wide">
						HERO VAULT
					</h1>
				</div>

				{/* Title */}
				<h2 className="text-3xl font-extrabold mb-2">Welcome Back</h2>
				<p className="text-gray-400 mb-6">
					Access your gear and unleash your power
				</p>

				{/* Email */}
				<div className="mb-4">
					<label className="text-sm text-gray-400 mb-1 block">
						Email
					</label>
					<div className="flex items-center bg-[#0b0f14] border border-white/10 rounded-lg px-3 py-2 focus-within:border-red-500 transition">
						<Mail className="w-4 h-4 text-gray-400 mr-2" />
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
					<label className="text-sm text-gray-400 mb-1 block">
						Password
					</label>
					<div className="flex items-center bg-[#0b0f14] border border-white/10 rounded-lg px-3 py-2 focus-within:border-red-500 transition">
						<Lock className="w-4 h-4 text-gray-400 mr-2" />
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
							className="text-gray-400 hover:text-white"
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
					<button className="text-sm text-red-500 hover:underline">
						Forgot password?
					</button>
				</div>

				{/* Login button */}
				<button
					className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-lg font-semibold shadow-lg shadow-red-600/30"
					onClick={handleLogin}
				>
					Login
				</button>

				{/* Divider */}
				<div className="flex items-center gap-3 my-6">
					<div className="flex-1 h-px bg-white/10" />
					<span className="text-xs text-gray-500">OR</span>
					<div className="flex-1 h-px bg-white/10" />
				</div>

				{/* Social */}
				<div className="flex gap-3">
					<button className="flex-1 border border-white/10 py-2 rounded-lg hover:bg-white/5 transition text-sm">
						Google
					</button>
					<button className="flex-1 border border-white/10 py-2 rounded-lg hover:bg-white/5 transition text-sm">
						GitHub
					</button>
				</div>

				{/* Signup */}
				<p className="text-center text-sm text-gray-400 mt-6">
					Don’t have an account?{" "}
					<span className="text-red-500 cursor-pointer hover:underline">
						Sign up
					</span>
				</p>
			</div>
		</div>
	);
}
