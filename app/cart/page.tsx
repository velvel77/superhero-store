import CartList from "@/components/ui/cart-list";
import PlaceOrderButton from "@/components/ui/place-order-button";
import ShopFooter from "@/components/ui/shop-footer";
import ShopHeader from "@/components/ui/shop-header";
import ShopNewsLetter from "@/components/ui/shop-newsletter";
import { getCart } from "./actions";

export default async function CartPage() {
  const cart = await getCart();

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }
  return (
    <>
      <ShopHeader />
      <div>
        <h1>Your cart</h1>
        <CartList />
        <PlaceOrderButton />
      </div>
      <ShopNewsLetter />
      <ShopFooter />
    </>
  );
}
