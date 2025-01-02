import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Product } from "../types";
import * as crypto from "expo-crypto";

type CartType = {
  items: CartItem[];
  additems: (product: Product, size: CartItem["size"]) => void;
  updateQuantaty: (itemid: String, amount: -1 | 1) => void;
  total: number;
};

export const CartContext = createContext<CartType>({
  items: [],
  additems: () => {},
  updateQuantaty: () => {},
  total: 0,
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setitems] = useState<CartItem[]>([]);

  const additems = (product: Product, size: CartItem["size"]) => {
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );
    if (existingItem) {
      updateQuantaty(existingItem.id, 1);
      return;
    }
    const newCartItems: CartItem = {
      id: crypto.randomUUID(),
      product_id: product.id,
      product,
      size,
      quantity: 1,
    };
    setitems([newCartItems, ...items]);
    console.log(items);
  };
  const updateQuantaty = (itemid: String, amount: -1 | 1) => {
    console.log(itemid, amount);
    // const updateitems = items.map((item) =>
    //   item.id != itemid
    //     ? item
    //     : {
    //         ...item,
    //         quantity: item.quantity + amount,
    //       }
    // );

    setitems(
      items
        .map((item) =>
          item.id !== itemid
            ? item
            : { ...item, quantity: item.quantity + amount }
        )
        .filter((item) => item.quantity > 0)
    );
  };
  const total = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );
  return (
    <CartContext.Provider
      value={{
        items,
        additems,
        updateQuantaty,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); /// custome hook to import
export default CartProvider;
