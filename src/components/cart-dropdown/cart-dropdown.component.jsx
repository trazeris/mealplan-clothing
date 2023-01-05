
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';
import { Button } from '../button/button.styles';
import CartItem from '../cart-item/cart-item.component';
import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';

const CartDropdown = () => {
  const {cartItems, setIsCartOpen} = useContext(CartContext);
  const navigate = useNavigate();

  const gotoCheckout = () => {
    setIsCartOpen(false);
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