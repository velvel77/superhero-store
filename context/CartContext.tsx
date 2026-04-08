"use client";
import { CartItem } from "@/app/cart/actions";
import { Product } from "@/types";
import { createContext, useContext, useState } from "react";



export interface CartContext {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    clearCart: () => void;
    totalItems: number;
}

const CartContext = createContext<CartContext | null>(null);

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be inside CartProvider")
    }
    return context;
}

export function CartProvider({children}: {children: React.ReactNode}){
    const [items, setItems] = useState<CartItem[]>([]);

    
}