import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import visa from '../../Images/visa.png';
import masterCard from '../../Images/masterCard.png';
import americanExpress from '../../Images/americanExpress.png';
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import useMyAccount from "../../../Hooks/useMyAccount";
import { toast } from "react-toastify";

const CardPaymentForm = () => {
    const [clientSecret, setClientSecret] = useState("");
    const [error, setError] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cart] = useCart();
    const [account] = useMyAccount();


    // Load Client Secret.
    useEffect(() => {
        axiosSecure.post("/create-payment-intent", { price: cart.cartTotalPrice })
            .then(res => {
                setClientSecret(res.data.clientSecret);
                console.log(res.data.clientSecret);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [])


    // Make Payment Function.
    const onSubmit = async (e) => {
        e.preventDefault();


        if (!elements || !stripe) {
            return;
        };

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        };

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError("");
        };

        // Confirm Payment.
        const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: account.email,
                    name: account.addresses[0].fullName,
                    phone: account.addresses[0].phoneNumber,
                    address: account.addresses[0].address,
                }
            }
        });


        if (paymentError) {
            console.log('Payment error', paymentError);
            setError(error.message);
        } else {
            console.log('Payment Intent', paymentIntent);
            setError("");
            if (paymentIntent.status === "succeeded") {
                toast.success(`Your Order Confirm Successfully. Your Order Id is: ${paymentIntent.id}`)
            }
        };
    };

    return (
        <form onSubmit={onSubmit} className='bg-white p-10'>
            <div className="flex items-center gap-4">
                <img className="h-10 w-10" src={visa} alt="" />
                <img className="h-10 w-10" src={masterCard} alt="" />
                <img className="h-10 w-10" src={americanExpress} alt="" />
            </div>
            <div className="border border-gray-400 rounded py-2.5 px-4 mt-5 mb-2">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '18px',
                                fontWeight: '600',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>
            <div>
                <p className="text-sm text-red-500 font-semibold leading-6">{error}</p>
            </div>
            <button
                className="my-3 bg-orange-400 hover:bg-orange-500 duration-500 text-white py-2.5 px-6 rounded cursor-pointer text-sm"
                type="submit" disabled={!stripe || !clientSecret}>
                Pay Now
            </button>
        </form>
    );
};

export default CardPaymentForm;