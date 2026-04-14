"use client";

import { placeOrder } from "@/app/cart/actions";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function PlaceOrderButton(){
    const {items, clearCart} = useCart();
    const router = useRouter();

    async function handleOrder(){
        const result = await placeOrder();
        if(result.success){
            clearCart();
            router.push(`/order-confirmation?orderId=${result.orderId}`);
        } else {
            console.error(result.error);
        }
    }
    return(
        <button onClick={handleOrder} disabled={items.length === 0}>Place your order</button>
    )
}