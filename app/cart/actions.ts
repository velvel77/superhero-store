"use server";

import { cookies } from "next/headers";

const apiUrl = process.env.API_URL;

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
        if (!cart || !cart.value) {
            return [];
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

export async function placeOrder(): Promise<{ success: boolean; orderId?: number; error?: string }> {
    try {
        const cart = await getCart();

        if (cart.length === 0) {
            return { success: false, error: "Cart is empty" };
        }
        const products = cart.filter(i => i.type === "product").map(i => ({
            id: i.id,
            quantity: i.quantity,
        }));

        const heroes = cart.filter(i => i.type === "superhero").map(i => ({
            id: i.id,
        }));

        const response = await fetch(`${apiUrl}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: 1,
                products, heroes,
            }),
        });

        if (!response.ok) {

            const errorBody = await response.text();
            console.error("Order failed:", response.status, errorBody);
            return { success: false, error: "Failed to place order (actions.ts)" };

        }
        const data = await response.json();
        console.log("order response", data)
        if (!data.orderId) {
            return { success: false, error: "No order ID returned from server" };
        }

        const storedCookie = await cookies();
        storedCookie.delete("cart");

        return (
            { success: true, orderId: data.orderId }
        );
    } catch (error) {
        console.error("Failed to place order:", error);
        return { success: false, error: "Something went wrong" }
    }
}