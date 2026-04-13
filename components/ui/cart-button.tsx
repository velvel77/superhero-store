"use client";

import { CartItem } from "@/app/cart/actions";
import { useCart } from "@/context/CartContext";

export default function CartButton({ item }: { item: CartItem }) {
    const { items, addItem, removeItem } = useCart();
    const inCart = items.some(i => i.id === item.id && i.type === "product");
    return inCart ? (
        <button onClick={() => removeItem(item.id, item.type)}>Remove</button>
    ) : (
        <button onClick={() => addItem(item)}>Add to cart</button>
    )
}