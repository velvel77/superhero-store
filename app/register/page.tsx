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
		<div className="min-h-screen bg-basic-900 text-basic-100 flex items-center justify-center relative overflow-hidden">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,0,0,0.15),transparent_60%)]" />

			<div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-basic-800/90 border border-ui-border shadow-2xl backdrop-blur">
				<div className="flex items-center gap-2 mb-6">
					<div className="bg-secondary-500 p-2 rounded-md">⚡</div>
					<h1 className="font-bold text-lg tracking-wide">
						HERO VAULT
					</h1>
				</div>

				<h2 className="text-3xl font-extrabold mb-2">Create Account</h2>
				<p className="text-basic-300 mb-6">
					Join the vault and unlock legendary gear
				</p>

				{/* First + Last name */}
				<div className="flex gap-3 mb-4">
					<div className="flex-1">
						<label className="text-sm text-basic-300 mb-1 block">
							First Name
						</label>
						<div className="flex items-center bg-basic-900 border border-ui-border rounded-lg px-3 py-2 focus-within:border-secondary-500 transition">
							<User className="w-4 h-4 text-basic-300 mr-2" />
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
						<label className="text-sm text-basic-300 mb-1 block">
							Last Name
						</label>
						<div className="flex items-center bg-basic-900 border border-ui-border rounded-lg px-3 py-2 focus-within:border-secondary-500 transition">
							<User className="w-4 h-4 text-basic-300 mr-2" />
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
					<label className="text-sm text-basic-300 mb-1 block">
						Email
					</label>{" "}
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

				{/* Phone */}
				<div className="mb-4">
					<label className="text-sm text-basic-300 mb-1 block">
						Phone Number
					</label>
					<div className="flex items-center bg-basic-900 border border-ui-border rounded-lg px-3 py-2 focus-within:border-secondary-500 transition">
						<Phone className="w-4 h-4 text-basic-300 mr-2" />
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
					<label className="text-sm text-basic-300 mb-1 block">
						Address
					</label>
					<div className="flex items-center bg-basic-900 border border-ui-border rounded-lg px-3 py-2 focus-within:border-secondary-500 transition">
						<MapPin className="w-4 h-4 text-basic-300 mr-2" />
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

				{/* Confirm Password */}
				<div className="mb-6">
					<label className="text-sm text-basic-300 mb-1 block">
						Confirm Password
					</label>
					<div className="flex items-center bg-basic-900 border border-ui-border rounded-lg px-3 py-2 focus-within:border-secondary-500 transition">
						<Lock className="w-4 h-4 text-basic-300 mr-2" />
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
					className="w-full bg-secondary-500 hover:bg-secondary-600 transition py-3 rounded-lg font-semibold shadow-lg shadow-secondary-500/30"
					onClick={handleSubmit}
				>
					Create Account
				</button>

				<div className="flex items-center gap-3 my-6">
					<div className="flex-1 h-px bg-ui-border" />
					<span className="text-xs text-basic-400">OR</span>
					<div className="flex-1 h-px bg-ui-border" />
				</div>

				<div className="flex gap-3">
					<button className="flex-1 border border-ui-border py-2 rounded-lg hover:bg-ui-border/40 transition text-sm">
						Google
					</button>
					<button className="flex-1 border border-ui-border py-2 rounded-lg hover:bg-ui-border/40 transition text-sm">
						GitHub
					</button>
				</div>

				<p className="text-center text-sm text-basic-300 mt-6">
					Already have an account?{" "}
					<span className="text-secondary-500 cursor-pointer hover:underline">
						Login
					</span>
				</p>
			</div>
		</div>
	);
}
