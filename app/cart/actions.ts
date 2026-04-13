"use server";

import { cookies } from "next/headers";

export type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    type: "product" | "superhero";
    image_url?: string | null;

}

export async function getCart(): Promise<CartItem[]> {
    try {
        const storedCookie = await cookies();
        const cart = storedCookie.get("cart");
        if (!cart) {
            return []
        }
        return JSON.parse(cart.value) as CartItem[];
    } catch (error) {
        console.error("Failed to get cart:", error);
        return [];
    }
}

export async function addToCart(item: CartItem): Promise<void> {
    try {
        const storedCookie = await cookies();
        const cart = await getCart();
        const inCart = cart.find(i => i.id === item.id && i.type === item.type);

        if (inCart) {
            inCart.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        storedCookie.set("cart", JSON.stringify(cart));
    } catch (error) {
        console.error("Failed add to cart:", error)
    }
}

export async function removeFromCart(id: number, type: "product" | "superhero"): Promise<void> {
    try {
        const storedCookie = await cookies();
        const cart = await getCart();
        const updatedList = cart.filter(i => !(i.id === id && i.type === type));
        storedCookie.set("cart", JSON.stringify(updatedList));
    } catch (error) {
        console.error("Failed to remove from cart:", error)
    }
}

export async function decrease(id: number, type: "product" | "superhero"): Promise<void> {
    try {
        const storedCookie = await cookies();
        const cart = await getCart();
        const item = cart.find(i => i.id === id && i.type === type);
        if (!item) return;
        if (item.quantity === 1) {
            const updated = cart.filter(i => !(i.id === id && i.type === type));
            storedCookie.set("cart", JSON.stringify(updated));
        } else {
            item.quantity -= 1;
            storedCookie.set("cart", JSON.stringify(cart));
        }
    } catch (error) {
        console.error("Failed to decrease quantity:", error);
    }
}

export async function decreaseQuantityAction(id: number, type: "product" | "superhero"): Promise<void> {
    try {
        const storedCookie = await cookies();
        const cart = await getCart();
        const item = cart.find(i => i.id === id && i.type === type);
        if (!item) return;
        if (item.quantity === 1) {
            const updated = cart.filter(i => !(i.id === id && i.type === type));
            storedCookie.set("cart", JSON.stringify(updated));
        } else {
            item.quantity -= 1;
            storedCookie.set("cart", JSON.stringify(cart));
        }
    } catch (error) {
        console.error("Failed to decrease quantity:", error);
    }
}