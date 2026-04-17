"use client";

import ShopHeader from "@/components/ui/shop-header";
import ShopFooter from "@/components/ui/shop-footer";

import type { ProductDetails, RelatedProduct } from "@/lib/queries/products";
import Image from "next/image";
import Link from "next/link";
import placeholder from "@/public/superhero.jpg";
import {
	Award,
	Truck,
	RotateCcw,
	Heart,
	PlusIcon,
	MinusIcon,
	Shield,
	Zap,
} from "lucide-react";
import { useState } from "react";

type Props = {
	product: ProductDetails;
	relatedProducts: RelatedProduct[];
};

const CART_KEY = "hero-vault-cart";

export default function ShopProduct({ product, relatedProducts }: Props) {
	const [amount, setAmount] = useState(1);
	const [favorite, setFavorite] = useState(false);
	const [added, setAdded] = useState(false);

	const power = Number(product.stats.POWER ?? 0);
	const durability = Number(product.stats.DURABILITY ?? 0);
	const special = Number(product.stats.SPECIAL ?? 0);

	function addToCart() {
		if (typeof window === "undefined") return;

		const raw = localStorage.getItem(CART_KEY);
		const cart = raw ? JSON.parse(raw) : [];

		const existingIndex = cart.findIndex(
			(item: { id: number; type: string }) =>
				item.id === product.id && item.type === "product",
		);

		if (existingIndex >= 0) {
			cart[existingIndex].quantity += amount;
		} else {
			cart.push({
				id: product.id,
				type: "product",
				name: product.name,
				price: product.price,
				image_url: product.image_url,
				quantity: amount,
			});
		}

		localStorage.setItem(CART_KEY, JSON.stringify(cart));
		setAdded(true);

		setTimeout(() => {
			setAdded(false);
		}, 1800);
	}

	return (
		<div>
			<ShopHeader />

			<div className="max-w-260 mx-auto px-4">
				<Link className="uppercase text-[.5rem]" href={"/shop"}>
					{`< Back to catalog`}
				</Link>

				<div className="flex flex-col">
					<main className="flex my-4 gap-4">
						{/* Left panel */}
						<div className="relative flex-1">
							<div className="relative overflow-clip h-full min-h-125">
								<div className="benday-dots absolute z-10 inset-0"></div>
								<Image
									className="w-full object-cover border-2 border-basic-400/20 rounded-sm"
									src={
										product.image_url
											? product.image_url
											: placeholder
									}
									alt={product.name}
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								/>
							</div>

							<span
								className={`absolute top-2 right-2 px-2 rounded-sm ${
									product.stock > 0
										? "text-rarity-uncommon bg-black"
										: "text-basic-100 bg-secondary-500"
								}`}
							>
								{product.stock > 0
									? "In stock"
									: "Out of stock"}
							</span>
						</div>

						{/* Right panel */}
						<section className="flex-1">
							<div>
								<h2 className="text-shadow-md text-shadow-secondary-500 italic font-bold text-3xl">
									{product.name}
								</h2>

								<div className="py-4 mb-4 border-b border-basic-400/20">
									<span className="text-primary-500 text-2xl">
										${product.price}
									</span>{" "}
									<span className="text-[.5rem]">
										{" "}
										/ item
									</span>
									<div className="flex gap-4 py-4">
										<span
											className={`p-2 rounded-sm text-shadow-black text-2xl px-4 ${
												product.rarity === "LEGENDARY"
													? "bg-rarity-legendary"
													: product.rarity === "EPIC"
														? "bg-rarity-epic"
														: product.rarity ===
															  "RARE"
															? "bg-rarity-rare"
															: "bg-rarity-uncommon"
											}`}
										>
											{product.rarity}
										</span>

										<div className="flex flex-col">
											<span className="text-sm text-basic-400">
												Item rarity
											</span>
											<span>
												{product.rarity === "LEGENDARY"
													? "Legendary"
													: product.rarity === "EPIC"
														? "Epic"
														: product.rarity ===
															  "RARE"
															? "Rare"
															: "Common"}
											</span>
										</div>
									</div>
								</div>
							</div>

							<div>
								<p className="text-[.8rem] text-basic-400">
									{product.description ||
										"No description available."}
								</p>

								{/* Product details */}
								<section className="p-4 bg-pattern-benday my-4 rounded-sm border border-basic-400">
									<div className="flex items-center gap-2 pb-2">
										<Zap className="size-4 text-primary-500" />
										<span className="italic font-bold uppercase text-xs">
											Gear details
										</span>
									</div>

									<div className="flex flex-col gap-1 text-sm">
										<span>
											Categories:{" "}
											{product.categories.length
												? product.categories.join(", ")
												: "Misc"}
										</span>
										<span>Stock: {product.stock}</span>
										<span>Rarity: {product.rarity}</span>
									</div>
								</section>

								{/* Power rating */}
								<div className="flex flex-col text-sm rounded-sm border border-basic-400 bg-effect-blue p-2 benday-dots">
									<h3 className="flex items-center gap-2 mb-2">
										<span>
											<Shield className="size-4 text-secondary-500" />
										</span>
										<span className="italic uppercase font-bold text-[.7rem]">
											Power Raiting
										</span>
									</h3>

									<span>Power</span>
									<input
										readOnly
										className="accent-secondary-500"
										type="range"
										min={0}
										max={10}
										value={power}
									/>

									<span>Durability</span>
									<input
										readOnly
										className="accent-primary-500"
										type="range"
										min={0}
										max={10}
										value={durability}
									/>

									<span>Special</span>
									<input
										readOnly
										className="accent-rarity-epic"
										type="range"
										min={0}
										max={10}
										value={special}
									/>
								</div>

								{/* Purchase buttons */}
								<div className="flex py-4 gap-4">
									<div className="flex flex-1 rounded-sm border-2 border-basic-400 bg-effect-dark text-basic-400">
										<button
											className="h-full w-10 flex justify-center group"
											onClick={() =>
												amount === 1
													? 1
													: setAmount(amount - 1)
											}
										>
											<MinusIcon className="self-center size-5 group-hover:text-basic-100" />
										</button>

										<div className="w-10 self-center text-basic-100 text-center">
											{amount}
										</div>

										<button
											className="h-full w-10 flex justify-center group"
											onClick={() =>
												setAmount(amount + 1)
											}
										>
											<PlusIcon className="self-center size-5 group-hover:text-basic-100" />
										</button>
									</div>

									<button
										onClick={addToCart}
										className="bg-secondary-500 p-4 flex-2 border-2 border-basic-100 rounded-sm"
									>
										Add to cart
									</button>

									<button
										onClick={() => setFavorite(!favorite)}
										className={`size-16 border-2 hover:border-secondary-500 bg-effect-dark ${
											favorite
												? "border-effect-red text-secondary-500"
												: "border-basic-400 text-basic-400"
										} rounded-sm group flex items-center justify-center`}
									>
										<Heart
											className={`group-hover:text-secondary-500 ${
												favorite
													? "fill-secondary-500"
													: ""
											}`}
										/>
									</button>
								</div>

								{added ? (
									<p className="text-[.7rem] font-bold uppercase text-rarity-uncommon">
										Added to cart
									</p>
								) : null}
							</div>

							{/* Policy */}
							<section className="flex gap-6 text-[.7rem] *:policy">
								<div>
									<Truck className="text-secondary-500" />
									<div className="flex flex-col">
										<span className="italic font-bold uppercase">
											Free shipping
										</span>
										<span className="text-basic-400">
											Orders over $500
										</span>
									</div>
								</div>

								<div>
									<RotateCcw className="text-secondary-500" />
									<div className="flex flex-col">
										<span className="italic font-bold uppercase">
											30-day returns
										</span>
										<span className="text-basic-400">
											No questions asked
										</span>
									</div>
								</div>

								<div>
									<Award className="text-secondary-500" />
									<div className="flex flex-col">
										<span className="italic font-bold uppercase">
											Certified gear
										</span>
										<span className="text-basic-400">
											Battle-tested
										</span>
									</div>
								</div>
							</section>
						</section>
					</main>

					{/* Related section */}
					<section className="py-16">
						<div className="text-basic-100 relative p-4 grid items-center">
							<div className="absolute h-7 w-1 bg-secondary-500"></div>
							<h2 className="uppercase font-bold italic">
								Related gear
							</h2>
						</div>

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{relatedProducts.map((related) => (
								<Link
									href={`/products/${related.id}`}
									className="relative block"
									key={related.id}
								>
									<div className="relative group">
										<div className="relative aspect-4/5 w-full overflow-hidden border-2 border-basic-400/20 bg-basic-800 group-hover:border-secondary-500">
											<div className="benday-dots absolute inset-0 z-10"></div>

											<Image
												className="object-cover"
												src={
													related.image_url
														? related.image_url
														: placeholder
												}
												alt={related.name}
												fill
												sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
											/>

											<div
												className={`absolute top-2 left-2 z-20 text-[.7rem] border-ui-border border rounded-sm px-2 ${
													related.rarity ===
													"LEGENDARY"
														? "bg-rarity-legendary text-basic-900"
														: related.rarity ===
															  "EPIC"
															? "bg-rarity-epic"
															: related.rarity ===
																  "RARE"
																? "bg-rarity-rare"
																: "bg-rarity-uncommon text-basic-900"
												}`}
											>
												{related.rarity}
											</div>
										</div>
									</div>

									<div className="flex min-h-18 flex-col p-2">
										<span className="text-secondary-500 uppercase text-[.5rem] tracking-wider">
											{related.category}
										</span>
										<span className="italic uppercase font-bold text-[.7rem]">
											{related.name}
										</span>
										<span className="text-primary-500">
											${related.price}
										</span>
									</div>
								</Link>
							))}
						</div>
					</section>
				</div>
			</div>

			<ShopFooter />
		</div>
	);
}
