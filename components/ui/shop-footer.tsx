import { Zap } from 'lucide-react';
import Link from 'next/link';

export default function ShopFooter() {
  return (
    <footer className="p-4 bg-(--color-effect-blue) benday-dots">
      <div className="flex pb-8 mx-auto max-w-260">
        <div>
          <div className="flex gap-1 py-2 text-white">
            <Zap className="bg-(--color-effect-red) border-2 rounded-xs p-1 size-6 border-white" />
            <h2 className="uppercase font-bold italic">Hero Vault</h2>
          </div>
          <p className="text-[.6rem] max-w-[30ch] text-(--color-text-muted)">
            Premium heroic equipment for the modern legend. Trusted by 12,000+ heroes worldwide.
          </p>
        </div>
        <nav className="flex uppercase justify-evenly w-full text-[.6rem] text-(--color-text-muted) ">
          <ul className="flex flex-col gap-2 [&>li]:hover:icon-hover">
            <h3 className="text-white font-bold italic pb-2">Shop</h3>
            <li>
              <Link href="/">All Gear</Link>
            </li>
            <li>
              <Link href="/">Suits</Link>
            </li>
            <li>
              <Link href="/">Weapons</Link>
            </li>
            <li>
              <Link href="/">Masks</Link>
            </li>
            <li>
              <Link href="/">Tech</Link>
            </li>
          </ul>
          <ul className="flex flex-col gap-2 [&>li]:hover:icon-hover">
            <h3 className="text-white font-bold italic pb-2">Support</h3>
            <li>
              <Link href="/">Hq help center</Link>
            </li>
            <li>
              <Link href="/">Shipping</Link>
            </li>
            <li>
              <Link href="/">Returns</Link>
            </li>
            <li>
              <Link href="/">Size guide</Link>
            </li>
          </ul>
          <ul className="flex flex-col gap-2 [&>li]:hover:icon-hover">
            <h3 className="text-white font-bold italic pb-2">Company</h3>
            <li>
              <Link href="/">About</Link>
            </li>
            <li>
              <Link href="/">Careers</Link>
            </li>
            <li>
              <Link href="/">Press</Link>
            </li>
            <li>
              <Link href="/">Affiliates</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="py-4 text-(--color-text-muted) uppercase text-[.6rem] flex justify-between max-w-260 mx-auto border-t border-(--color-text-muted)">
        <span>© 2026 Hero Vault — Gear Division</span>
        <span>Plate 001 / Kinetic Voltage Series</span>
      </div>
    </footer>
  );
}
