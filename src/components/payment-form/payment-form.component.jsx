import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItemsTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import { PaymentFormContainer, PayForm, PaymentButton } from './payment-form.styles';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const cartTotal = useSelector(selectCartItemsTotal);
  const currentUser = useSelector(selectCurrentUser);

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (stripe && elements) {
      setIsProcessingPayment(true);
      const response = await fetch('/api/create-payment-intent', {
        method: 'post',
        port: 9999,
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ amount: cartTotal * 100 }),
      }).then((res) => res.json());

      const { paymentIntent } = response;
      const paymentResult = await stripe.confirmCardPayment(paymentIntent.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: currentUser ? currentUser.displayName : 'Guest',
          },
        },
      });
      setIsProcessingPayment(false);

      if (paymentResult.error) {
        console.log(paymentResult.error);
      } else {
        if (paymentResult.paymentIntent.status === 'succeeded') {
          console.log('payment ok');
        }
      }
    }
  };

  return (
    <PaymentFormContainer>
      <PayForm onSubmit={paymentHandler}>
        <h2>Credit card payment: </h2>
        <CardElement />
        <PaymentButton isLoading={isProcessingPayment}>Pay now</PaymentButton>
      </PayForm>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
