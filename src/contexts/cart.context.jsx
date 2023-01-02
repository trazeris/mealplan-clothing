import { createContext, useState } from "react";

const addCartItem = (currentItemList, productToAdd) => {
  const item = currentItemList.find(element => element.id === productToAdd.id);
  if(!item) {
    return [...currentItemList, {...productToAdd, quantity: 1}];
  } else {
    return currentItemList.map((cartItem) => 
      cartItem.id === productToAdd.id 
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem);
  }
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => {},
  totalItems: () => 0
});

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const totalItems = () => cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, totalItems };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}