import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { Arrow, CheckoutItemContainer, Field, Image, ImageContainer, Quantity, RemoveButton, Value } from './checkout-item.styles';

const CheckoutItem = ({item}) => {
  const {name, imageUrl, price, quantity} = item;
  const {removeFromCart, addItemToCart, decreaseItemQuantityInCart} = useContext(CartContext)

  const removeItemHandler = () => removeFromCart(item);
  const increaseHandler = () => addItemToCart(item);
  const decreaseHandler = () => {
    if(quantity > 1) decreaseItemQuantityInCart(item)
  };

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <Image src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <Field>{name}</Field>
      <Quantity>
        <Arrow className={`${(quantity === 1) && 'disabled'}`} onClick={decreaseHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={increaseHandler}>&#10095;</Arrow>
      </Quantity>
      <Field>${price}</Field>
      <RemoveButton onClick={removeItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem;