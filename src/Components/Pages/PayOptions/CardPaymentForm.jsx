import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import visa from '../../Images/visa.png';
import masterCard from '../../Images/masterCard.png';
import americanExpress from '../../Images/americanExpress.png';

const CardPaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();


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
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        };
    };


    return (
        <form onSubmit={onSubmit} className='bg-white p-10'>
            <div className="flex items-center gap-4">
                <img className="h-10 w-10" src={visa} alt="" />
                <img className="h-10 w-10" src={masterCard} alt="" />
                <img className="h-10 w-10" src={americanExpress} alt="" />
            </div>
            <div className="border border-gray-400 rounded py-2.5 px-4 my-5">
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
            <button
                className="my-2 bg-orange-400 hover:bg-orange-500 duration-500 text-white py-2.5 px-6 rounded cursor-pointer text-sm"
                type="submit" disabled={!stripe}>
                Pay Now
            </button>
        </form>
    );
};

export default CardPaymentForm;