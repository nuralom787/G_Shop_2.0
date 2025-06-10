import { Helmet } from "react-helmet-async";
import useMyAccount from "../../../Hooks/useMyAccount";
import useCart from "../../../Hooks/useCart";
import { ScaleLoader } from "react-spinners";
import card from '../../Images/credit-card.png';
import bkash from '../../Images/bkash.png';
import nagad from '../../Images/nagad.png';
import doller from '../../Images/dollar.png';
import { useEffect, useState } from "react";
import CardPaymentForm from "../PayOptions/CardPaymentForm";
import BkashPayment from "../PayOptions/Bkashpayment";
import NagadPayment from "../PayOptions/NagadPayment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import useProducts from "../../../Hooks/useProducts";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router";
import { FaArrowRight } from "react-icons/fa";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PROMISE);

const Payment = () => {
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [account, , isPending, isError] = useMyAccount();
    const [products, , pPending, pError] = useProducts();
    const [cart, refetch, cartPending, cartError] = useCart();
    const [method, setMethod] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const shippingCost = account?.addresses[0].region !== "Dhaka" ? 60 : 30;

    const searchData = new URLSearchParams(location.search);
    const paymentID = searchData.get("paymentID");
    const status = searchData.get("status");
    const trxID = searchData.get("trxID");
    const transactionStatus = searchData.get("transactionStatus");
    const invoiceId = searchData.get("invoiceId");
    const newId = "#" + invoiceId;


    // Store Order Information In The Database.
    // This callback function use for bkash payments orders.
    useEffect(() => {
        if (paymentID && status === "cancel") {
            // toast.info("payment was canceled! please try again.");
            // console.log(paymentData)
        }
        else if (paymentID && status === "failure") {
            // toast.info("payment was failed! please try again.")
            // console.log(paymentData)
        }


        // Make Order information and placed order.
        if (!cartPending && !cartError && !pPending && !pError) {
            if (paymentID && status === "success") {
                // console.log(paymentData);
                setLoading(true);

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
                    paymentMethod: "BKASH",
                    paymentInfo: {
                        paymentID,
                        status,
                        trxID,
                        transactionStatus,
                        amount: (cart.cartTotalPrice + shippingCost) - cart.cartDiscount,
                        paymentType: "bkash"
                    },
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    invoice: newId,
                    orderId: null
                };
                console.log(order_information);


                // 
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
                            navigate(`/order/invoice/${res.data.insertedId}`, { replace: true })
                            setLoading(false);
                        };
                    })
                    .catch(err => {
                        console.log(err);
                        setLoading(false);
                    });
            }
        }
    }, [cart, products]);


    // Make Cod Payment.
    const confirmOrder = () => {
        setLoading(true);

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
            paymentMethod: "COD",
            paymentInfo: {
                paymentType: "Cash-on-delivery"
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            invoice: null,
            orderId: null
        };

        // 
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


    // Change Payment Method Function. 
    const handleMethod = (e) => {
        if (e.target.value === "card") {
            setMethod("card");
        } else if (e.target.value === "bkash") {
            setMethod("bkash");
        } else if (e.target.value === "nagad") {
            setMethod("nagad");
        } else {
            setMethod("cod");
        }
    };

    return (
        <section className="bg-gray-300 py-10">
            <Helmet>
                <title>G-Shop | PAYMENT {method && `- ${method?.toUpperCase()}`}</title>
            </Helmet>
            <section className="max-w-screen-2xl mx-auto px-3.5 lg:px-6 font-inter">
                {isPending || isError ?
                    <div className="flex justify-center items-center my-32">
                        <ScaleLoader
                            color={"#63e075"}
                            loading={true}
                            size={500}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                    :
                    <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-6 lg:gap-3">
                        {loading &&
                            <div className="fixed inset-0 z-50 bg-black opacity-40 flex items-center justify-center">
                                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        }
                        <div className="w-full lg:w-3/5 text-black">
                            <h3 className="font-semibold text-xl">Select your payment method.</h3>
                            {cart?.cart?.length ?
                                <div>
                                    <div className="hidden lg:grid grid-cols-4 pt-5">
                                        <button onClick={() => setMethod("card")} className={`text-center cursor-pointer p-6 ${method === "card" ? "bg-white" : "bg-transparent"}`}>
                                            <img src={card} alt="" className="h-16 w-16 mx-auto" />
                                            <h5 className="text-sm font-medium leading-9">Credit/Debit Card</h5>
                                        </button>
                                        <button onClick={() => setMethod("bkash")} className={`text-center cursor-pointer p-6 ${method === "bkash" ? "bg-white" : "bg-transparent"}`}>
                                            <img src={bkash} alt="" className="h-16 w-16 mx-auto" />
                                            <h5 className="text-sm font-medium leading-9">Bkash</h5>
                                        </button>
                                        <button disabled onClick={() => setMethod("nagad")} className={`text-center cursor-pointer p-6 grayscale ${method === "nagad" ? "bg-white" : "bg-transparent"}`}>
                                            <img src={nagad} alt="" className="h-16 w-16 mx-auto" />
                                            <h5 className="text-sm font-medium leading-9">Nagad</h5>
                                        </button>
                                        <button onClick={() => setMethod("cod")} className={`text-center cursor-pointer p-6 ${method === "cod" ? "bg-white" : "bg-transparent"}`}>
                                            <img src={doller} alt="" className="h-16 w-16 mx-auto" />
                                            <h5 className="text-sm font-medium leading-9">Cash on Delivery</h5>
                                        </button>
                                    </div>
                                    <select className="blok lg:hidden w-full border border-base-200 outline-0 rounded my-4 py-1.5 px-3 mx-auto" onChange={handleMethod}>
                                        <option value="" hidden>Select an Payment Method</option>
                                        <option value="card">Card</option>
                                        <option value="bkash">Bkash</option>
                                        <option value="nagad" disabled>Nagad</option>
                                        <option value="cod">Cash On Delivery</option>
                                    </select>
                                </div>
                                :
                                <div className="grid grid-cols-4 pt-5">
                                    <button
                                        onClick={() => toast.error("Your cart is empty! please add some product to your cart and try to make a payment again.", { style: { width: "500px", padding: "25px", color: "red", fontWeight: "600" } })}
                                        className={`text-center p-6 grayscale`}
                                    >
                                        <img src={card} alt="" className="h-16 w-16 mx-auto" />
                                        <h5 className="text-sm font-medium leading-9">Credit/Debit Card</h5>
                                    </button>
                                    <button
                                        onClick={() => toast.error("Your cart is empty! please add some product to your cart and try to make a payment again.", { style: { width: "500px", padding: "25px", color: "red", fontWeight: "600" } })}
                                        className={`text-center p-6 grayscale`}
                                    >
                                        <img src={bkash} alt="" className="h-16 w-16 mx-auto" />
                                        <h5 className="text-sm font-medium leading-9">Bkash</h5>
                                    </button>
                                    <button
                                        onClick={() => toast.error("Your cart is empty! please add some product to your cart and try to make a payment again.", { style: { width: "500px", padding: "25px", color: "red", fontWeight: "600" } })}
                                        className={`text-center p-6 grayscale`}
                                    >
                                        <img src={nagad} alt="" className="h-16 w-16 mx-auto" />
                                        <h5 className="text-sm font-medium leading-9">Nagad</h5>
                                    </button>
                                    <button
                                        onClick={() => toast.error("Your cart is empty! please add some product to your cart and try to make a payment again.", { style: { width: "500px", padding: "25px", color: "red", fontWeight: "600" } })}
                                        className={`text-center p-6 grayscale`}
                                    >
                                        <img src={doller} alt="" className="h-16 w-16 mx-auto" />
                                        <h5 className="text-sm font-medium leading-9">Cash on Delivery</h5>
                                    </button>
                                </div>
                            }
                            {method === "card" &&
                                <Elements stripe={stripePromise}>
                                    <CardPaymentForm />
                                </Elements>
                            }
                            {method === "bkash" &&
                                <BkashPayment />
                            }
                            {method === "nagad" &&
                                <NagadPayment />
                            }
                            {method === "cod" &&
                                <div className="bg-white p-5 lg:p-10">
                                    <ul className="space-y-2 text-sm">
                                        <li>- You may pay in cash to our courier upon receiving your parcel at the doorstep</li>
                                        <li>- Before agreeing to receive the parcel, check if your delivery status has been updated to 'Out for Delivery'</li>
                                        <li>- Before receiving, confirm that the airway bill shows that the parcel is from G-Shop</li>
                                        <li>- Before you make payment to the courier, confirm your order number, sender information and tracking number on the parcel</li>
                                    </ul>
                                    {loading ?
                                        <button
                                            disabled
                                            className="w-full lg:w-fit bg-orange-400 text-white px-12 py-2.5 mt-8 rounded font-semibold text-base">
                                            Processing.. <span className="loading loading-spinner loading-sm"></span>
                                        </button>
                                        :
                                        <button
                                            onClick={confirmOrder}
                                            className="w-full lg:w-fit bg-orange-400 hover:bg-orange-500 duration-300 text-white px-12 py-2.5 mt-8 rounded font-semibold text-base cursor-pointer inline-flex justify-center items-center gap-4">
                                            Confirm Order <FaArrowRight />
                                        </button>
                                    }
                                </div>
                            }
                        </div>
                        <div className="w-full lg:w-2/5 bg-white text-[#151515] p-6 lg:sticky lg:top-36">
                            <h1 className="text-xl font-semibold leading-8 my-2">Order Summery</h1>
                            <div className="mb-6">
                                <div className="flex justify-between items-center gap-2">
                                    <p className="font-medium text-sm text-gray-600 leading-8">SubTotal <span>({cart?.cart?.length} items and shipping fee included)</span></p>
                                    <p className="font-medium text-sm">${(cart?.cartTotalPrice + shippingCost).toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between items-center gap-2">
                                    <p className="font-medium text-sm text-gray-600 leading-8">Discount</p>
                                    <p className="font-medium text-sm">${cart?.cartDiscount?.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <p className="font-bold text-xl text-[#151515] leading-12">Total Amount</p>
                                <p className="font-bold text-xl text-red-600">${((cart?.cartTotalPrice + shippingCost) - cart?.cartDiscount).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                }
            </section>
        </section>
    );
};

export default Payment;