"use client";

import { ShoppingCart, Trash2 } from "lucide-react";
import type { CartItem } from "@/app/cart/actions";
import { useCart } from "@/context/CartContext";

export default function CartButton({ item }: { item: CartItem }) {
  const { items, addItem, removeItem } = useCart();
  const inCart = items.some((i) => i.id === item.id && i.type === "product");
  return inCart ? (
    <button
      type="button"
      className="group inline-flex h-10 shrink-0 items-center justify-center gap-3 border-2 border-ui-border bg-secondary-500 px-4 text-basic-100 no-underline relative z-10"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        removeItem(item.id, item.type);
      }}
    >
      <Trash2 />
      <span className="text-base uppercase italic">Remove</span>
    </button>
  ) : (
    <button
      type="button"
      className="group inline-flex h-10 shrink-0 items-center justify-center gap-3 border-2 border-ui-border bg-secondary-500 px-4 text-basic-100 no-underline relative z-10"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(item);

      }}
    >
      <ShoppingCart />
      <span className="text-base uppercase italic">Add to cart</span>
    </button>
  );
}
