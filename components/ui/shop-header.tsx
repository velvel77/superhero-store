import { Heart, Search, Zap, User, ShoppingBag, Menu } from 'lucide-react';
import Link from 'next/link';

export default function ShopHeader() {
  return (
    <>
      <header className="bg-[#16191d] bg-[radial-gradient(#f5f2eb0f_1px,transparent_1px)] bg-size-[8px_8px] text-gray-500 flex justify-center border-b-2 border-white">
        <div className="flex justify-between p-4 w-full max-w-260 items-center">
          <section className="flex items-center gap-1">
            <Zap className="size-6 text-white bg-red-500 p-1 rounded-sm border border-white " />
            <h1 className="text-white font-bold italic">Hero Vault</h1>
          </section>

          {/* NAVIGATION */}
          <nav>
            {/* Selected link color sould be #E62E2E */}
            <ul className="flex gap-2 uppercase text-xs p-2 font-bold">
              <li>
                <Link className="text-[#E62E2E] hover:text-white transition-all duration-150 ease-in" href={'/'}>
                  All Gear
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-all duration-150 ease-in" href={'/'}>
                  Suits
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-all duration-150 ease-in" href={'/'}>
                  Weapons
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-all duration-150 ease-in" href={'/'}>
                  Masks
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-all duration-150 ease-in" href={'/'}>
                  Capes
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-all duration-150 ease-in" href={'/'}>
                  Boots
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-all duration-150 ease-in" href={'/'}>
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
                className="text-sm focus:border-[#E62E2E] outline-none focus:shadow-[0_0_8px_#E62E2E] border border-transparent pl-8 p-2 bg-[#29292c] rounded-sm"
              />
            </section>

            {/* ICONS */}
            <section className="flex gap-2 pl-2">
              <Heart className="size-4 hover:text-[#E62E2E] hover:cursor-pointer transition-all duration-150 ease-in" />
              <ShoppingBag className="size-4 hover:text-[#E62E2E] hover:cursor-pointer transition-all duration-150 ease-in" />
              <User className="size-4 hover:text-[#E62E2E] hover:cursor-pointer transition-all duration-150 ease-in" />
              <Menu className="size-4 hover:text-[#E62E2E] hover:cursor-pointer transition-all duration-150 ease-in" />
            </section>
          </div>
        </div>
      </header>
    </>
  );
}
