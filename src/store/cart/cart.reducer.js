const initialState = {
  isCartOpen: false,
  cartItems: []
}

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

export const cartReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'cart/toggle': 
      return {
        ...state,
        isCartOpen: !state.isCartOpen
    }
    case 'cart/addProduct': 
      return {
        ...state,
        cartItems: addCartItem(state.cartItems, payload)
      }
    case 'cart/decreaseProductQuantity': 
      return {
        ...state,
        cartItems: decreaseItemQuantity(state.cartItems, payload)
      }
    case 'cart/deleteProduct': 
      return {
        ...state,
        cartItems: state.cartItems.filter((product) => product.id !== payload.id)
      }
    default:
      return state;
  }
}  