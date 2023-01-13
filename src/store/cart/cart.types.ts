import { Product } from '../categories/categories.types';

export enum CartActionTypes {
  toggle = 'cart/toggle',
  addProduct = 'cart/addProduct',
  decreaseProductQuantity = 'cart/decreaseProductQuantity',
  deleteProduct = 'cart/deleteProduct',
}

export type CartItem = Product & {
  quantity: number;
};
