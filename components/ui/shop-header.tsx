import { Heart, Search, Zap, User, ShoppingBag, Menu } from 'lucide-react';
import Link from 'next/link';
import CartCount from './cart-count';

export default function ShopHeader() {
	return (
		<>
			<header className="sticky top-0 z-50 w-full bg-basic-700 benday-dots text-basic-300 flex justify-center border-b-2 border-ui-border">
				<div className="flex justify-between p-4 w-full max-w-260 items-center">
					<section className="flex items-center gap-1">
						<Zap className="size-6 text-basic-100 bg-secondary-500 p-1 rounded-sm border border-ui-border " />
						<h1 className="text-basic-100 font-bold uppercase italic">
							Hero Vault
						</h1>
					</section>

					{/* NAVIGATION */}
					<nav>
						<ul className="gap-2 uppercase text-xs p-2 font-bold hidden lg:flex">
							<li>
								<Link
									className="text-secondary-500 link-hover"
									href={"/"}
								>
									All Gear
								</Link>
							</li>
							<li>
								<Link className="link-hover" href={"/"}>
									Suits
								</Link>
							</li>
							<li>
								<Link className="link-hover" href={"/"}>
									Weapons
								</Link>
							</li>
							<li>
								<Link className="link-hover" href={"/"}>
									Masks
								</Link>
							</li>
							<li>
								<Link className="link-hover" href={"/"}>
									Capes
								</Link>
							</li>
							<li>
								<Link className="link-hover" href={"/"}>
									Boots
								</Link>
							</li>
							<li>
								<Link className="link-hover" href={"/"}>
									Tech
								</Link>
							</li>
						</ul>
					</nav>

					<div className="flex items-center">
						{/* SEARCH */}
						<section className="relative flex items-center">
							<Search className="absolute size-4 ml-2" />
							<input
								type="search"
								placeholder="Search heroic gear..."
								className="text-sm focus:border-secondary-500 outline-none focus:shadow-[0_0_8px_var(--color-secondary-500)] border border-transparent pl-8 p-2 bg-basic-600 rounded-sm"
							/>
						</section>

						{/* ICONS */}
						<section className="flex gap-2 pl-2">
							<Heart className="size-4 icon-hover" />
							<div className="relative">
								<ShoppingBag className="size-4 icon-hover" />
								<CartCount />
							</div>
							<User className="size-4 icon-hover" />
							<Menu className="size-4 icon-hover lg:hidden" />
						</section>
					</div>
				</div>
			</header>
		</>
	);
}
