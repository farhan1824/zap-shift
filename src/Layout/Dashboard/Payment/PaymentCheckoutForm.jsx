import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { AxiosHook } from '../../../Hooks/AxiosHook';

export const PaymentCheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMsg, setErrorMsg] = useState("");
    const { ProductId } = useParams();
    const axios = AxiosHook()
    // console.log(ProductId);
    const { data: PaymentProductData } = useQuery({
        queryKey: ["parcels", ProductId],
        queryFn: async () => {
            const res = await axios.get(`/parcels/${ProductId}`)
            return res.data
        }
    })
    console.log(PaymentProductData);
    const cost = PaymentProductData?.delivery_cost;

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);

        if (!card) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setErrorMsg(error.message);
        } else {
            setErrorMsg("");
            console.log("[PaymentMethod]", paymentMethod);
        }
    };

    const cardStyle = {
        style: {
            base: {
                color: "#1f2937",
                fontSize: "16px",
                fontFamily: "Inter, sans-serif",
                "::placeholder": {
                    color: "#9ca3af",
                },
            },
            invalid: {
                color: "#ef4444",
            },
        },
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Payment Details
            </h2>

            <form onSubmit={handlePayment} className="space-y-4">

                <div className="border rounded-lg p-3 focus-within:ring-2 focus-within:ring-[#CAEB66]">
                    <CardElement options={cardStyle} />
                </div>

                {errorMsg && (
                    <p className="text-red-500 text-sm">{errorMsg}</p>
                )}

                <button
                    type="submit"
                    disabled={!stripe}
                    className="w-full bg-[#CAEB66] text-black font-semibold py-2 rounded-lg transition"
                >
                    Pay Now ${cost}
                    {/* ${PaymentProductData.delivery_cost} */}
                </button>

            </form>
        </div>
    );
};