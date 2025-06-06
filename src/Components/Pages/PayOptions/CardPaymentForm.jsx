import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import visa from '../../Images/visa.png';
import masterCard from '../../Images/masterCard.png';
import americanExpress from '../../Images/americanExpress.png';
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import useMyAccount from "../../../Hooks/useMyAccount";
import { toast } from "react-toastify";
import useProducts from "../../../Hooks/useProducts";
import { useNavigate } from "react-router";

const CardPaymentForm = () => {
    const [clientSecret, setClientSecret] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [products] = useProducts();
    const [cart, refetch] = useCart();
    const [account] = useMyAccount();
    const shippingCost = account?.addresses[0]?.region !== "Dhaka" ? 60 : 30;

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
            billing_details: {
                email: account.email,
                name: account.addresses[0].fullName,
                phone: account.addresses[0].phoneNumber,
                address: {
                    state: account.addresses[0].region,
                    city: account.addresses[0].city,
                    line1: account.addresses[0].address
                }
            }
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError("");
        };

        setLoading(true);
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
            // console.log('Payment error', paymentError);
            setError(error.message);
            setLoading(false);
        }
        else {
            // console.log('Payment Intent', paymentIntent);
            setError("");
            if (paymentIntent.status === "succeeded") {
                //--------------------------------------- 
                //          Store Order Information. 
                // --------------------------------------


                // create cart for order information.
                let newCart = [];
                for (let item of cart.cart) {
                    const newItem = products.products.find(product => product._id === item._id);
                    newItem.quantity = item.quantity;
                    newCart = [...newCart, newItem];
                };

                // create order information.
                const order_information = {
                    customerInfo: {
                        customer_name: account.displayName,
                        customer_phoneNumber: account.phoneNumber,
                        customer_email: account.email,
                        customer_uid: account.uid,
                        customer_id: account._id
                    },
                    cart: newCart,
                    sbAddress: account.addresses[0],
                    status: "Pending",
                    subtotal: cart.cartTotalPrice,
                    shippingCost: shippingCost,
                    discount: cart.cartDiscount,
                    appliedCoupon: cart.cartDiscount > 0 ? cart.appliedCoupon : null,
                    total: (cart.cartTotalPrice + shippingCost) - cart.cartDiscount,
                    paymentMethod: "Card",
                    paymentInfo: {
                        paymentMethod,
                        paymentIntent
                    },
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    invoice: null,
                    orderId: null
                };

                // console.log(order_information);

                axiosSecure.post("/add-order", order_information)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.insertedId) {
                            toast.success(`Your order ${res.data.orderId.split("-")[1]} has been pleased successfully. your invoice id is: ${res.data.invoice}.`, {
                                position: "top-center",
                                autoClose: 6000,
                                style: { fontWeight: "600", color: "#151515", width: "500px", padding: "20px" }
                            });
                            refetch();
                            navigate(`/order/invoice/${res.data.insertedId}`)
                            setLoading(false);
                        };
                    })
                    .catch(err => {
                        console.log(err);
                        setLoading(false);
                    });
            };
        };
    };



    return (
        <form onSubmit={onSubmit} className='bg-white p-5 lg:p-10'>
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
            <div className="my-6">
                {loading ?
                    <button
                        className="w-full lg:w-fit bg-orange-500 text-white py-2.5 px-6 rounded text-sm"
                        type="submit" disabled>
                        Processing.. <span className="loading loading-spinner loading-sm"></span>
                    </button>
                    :
                    <button
                        className="w-full lg:w-fit bg-orange-400 hover:bg-orange-500 duration-500 text-white py-2.5 px-6 rounded cursor-pointer text-sm"
                        type="submit" disabled={!stripe || !clientSecret}>
                        Pay Now
                    </button>
                }
            </div>
        </form>
    );
};

export default CardPaymentForm;