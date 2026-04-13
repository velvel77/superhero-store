"use client";
import { addToCart, CartItem, removeFromCart } from "@/app/cart/actions";
import { createContext, useContext, useState } from "react";



export interface CartContextType {
    items: CartItem[];
    addItem: (item: CartItem) => Promise<void>;
    removeItem: (id: number) => void;
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

    async function removeItem(id: number) {
        try {
            await removeFromCart(id);
            setItems(prev => prev.filter(i => i.id !== id));
        } catch (error) {
            console.error("Failed to remove item:", error)
        }
    }



    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    return (
        <CartContext.Provider value={{ items, addItem, removeItem, totalItems }}>
            {children}
        </CartContext.Provider>
    )

}