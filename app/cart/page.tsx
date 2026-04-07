import { getCart } from "./actions";

export default async function CartPage() {
    const cart = await getCart();

    if (cart.length === 0) {
        return <p>Your cart is empty.</p>


    }
    return (

        <div>
            <h1>What's in your cart</h1>
            {cart.map(item => (
                <div key={item.id}>
                    <h6>{item.name}</h6>
                    <span>{item.quantity} -</span>
                    <span>{item.price * item.quantity} kr</span>

                    <h6>Total: {cart.reduce((sum, i) => sum + i.price * i.quantity, 0)} kr</h6>
                </div>
            ))}
        </div>
    )
}