import { useDispatch, useSelector } from 'react-redux';
import { cartToggle } from '../../store/cart/cart.action';

import { selectCartItemsCount } from '../../store/cart/cart.selector';
import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';

const CartIcon = () => {
  const totalItemsCount = useSelector(selectCartItemsCount);
  const dispatch = useDispatch();

  const toggleIsCartOpen = () => dispatch(cartToggle());

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{totalItemsCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
