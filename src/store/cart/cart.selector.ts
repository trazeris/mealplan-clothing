import { createSelector } from 'reselect';
import { RootState } from '../store';
import { CartState } from './cart.reducer';

const selectCartSlice = (state: RootState): CartState => state.cart;

export const selectIsCartOpen = createSelector(
  [selectCartSlice],
  (selectCartSlice) => selectCartSlice.isCartOpen
);

export const selectCartItems = createSelector(
  [selectCartSlice],
  (selectCartSlice) => selectCartSlice.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (selectCartItems) =>
    selectCartItems.reduce((acc, item) => acc + item.quantity, 0)
);

export const selectCartItemsTotal = createSelector(
  [selectCartItems],
  (selectCartItems) =>
    selectCartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
);
