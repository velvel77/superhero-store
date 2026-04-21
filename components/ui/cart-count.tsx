'use client';
import { useCart } from '@/context/CartContext';

export default function CartCount() {
  const { totalItems } = useCart();
  if (totalItems === 0) {
    return null;
  }

  return (
    <span className="absolute -top-2 -right-2 bg-secondary-500 text-white text-xs rounded-full size-4 flex items-center justify-center">
      {totalItems}
    </span>
  );
}
