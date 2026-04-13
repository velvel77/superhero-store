import CartList from "@/components/ui/cart-list";
import { getCart } from "./actions";

export default async function CartPage() {
    const cart = await getCart();

    if (cart.length === 0) {
        return <p>Your cart is empty.</p>


    }
    return (

        <div>
            <h1>Your cart</h1>
            <CartList />
        </div>
    )
}