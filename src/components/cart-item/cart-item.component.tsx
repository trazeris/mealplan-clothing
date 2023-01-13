import { CartItem } from '../../store/cart/cart.types';
import {
  CartImage,
  CartItemContainer,
  ItemDetails,
  Name,
  Price,
} from './cart-item.styles';

type CartItemProps = {
  cartItem: CartItem;
};

const CartItemElement = ({ cartItem }: CartItemProps) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <CartImage src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <Name>{name}</Name>
        <Price>
          {quantity} x ${price}
        </Price>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItemElement;
