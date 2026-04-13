"use client";
import { addToCart, CartItem, decreaseQuantityAction, removeFromCart } from "@/app/cart/actions";
import { createContext, useContext, useState } from "react";



export interface CartContextType {
    items: CartItem[];
    addItem: (item: CartItem) => Promise<void>;
    removeItem: (id: number, type: "product" | "superhero") => void;
    increaseQuantity: (id: number, type: "product" | "superhero") => Promise<void>;
    decreaseQuantity: (id: number, type: "product" | "superhero") => Promise<void>;
    // clearCart: () => void;
    totalItems: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be inside CartProvider")
    }
    return context;
}

export function CartProvider({ children, initialCart }: { children: React.ReactNode, initialCart: CartItem[] }) {
    const [items, setItems] = useState<CartItem[]>(initialCart);

    async function addItem(item: CartItem) {

        try {
            await addToCart(item);
            setItems(prev => {
                const inCart = prev.find(i => i.id === item.id && i.type === item.type);
                if (inCart) {
                    return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
                }
                return [...prev, { ...item, quantity: 1 }];
            });
        } catch (error) {
            console.error("Failed to add item:", error)
        }
    }

    async function removeItem(id: number, type: "product" | "superhero") {
        try {
            await removeFromCart(id, type);
            setItems(prev => prev.filter(i => !(i.id === id && i.type === type)));
        } catch (error) {
            console.error("Failed to remove item:", error)
        }
    }

    async function increaseQuantity(id: number, type: "product" | "superhero") {
        try {
            const item = items.find(i => i.id === id && i.type === type);
            if (!item) return;
            await addToCart(item);
            setItems(prev => prev.map(i =>
                i.id === id && i.type === type
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
            ));
        } catch (error) {
            console.error("Failed to increase quantity:", error);
        }
    }


    async function decreaseQuantity(id: number, type: "product" | "superhero") {
        try {
            const item = items.find(i => i.id === id && i.type === type);
            if (!item) return;
            if (item.quantity === 1) {
                await removeFromCart(id, type);
                setItems(prev => prev.filter(i => !(i.id === id && i.type === type)));
            } else {
                await decreaseQuantityAction(id, type);
                setItems(prev => prev.map(i =>
                    i.id === id && i.type === type
                        ? { ...i, quantity: i.quantity - 1 }
                        : i
                ));
            }
        } catch (error) {
            console.error("Failed to decrease quantity:", error);
        }
    }

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    return (
        <CartContext.Provider value={{ items, addItem, removeItem, decreaseQuantity, increaseQuantity, totalItems }}>
            {children}
        </CartContext.Provider>
    )

}