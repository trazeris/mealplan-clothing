
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { cartToggle } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { Button } from '../button/button.styles';
import CartItem from '../cart-item/cart-item.component';
import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const gotoCheckout = () => {
    dispatch(cartToggle())
    navigate('/checkout');
  }

  return (
    <CartDropdownContainer>
      <CartItems>

        {
          cartItems.length ? (
            cartItems.map(item => <CartItem key={item.id} cartItem={item} />)
          ) : 
          (<EmptyMessage>Empty cart</EmptyMessage>)
        }
      </CartItems>
      <Button onClick={gotoCheckout}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown;