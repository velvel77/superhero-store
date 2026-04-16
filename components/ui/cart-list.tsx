"use client";

import Link from "next/link";
import { addToCart, type CartItem, removeFromCart } from "@/app/cart/actions";
import { useCart } from "@/context/CartContext";

export default function CartList() {
  const { items, removeItem, increaseQuantity, decreaseQuantity, totalItems } =
    useCart();
  async function increase(item: CartItem) {
    await addToCart(item);
  }
  async function decrease(item: CartItem) {
    if (item.quantity === 1) {
      await removeFromCart(item.id, item.type);
    } else {
      await addToCart({ ...item, quantity: -1 });
    }
  }

  if (items.length === 0) {
    return (
      <div>
        <h3>Your cart is empty.</h3>
        <span>
          Find what you need
          <Link href="http://localhost:3000/shop/"> in our shop!</Link>
        </span>
      </div>
    );
  }
  return (
    <div>
      <span>Total items:{totalItems}</span>

      {items.map((item) => (
        <div key={`${item.type}-${item.id}`}>
          <h6>
            {item.name} <span>{item.price * item.quantity}</span>
          </h6>
          <div>
            <button type="button" onClick={() => decreaseQuantity(item.id, item.type)}>
              Minus
            </button>
            <span>{item.quantity}</span>
            <button type="button" onClick={() => increaseQuantity(item.id, item.type)}>
              Add
            </button>
          </div>
          <button type="button" onClick={() => removeItem(item.id, item.type)}>Remove</button>
        </div>
      ))}
      <span>
        Total: {items.reduce((sum, i) => sum + i.price * i.quantity, 0)} kr
      </span>
    </div>
  );
}
