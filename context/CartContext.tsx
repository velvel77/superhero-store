"use client";
import { addToCart, CartItem } from "@/app/cart/actions";
import { Product } from "@/types";
import { createContext, useContext, useState } from "react";



export interface CartContextType {
    items: CartItem[];
    addItem: (product: Product) => Promise<void>;
    // removeItem: (productId: string) => void;
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

    async function addItem(product: Product) {
        const item: CartItem = {
            id: product.id.toString(),
            name: product.name,
            price: product.price,
            quantity: 1,
        };
        try {
            await addToCart(item);
            setItems(prev => {
                const inCart = prev.find(i => i.id === item.id);
                if (inCart) {
                    return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
                }
                return [...prev, { ...item, quantity: 1 }];
            });
        } catch (error) {
            console.error("Failed to add item:", error)
        }
    }



    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    return (
        <CartContext.Provider value={{ items, addItem, totalItems }}>
            {children}
        </CartContext.Provider>
    )

}