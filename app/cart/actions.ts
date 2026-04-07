"use server";

import { cookies } from "next/headers";

export type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;

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

export async function addToCart(item: CartItem): Promise<void>{
    try{
        const storedCookie = await cookies();
        const cart = await getCart();
        const inCart = cart.find(i => i.id === item.id);

        if(inCart){
            inCart.quantity += 1;
        } else {cart.push({...item, quantity: 1});
    }
    storedCookie.set("cart", JSON.stringify(cart));
    } catch (error) {
        console.error("Failed add to cart:", error)
    }
}