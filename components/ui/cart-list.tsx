'use client';

import { CircleMinus, CirclePlus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { addToCart, type CartItem, removeFromCart } from '@/app/cart/actions';
import { useCart } from '@/context/CartContext';

export default function CartList() {
  const { items, removeItem, increaseQuantity, decreaseQuantity, totalItems } = useCart();
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
          <Link href="/shop"> in our shop!</Link>
        </span>
      </div>
    );
  }
  return (
    <>
      {items.map((item) => (
        <div
          key={`${item.type}-${item.id}`}
          className="flex flex-col sm:flex-row items-center p-4 w-full overflow-hidden border-t border-ui-border"
        >
          <section className="relative h-48 w-48 overflow-hidden">
            <Image
              src={item.image_url || 'https://placehold.co/300x300/111827/ffffff?text=Item'}
              alt={item.name}
              fill
              className="h-24 w-24 object-cover"
            />
          </section>
          <section className="sm:ml-auto p-2">
            <div className="flex flex-col min-w-64 w-64 sm:items-end items-center space-y-3 sm:text-right">
              <h6 className="text-2xl font-black uppercase">{item.name}</h6>
              <span className="">{item.price * item.quantity} kr</span>
              <div className="inline-flex">
                <button
                  className="hover:text-secondary-500 transition-all duration-200"
                  type="button"
                  onClick={() => decreaseQuantity(item.id, item.type)}
                >
                  <CircleMinus />
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  className="hover:text-secondary-500 transition-all duration-200"
                  type="button"
                  onClick={() => increaseQuantity(item.id, item.type)}
                >
                  <CirclePlus />
                </button>
              </div>
              <button
                className="group transition-all duration-200 hover:text-secondary-500 hover:border-secondary-500 hover:bg-basic-100 inline-flex h-10 shrink-0 items-center justify-center gap-3 border-2 border-ui-border bg-secondary-500 px-4 text-basic-100 no-underline relative z-10"
                type="button"
                onClick={() => removeItem(item.id, item.type)}
              >
                <Trash2 />
                <span>Remove</span>
              </button>
            </div>
          </section>
        </div>
      ))}
    </>
  );
}
