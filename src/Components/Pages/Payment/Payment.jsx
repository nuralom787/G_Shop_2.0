import { Helmet } from "react-helmet-async";
import useMyAccount from "../../../Hooks/useMyAccount";
import useCart from "../../../Hooks/useCart";
import { ScaleLoader } from "react-spinners";
import card from '../../Images/credit-card.png';
import bkash from '../../Images/bkash.png';
import nagad from '../../Images/nagad.png';
import doller from '../../Images/dollar.png';
import { useState } from "react";

const Payment = () => {
    const [account, , isPending, isError] = useMyAccount();
    const [cart] = useCart();
    const [method, setMethod] = useState("");


    return (
        <section className="bg-gray-300 py-10">
            <Helmet>
                <title>G-Shop | Payment</title>
            </Helmet>
            <section className="max-w-screen-2xl mx-auto px-6 font-inter">
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
                    <div className="flex justify-between items-start gap-3">
                        <div className="w-3/5 text-black">
                            <h3 className="font-semibold text-xl">Select your payment method.</h3>
                            <div className="grid grid-cols-4 pt-5">
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
                            {method === "card" &&
                                <div className="bg-white p-10">
                                </div>
                            }
                            {method === "bkash" &&
                                <div className="bg-white p-10">

                                </div>
                            }
                            {method === "nagad" &&
                                <div className="bg-white p-10">

                                </div>
                            }
                            {method === "cod" &&
                                <div className="bg-white p-10">
                                    <ul className="space-y-2 text-sm">
                                        <li>- You may pay in cash to our courier upon receiving your parcel at the doorstep</li>
                                        <li>- Before agreeing to receive the parcel, check if your delivery status has been updated to 'Out for Delivery'</li>
                                        <li>- Before receiving, confirm that the airway bill shows that the parcel is from G-Shop</li>
                                        <li>- Before you make payment to the courier, confirm your order number, sender information and tracking number on the parcel</li>
                                    </ul>
                                    <button
                                        className="bg-orange-400 hover:bg-orange-500 duration-300 text-white px-12 py-2.5 mt-8 rounded font-semibold text-base cursor-pointer">
                                        Confirm Order
                                    </button>
                                </div>
                            }
                        </div>
                        <div className="w-2/5 bg-white text-[#151515] p-6 sticky top-36">
                            <h1 className="text-xl font-semibold leading-8 my-2">Order Summery</h1>
                            <div className="mb-6">
                                <div className="flex justify-between items-center gap-2">
                                    <p className="font-medium text-sm text-gray-600 leading-8">SubTotal <span>({cart?.cart?.length} items and shipping fee included)</span></p>
                                    <p className="font-medium text-sm">${cart?.cartTotalPrice?.toFixed(2) || "00.00"}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <p className="font-bold text-xl text-[#151515] leading-12">Total Amount</p>
                                <p className="font-bold text-xl text-red-600">${cart?.cartTotalPrice?.toFixed(2) || "00.00"}</p>
                            </div>
                        </div>
                    </div>
                }
            </section>
        </section>
    );
};

export default Payment;