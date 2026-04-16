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
      className="flex gap-2 py-1 px-3 bg-secondary-500 relative z-10"
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
      className="flex gap-2 py-1 px-3 bg-secondary-500 relative z-10"
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
