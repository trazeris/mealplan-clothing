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

const decreaseItemQuantity = (currentItemList, product) => {
  const item = currentItemList.find(element => element.id === product.id);
  if(item) {
    if(item.quantity > 1) {
      return currentItemList.map((cartItem) => 
        cartItem.id === product.id 
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem);
    }
  }
  return [...currentItemList];
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => {},
  totalItems: () => 0,
  removeFromCart: () => {},
  decreaseItemQuantityInCart: () => {}
});

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) => {
    setCartItems((cartItems) => addCartItem(cartItems, productToAdd));
  }

  const totalItems = () => cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const totalItemsPrice = () => cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const removeFromCart = (product) => {
    setCartItems((cartItems) => cartItems.filter((item) => product.id !== item.id));
  }

  const decreaseItemQuantityInCart = (product) => {
    setCartItems((cartItems) => decreaseItemQuantity(cartItems, product));
  }

  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    cartItems, 
    addItemToCart, 
    totalItems, 
    removeFromCart,
    totalItemsPrice,
    decreaseItemQuantityInCart
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}