"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, Phone, MapPin } from "lucide-react";

export default function RegisterPage() {
	const [showPassword, setShowPassword] = useState(false);

	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		address: "",
		phone: "",
	});

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	}

	async function handleSubmit() {
		if (form.password !== form.confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		const res = await fetch("/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(form),
		});

		const data = await res.json();

		if (!res.ok) {
			alert(data.error);
		} else {
			alert("Account created!");
		}
	}

	return (
		<div className="min-h-screen bg-[#0b0f14] text-white flex items-center justify-center relative overflow-hidden">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,0,0,0.15),transparent_60%)]" />

			<div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-[#11161c]/90 border border-white/10 shadow-2xl backdrop-blur">
				<div className="flex items-center gap-2 mb-6">
					<div className="bg-red-600 p-2 rounded-md">⚡</div>
					<h1 className="font-bold text-lg tracking-wide">
						HERO VAULT
					</h1>
				</div>

				<h2 className="text-3xl font-extrabold mb-2">Create Account</h2>
				<p className="text-gray-400 mb-6">
					Join the vault and unlock legendary gear
				</p>

				{/* First + Last name */}
				<div className="flex gap-3 mb-4">
					<div className="flex-1">
						<label className="text-sm text-gray-400 mb-1 block">
							First Name
						</label>
						<div className="flex items-center bg-[#0b0f14] border border-white/10 rounded-lg px-3 py-2 focus-within:border-red-500 transition">
							<User className="w-4 h-4 text-gray-400 mr-2" />
							<input
								name="firstName"
								onChange={handleChange}
								type="text"
								placeholder="John"
								className="bg-transparent outline-none w-full text-sm"
							/>
						</div>
					</div>

					<div className="flex-1">
						<label className="text-sm text-gray-400 mb-1 block">
							Last Name
						</label>
						<div className="flex items-center bg-[#0b0f14] border border-white/10 rounded-lg px-3 py-2 focus-within:border-red-500 transition">
							<User className="w-4 h-4 text-gray-400 mr-2" />
							<input
								name="lastName"
								onChange={handleChange}
								type="text"
								placeholder="Doe"
								className="bg-transparent outline-none w-full text-sm"
							/>
						</div>
					</div>
				</div>

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

				{/* Phone */}
				<div className="mb-4">
					<label className="text-sm text-gray-400 mb-1 block">
						Phone Number
					</label>
					<div className="flex items-center bg-[#0b0f14] border border-white/10 rounded-lg px-3 py-2 focus-within:border-red-500 transition">
						<Phone className="w-4 h-4 text-gray-400 mr-2" />
						<input
							name="phone"
							onChange={handleChange}
							type="tel"
							placeholder="+46 70 123 45 67"
							className="bg-transparent outline-none w-full text-sm"
						/>
					</div>
				</div>

				{/* Address */}
				<div className="mb-4">
					<label className="text-sm text-gray-400 mb-1 block">
						Address
					</label>
					<div className="flex items-center bg-[#0b0f14] border border-white/10 rounded-lg px-3 py-2 focus-within:border-red-500 transition">
						<MapPin className="w-4 h-4 text-gray-400 mr-2" />
						<input
							name="address"
							onChange={handleChange}
							type="text"
							placeholder="Street, City, Country"
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

				{/* Confirm Password */}
				<div className="mb-6">
					<label className="text-sm text-gray-400 mb-1 block">
						Confirm Password
					</label>
					<div className="flex items-center bg-[#0b0f14] border border-white/10 rounded-lg px-3 py-2 focus-within:border-red-500 transition">
						<Lock className="w-4 h-4 text-gray-400 mr-2" />
						<input
							name="confirmPassword"
							onChange={handleChange}
							type="password"
							placeholder="••••••••"
							className="bg-transparent outline-none w-full text-sm"
						/>
					</div>
				</div>

				<button
					className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-lg font-semibold shadow-lg shadow-red-600/30"
					onClick={handleSubmit}
				>
					Create Account
				</button>

				<div className="flex items-center gap-3 my-6">
					<div className="flex-1 h-px bg-white/10" />
					<span className="text-xs text-gray-500">OR</span>
					<div className="flex-1 h-px bg-white/10" />
				</div>

				<div className="flex gap-3">
					<button className="flex-1 border border-white/10 py-2 rounded-lg hover:bg-white/5 transition text-sm">
						Google
					</button>
					<button className="flex-1 border border-white/10 py-2 rounded-lg hover:bg-white/5 transition text-sm">
						GitHub
					</button>
				</div>

				<p className="text-center text-sm text-gray-400 mt-6">
					Already have an account?{" "}
					<span className="text-red-500 cursor-pointer hover:underline">
						Login
					</span>
				</p>
			</div>
		</div>
	);
}
