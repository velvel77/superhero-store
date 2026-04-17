import { getCart } from "@/app/cart/actions";
import { CartProvider } from "@/context/CartContext";

export default async function CartProviderWrapper({ children }: { children: React.ReactNode }) {
    const initialCart = await getCart();
    // console.log("initialCart:", initialCart);

    return (
        <CartProvider initialCart={initialCart}>
            {children}
        </CartProvider>
    )
}