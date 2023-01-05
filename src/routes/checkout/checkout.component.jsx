
import { useContext } from 'react';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import { CartContext } from '../../contexts/cart.context';
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles';

const Checkout = () => {
  const {cartItems, totalItemsPrice} = useContext(CartContext);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span></span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((item) => (<CheckoutItem key={item.id} item={item} />))}
      <Total>Total: {totalItemsPrice()}</Total>
    </CheckoutContainer>
  )
}

export default Checkout;