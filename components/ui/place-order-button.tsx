'use client';

import { useRouter } from 'next/navigation';
import { placeOrder } from '@/app/cart/actions';
import { useCart } from '@/context/CartContext';

export default function PlaceOrderButton() {
  const { items, clearCart } = useCart();
  const router = useRouter();

  async function handleOrder() {
    const result = await placeOrder();
    if (result.success) {
      clearCart();
      router.push(`/order-confirmation?orderId=${result.orderId}`);
    } else {
      console.error(result.error);
    }
  }
  return (
    <button
      className="transition-all duration-200 font-bold bg-secondary-500 hover:bg-basic-100 hover:text-secondary-500 hover:border-secondary-500 text-basic-100 border border-basic-100 m-4 px-4 py-2 mx-auto"
      type="button"
      onClick={handleOrder}
      disabled={items.length === 0}
    >
      Proceed to checkout
    </button>
  );
}
