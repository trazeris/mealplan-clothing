import {
  Action,
  ActionWithPayload,
  createAction,
} from '../../utils/reducer/reducer.utils';
import { Product } from '../categories/categories.types';
import { CartActionTypes } from './cart.types';

export type CartToggle = Action<CartActionTypes.toggle>;
export type CartAddProduct = ActionWithPayload<
  CartActionTypes.addProduct,
  Product
>;
export type CartDecreaseProductQuantity = ActionWithPayload<
  CartActionTypes.decreaseProductQuantity,
  Product
>;
export type CartDeleteProduct = ActionWithPayload<
  CartActionTypes.deleteProduct,
  Product
>;

export type CartAction =
  | Action<void>
  | CartToggle
  | CartAddProduct
  | CartDecreaseProductQuantity
  | CartDeleteProduct;

export const cartToggle = (): CartToggle =>
  createAction(CartActionTypes.toggle);

export const cartAddProduct = (product: Product): CartAddProduct =>
  createAction(CartActionTypes.addProduct, product);

export const cartDecreaseProductQuantity = (
  product: Product
): CartDecreaseProductQuantity =>
  createAction(CartActionTypes.decreaseProductQuantity, product);

export const cartDeleteProduct = (product: Product): CartDeleteProduct =>
  createAction(CartActionTypes.deleteProduct, product);
