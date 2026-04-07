"use client";

import { addToCart, CartItem } from "@/app/cart/actions";

interface ButtonProps {
    id: string;
    name: string;
    price: number;
}

export default function AddToCartButton({ item }: { item: CartItem }) {
    return (
        <button onClick={() => addToCart(item)}> Add to cart</button>
    )
}