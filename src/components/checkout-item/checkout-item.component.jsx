import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-item.styles.scss';

const CheckoutItem = ({item}) => {
  const {name, imageUrl, price, quantity} = item;
  const {removeFromCart, addItemToCart, decreaseItemQuantityInCart} = useContext(CartContext)

  const removeItemHandler = () => removeFromCart(item);
  const increaseHandler = () => addItemToCart(item);
  const decreaseHandler = () => {
    if(quantity > 1) decreaseItemQuantityInCart(item)
  };

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className={`arrow ${(quantity === 1) && 'disabled'}`} onClick={decreaseHandler}>&#10094;</div>
        <div className='value'> {quantity}</div>
        <div className='arrow'  onClick={increaseHandler}>&#10095;</div>
      </span>
      <span className='price'>${price}</span>
      <div className='remove-button' onClick={removeItemHandler}>&#10005;</div>
    </div>
  )
}

export default CheckoutItem;