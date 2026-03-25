import { Heart, Search, Zap, User, ShoppingBag, Menu } from 'lucide-react';
import Link from 'next/link';

export default function ShopHeader() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-(--color-effect-blue) benday-dots text-(--color-text-muted) flex justify-center border-b-2 border-white">
        <div className="flex justify-between p-4 w-full max-w-260 items-center">
          <section className="flex items-center gap-1">
            <Zap className="size-6 text-white bg-(--color-effect-red) p-1 rounded-sm border border-white " />
            <h1 className="text-white font-bold italic">Hero Vault</h1>
          </section>

          {/* NAVIGATION */}
          <nav>
            <ul className="gap-2 uppercase text-xs p-2 font-bold hidden lg:flex">
              <li>
                <Link className="text-(--color-effect-red) link-hover" href={'/'}>
                  All Gear
                </Link>
              </li>
              <li>
                <Link className="link-hover" href={'/'}>
                  Suits
                </Link>
              </li>
              <li>
                <Link className="link-hover" href={'/'}>
                  Weapons
                </Link>
              </li>
              <li>
                <Link className="link-hover" href={'/'}>
                  Masks
                </Link>
              </li>
              <li>
                <Link className="link-hover" href={'/'}>
                  Capes
                </Link>
              </li>
              <li>
                <Link className="link-hover" href={'/'}>
                  Boots
                </Link>
              </li>
              <li>
                <Link className="link-hover" href={'/'}>
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
                className="text-sm focus:border-(--color-effect-red) outline-none focus:shadow-[0_0_8px_#E62E2E] border border-transparent pl-8 p-2 bg-[#29292c] rounded-sm"
              />
            </section>

            {/* ICONS */}
            <section className="flex gap-2 pl-2">
              <Heart className="size-4 icon-hover" />
              <ShoppingBag className="size-4 icon-hover" />
              <User className="size-4 icon-hover" />
              <Menu className="size-4 icon-hover lg:hidden" />
            </section>
          </div>
        </div>
      </header>
    </>
  );
}
