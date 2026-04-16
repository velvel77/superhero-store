import { Undo2, Zap } from "lucide-react";
import Link from "next/link";
import CartList from "@/components/ui/cart-list";
import PlaceOrderButton from "@/components/ui/place-order-button";
import ShopFooter from "@/components/ui/shop-footer";
import ShopHeader from "@/components/ui/shop-header";
import ShopNewsLetter from "@/components/ui/shop-newsletter";
import { getCart } from "./actions";

export default async function CartPage() {
  const cart = await getCart();
  return (
    <>
      <ShopHeader />
      <main className="grid grid-cols-9 grid-rows-7 m-10 gap-10 *:border-2 *:border-red-500">
        <section className="col-start-4 col-end-7 row-start-1 row-end-2 grid place-items-center bg-primary-100">
          <span className="text-secondary-600 text-2xl tracking-tight font-black italic">
            Shameless ad coming soon!
          </span>
        </section>

        <section className="col-start-1 col-end-5 row-start-2 row-end-5 flex flex-col items-start py-3 pl-5 space-y-2">
          <h1 className="text-[28px] font-black font-basic-100 uppercase italic tracking-tight">
            Your cart
          </h1>
          <hr className="w-[90%] border-t border-ui-border-strong my-4" />
          {cart.length === 0 ? (
            <div className="flex flex-col gap-2 py-5">
              <p className="text-secondary-500 tracking-tight font-black italic my-auto">
                Your cart is empty.
              </p>
              <Link
                href="/shop"
                className="group inline-flex h-14 shrink-0 items-center justify-center gap-3 border-2 border-ui-border bg-secondary-500 px-4 text-basic-100 no-underline"
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
              <PlaceOrderButton />
            </>
          )}
        </section>
      </main>
      <ShopNewsLetter />
      <ShopFooter />
    </>
  );
}
