'use client';

import { useCart } from '@/context/CartContext';

export default function CartTotal() {
  const { items, totalItems } = useCart();

  return (
    <div className="w-full px-20 flex flex-col items-end">
      <hr className="w-full border-t border-ui-border-strong my-4" />
      <span>Total items: {totalItems}</span>
      <span>Total: {items.reduce((sum, i) => sum + i.price * i.quantity, 0)} kr</span>
    </div>
  );
}
