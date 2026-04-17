import { Zap } from 'lucide-react';
import Link from 'next/link';

export default function ShopFooter() {
  return (
    <footer id="footer-section" className="scroll-mt-18 p-4 bg-basic-700 benday-dots">
      <section className="flex pb-8 mx-auto max-w-260">
        <div>
          <div className="flex gap-1 py-2 text-basic-100">
            <Zap className="bg-secondary-500 border rounded-xs p-1 size-6 border-basic-100" />
            <h2 className="uppercase font-bold italic">Hero Vault</h2>
          </div>
          <p className="text-[.7rem] max-w-[30ch] text-basic-300">
            Premium heroic equipment for the modern legend. Trusted by 12,000+ heroes worldwide.
          </p>
        </div>
        <section className="flex uppercase justify-evenly w-full text-[.7rem] text-basic-300 ">
          <nav aria-labelledby="shop-heading">
            <h3 id="shop-heading" className="text-basic-100 font-bold italic pb-2">
              Shop
            </h3>
            <ul className="flex flex-col gap-2 [&>li]:hover:icon-hover">
              <li>
                <Link href="/products">All Gear</Link>
              </li>
              <li>
                <Link href="/products">Suits</Link>
              </li>
              <li>
                <Link href="/products">Weapons</Link>
              </li>
              <li>
                <Link href="/products">Masks</Link>
              </li>
              <li>
                <Link href="/products">Tech</Link>
              </li>
            </ul>
          </nav>
          <nav aria-labelledby="support-heading">
            <h3 id="support-heading" className="text-basic-100 font-bold italic pb-2">
              Support
            </h3>
            <ul className="flex flex-col gap-2 [&>li]:hover:icon-hover">
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
          </nav>
          <nav aria-labelledby="company-heading">
            <h3 id="company-heading" className="text-basic-100 font-bold italic pb-2">
              Company
            </h3>
            <ul className="flex flex-col gap-2 [&>li]:hover:icon-hover">
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
        </section>
      </section>
      <div className="py-4 text-basic-400 uppercase text-[.7rem] flex justify-between max-w-260 mx-auto border-t border-ui-border">
        <span>© 2026 Hero Vault — Gear Division</span>
        <span>Plate 001 / Kinetic Voltage Series</span>
      </div>
      <section className="w-full mt-4 max-w-260 mx-auto">
        <div className="text-basic-100 text-center p-2">Disclaimer</div>
        <p className="text-xs text-basic-400">
          This website is a non-commercial project created for educational and portfolio purposes. All characters,
          images, and written content are generated using artificial intelligence and are intended to be original works.
          Any resemblance to existing characters, trademarks, or intellectual property is coincidental and
          unintentional. This project is not affiliated with, endorsed by, or connected to any companies, brands, or
          rights holders. If you believe any content may infringe upon your rights, please contact us and it will be
          reviewed and removed if necessary.
        </p>
      </section>
    </footer>
  );
}
