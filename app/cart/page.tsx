import { Undo2 } from 'lucide-react';
import Link from 'next/link';
import CartList from '@/components/ui/cart-list';
import CartTotal from '@/components/ui/cart-total';
import PlaceOrderButton from '@/components/ui/place-order-button';
import ShopFooter from '@/components/ui/shop-footer';
import ShopHeader from '@/components/ui/shop-header';
import ShopNewsLetter from '@/components/ui/shop-newsletter';
import { getCart } from './actions';

export default async function CartPage() {
  const cart = await getCart();
  return (
    <>
      <div className="diagonal-stripes pb-20">
        <ShopHeader />
        <main className="max-w-260 mx-auto gap-10 *:border-2 *:border-ui-border bg-basic-900 *:rounded ">
          {/* Shameless ad */}
          <section className="h-42 grid my-4 place-items-center bg-primary-100">
            <span className="text-secondary-600 text-2xl tracking-tight font-black italic">
              Shameless ad coming soon!
            </span>
          </section>

          {/* Product window */}
          <section className="flex flex-col">
            <h1 className="text-[2rem] py-2 font-black font-basic-100 text-center w-full">Shopping cart</h1>
            {cart.length === 0 ? (
              <div className="flex flex-col gap-2 text-center">
                <p className="text-secondary-500 tracking-tight font-black italic pb-2 pt-4 my-auto">
                  Your cart is empty.
                </p>
                <Link
                  href="/shop"
                  className="group inline-flex h-14 shrink-0 items-center justify-center gap-3 border border-ui-border bg-secondary-500 text-basic-100 no-underline"
                >
                  <Undo2 className="size-6 shrink-0 transition-transform duration-150 group-hover:translate-x-1" />
                  <span className="whitespace-nowrap text-base font-bold uppercase italic leading-none mr-4">
                    Go back
                  </span>
                </Link>
              </div>
            ) : (
              <>
                <CartList />
                <CartTotal />
                <PlaceOrderButton />
              </>
            )}
          </section>

          {/* <section className="col-start-7 mt-4 col-end-9 row-start-2 row-end-3 flex flex-col justify-between py-3 pl-5 space-y-2">
            <div className="relative">
              <div className="absolute h-7 w-1 bg-secondary-500" />
              <h2 className="pl-4 text-basic-100 font-bold uppercase italic">Recommended gear</h2>
            </div>
            <hr className="w-[90%] border-t border-ui-border-strong my-4" />
            <span className="text-secondary-200 mb-3 whitespace-nowrap text-base font-bold uppercase italic leading-none mr-4">
              Coming soon!
            </span>
          </section> */}
        </main>
      </div>
      <ShopNewsLetter />
      <ShopFooter />
    </>
  );
}
