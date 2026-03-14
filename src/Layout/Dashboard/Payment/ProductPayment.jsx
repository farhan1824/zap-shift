import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import { PaymentCheckoutForm } from './PaymentCheckoutForm';

const ProductPayment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_publish_key);
    // const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
    return (
        <div className='text-black'>

            <Elements stripe={stripePromise}>
                <PaymentCheckoutForm></PaymentCheckoutForm>
            </Elements>
        </div>
    )
}

export default ProductPayment