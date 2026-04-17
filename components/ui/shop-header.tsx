import { Heart, Menu, Search, ShoppingBag, User, Zap } from "lucide-react";
import Link from "next/link";
import CartCount from "./cart-count";

export default function ShopHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-basic-700 benday-dots text-basic-300 flex justify-center border-b-2 border-ui-border">
      <div className="flex justify-between p-4 w-full max-w-260 items-center">
        <Link href="/" className="flex items-center gap-1">
          <Zap className="size-6 rounded-sm border border-ui-border bg-secondary-500 p-1 text-basic-100" />
          <h2 className="font-bold uppercase italic text-basic-100">
            Hero Vault
          </h2>
        </Link>

        {/* NAVIGATION */}
        <nav>
          <ul className="gap-2 uppercase text-xs p-2 font-bold hidden lg:flex">
            <li>
              <Link
                className="text-secondary-500 link-hover"
                href={"/products"}
              >
                All Gear
              </Link>
            </li>
            <li>
              <Link className="link-hover" href={"/products"}>
                Suits
              </Link>
            </li>
            <li>
              <Link className="link-hover" href={"/products"}>
                Weapons
              </Link>
            </li>
            <li>
              <Link className="link-hover" href={"/products"}>
                Masks
              </Link>
            </li>
            <li>
              <Link className="link-hover" href={"/products"}>
                Capes
              </Link>
            </li>
            <li>
              <Link className="link-hover" href={"/products"}>
                Boots
              </Link>
            </li>
            <li>
              <Link className="link-hover" href={"/products"}>
                Tech
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center">
          {/* SEARCH */}
          <section className="relative flex items-center">
            <Search className="absolute size-4 ml-2" />
            <label htmlFor="header-searchbar" className="sr-only">
              Search for heroes or gear
            </label>
            <input
              id="header-searchbar"
              type="search"
              placeholder="Search heroic gear..."
              className="text-sm focus:border-secondary-500 outline-none focus:shadow-[0_0_8px_var(--color-secondary-500)] border border-transparent pl-8 p-2 bg-basic-600 rounded-sm"
            />
          </section>

					{/* ICONS */}
					<section className="flex gap-2 pl-2">
						<Link href="/">
							<Heart className="size-4 icon-hover" />
						</Link>
						<Link href="/cart">
							<div className="relative">
								<ShoppingBag className="size-4 icon-hover" />
								<CartCount />
							</div>
						</Link>
						<Link href="/register">
							<User className="size-4 icon-hover" />
						</Link>

            <Menu className="size-4 icon-hover lg:hidden" />
          </section>
        </div>
      </div>
    </header>
  );
}
