import { useDispatch } from 'react-redux';

import {
  cartAddProduct,
  cartDecreaseProductQuantity,
  cartDeleteProduct,
} from '../../store/cart/cart.action';
import { CartItem } from '../../store/cart/cart.types';
import {
  Arrow,
  CheckoutItemContainer,
  Field,
  Image,
  ImageContainer,
  Quantity,
  RemoveButton,
  Value,
} from './checkout-item.styles';

type CheckoutItemProps = {
  item: CartItem;
};

const CheckoutItem = ({ item }: CheckoutItemProps) => {
  const { name, imageUrl, price, quantity } = item;
  const dispatch = useDispatch();

  const removeItemHandler = () => dispatch(cartDeleteProduct(item));
  const increaseHandler = () => dispatch(cartAddProduct(item));
  const decreaseHandler = () => {
    if (quantity > 1) dispatch(cartDecreaseProductQuantity(item));
  };

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <Image src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <Field>{name}</Field>
      <Quantity>
        <Arrow
          className={`${quantity === 1 && 'disabled'}`}
          onClick={decreaseHandler}>
          &#10094;
        </Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={increaseHandler}>&#10095;</Arrow>
      </Quantity>
      <Field>${price}</Field>
      <RemoveButton onClick={removeItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
