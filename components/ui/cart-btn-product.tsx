"use client";

import { addToCart, CartItem } from "@/app/cart/actions";
import { useCart } from "@/context/CartContext";

// interface ButtonProps {
//     id: string;
//     name: string;
//     price: number;
// }

export default function CartButtonProduct({ item }: { item: CartItem }) {
    const { items, addItem, removeItem } = useCart();
    const inCart = items.some(i => i.id === item.id && i.type === "product");
    return inCart ? (
        <button onClick={() => removeItem(item.id)}>Remove</button>
    ) : (
        <button onClick={() => addItem(item)}>Add to cart</button>
    )
}