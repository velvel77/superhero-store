"use client";

import { CircleMinus, CirclePlus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { addToCart, type CartItem, removeFromCart } from "@/app/cart/actions";
import { useCart } from "@/context/CartContext";

export default function CartList() {
  const { items, removeItem, increaseQuantity, decreaseQuantity, totalItems } =
    useCart();
  async function increase(item: CartItem) {
    await addToCart(item);
  }
  async function decrease(item: CartItem) {
    if (item.quantity === 1) {
      await removeFromCart(item.id, item.type);
    } else {
      await addToCart({ ...item, quantity: -1 });
    }
  }

  if (items.length === 0) {
    return (
      <div>
        <h3>Your cart is empty.</h3>
        <span>
          Find what you need
          <Link href="/shop"> in our shop!</Link>
        </span>
      </div>
    );
  }
  return (
    <>
      {items.map((item) => (
        <div
          key={`${item.type}-${item.id}`}
          className="w-[92%] grid grid-cols-2 p-5 overflow-hidden"
        >
          <section className="relative h-48 w-48 overflow-hidden">
            <Image
              src={
                item.image_url ||
                "https://placehold.co/300x300/111827/ffffff?text=Item"
              }
              alt={item.name}
              fill
              className="h-24 w-24 object-cover"
              sizes="182px"
            />
          </section>
          <section className="ml-auto">
            <div className="flex flex-col min-w-64 w-64 items-end space-y-3 text-right">
              <h6 className="text-2xl font-black uppercase tracking-tight">
                {item.name}
              </h6>
              <span className="">{item.price * item.quantity} kr</span>
              <div className="inline-flex">
                <button
                  type="button"
                  onClick={() => decreaseQuantity(item.id, item.type)}
                >
                  <CircleMinus />
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => increaseQuantity(item.id, item.type)}
                >
                  <CirclePlus />
                </button>
              </div>
              <button
                className="group inline-flex h-10 shrink-0 items-center justify-center gap-3 border-2 border-ui-border bg-secondary-500 px-4 text-basic-100 no-underline relative z-10"
                type="button"
                onClick={() => removeItem(item.id, item.type)}
              >
                <Trash2 />
                Remove
              </button>
            </div>
          </section>
        </div>
      ))}
    </>
  );
}
