import { Product } from '../categories/categories.types';
import { CartAction } from './cart.action';
import { CartActionTypes, CartItem } from './cart.types';

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
};

const initialState: CartState = {
  isCartOpen: false,
  cartItems: [],
};

const addCartItem = (
  currentItemList: CartItem[],
  productToAdd: Product
): CartItem[] => {
  const item = currentItemList.find(
    (element) => element.id === productToAdd.id
  );
  if (!item) {
    return [...currentItemList, { ...productToAdd, quantity: 1 }];
  } else {
    return currentItemList.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
};

const decreaseItemQuantity = (
  currentItemList: CartItem[],
  product: Product
): CartItem[] => {
  const item = currentItemList.find((element) => element.id === product.id);
  if (item) {
    if (item.quantity > 1) {
      return currentItemList.map((cartItem) =>
        cartItem.id === product.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    }
  }
  return [...currentItemList];
};

export const cartReducer = (
  state = initialState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case CartActionTypes.toggle:
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    case CartActionTypes.addProduct:
      return {
        ...state,
        cartItems: addCartItem(state.cartItems, action.payload),
      };
    case CartActionTypes.decreaseProductQuantity:
      return {
        ...state,
        cartItems: decreaseItemQuantity(state.cartItems, action.payload),
      };
    case CartActionTypes.deleteProduct:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (product) => product.id !== action.payload.id
        ),
      };
  }
  return state;
};
