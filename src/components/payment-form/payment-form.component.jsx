import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { InvertedButton } from "../button/button.styles";
import { PaymentFormContainer, PayForm } from "./payment-form.styles";


const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();
    if(stripe && elements) {
      const response = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'post',
        port: 9999,
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({amount: 1000})
      }).then(res => res.json());

      console.log(response)
    }
  }

  return (
    <PaymentFormContainer>
      <PayForm onSubmit={paymentHandler}>
        <h2>Credit card payment: </h2>
        <CardElement />
        <InvertedButton>Pay now</InvertedButton>
      </PayForm>
    </PaymentFormContainer>
  )
}

export default PaymentForm;