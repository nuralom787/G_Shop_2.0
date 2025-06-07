import { Helmet } from "react-helmet-async";
import useMyAccount from "../../../Hooks/useMyAccount";
import { ScaleLoader } from "react-spinners";
import useCart from "../../../Hooks/useCart";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { MdOutlinePayments } from "react-icons/md";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { IoBagHandle } from "react-icons/io5";


const Checkout = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const [account, , isPending, isError] = useMyAccount();
    const [cart, refetch] = useCart();
    const shippingCost = account?.addresses[0].region !== "Dhaka" ? 60 : 30;
    // const [selectedProductIds, setSelectedProductIds] = useState([]);

    // const selectedProducts = cart?.cart?.filter(item => selectedProductIds.includes(item._id));

    // Load and Store Selected Product From LS.
    // useEffect(() => {
    //     const stored = JSON.parse(localStorage.getItem("selectedProducts"));
    //     if (stored.length) {
    //         setSelectedProductIds(stored);
    //     } else {
    //         setSelectedProductIds([]);
    //     }
    // }, []);


    // Handle Apply Coupon Code.

    const applyCoupon = (data) => {
        // console.log(data.couponCode, cart?.cartTotalPrice);
        if (!cart?.cartTotalPrice) {
            return toast.error("please add some product in your cart!!");
        };

        data.subtotal = cart?.cartTotalPrice;
        data.email = account.email;

        // Validate Coupon Code.
        axiosSecure.post("/apply-coupon", data)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success(`Coupon code "${data.couponCode}" applied successfully.`, { position: "top-center", autoClose: 5000 });
                    reset();
                }
            })
            .catch(err => {
                toast.error(err.response.data.message);
            })
    };


    return (
        <section className="bg-gray-300 py-10">
            <Helmet>
                <title>G-Shop | Checkout</title>
            </Helmet>
            <section className="max-w-screen-2xl mx-auto px-4 lg:px-6 font-inter">
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
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-3">
                        <div className="w-full lg:w-3/5 space-y-4 text-black">
                            {/* Shipping & Billing Options */}
                            <div className="bg-white px-4">
                                <div className="flex justify-between items-center gap-4 py-3">
                                    <h5 className="text-sm">Shipping & Billing</h5>
                                    <button className="text-sm text-cyan-500 cursor-pointer">EDIT</button>
                                </div>
                                {
                                    account.addresses.slice(0, 1).map(address => <div key={address._id} className="text-sm pt-4 pb-6">
                                        <p>
                                            <span className="pr-5 font-bold italic">{address.fullName}</span>
                                            <span>{address.phoneNumber}</span>
                                        </p>
                                        <p className="leading-10">{address.address}, {address.region}, {address.city}, {address.zone}.</p>
                                    </div>)
                                }
                            </div>

                            {/* Selected Products For Checkout */}
                            {cart?.cart?.length ?
                                <ul className="space-y-2">
                                    {
                                        cart?.cart?.map(product => <li
                                            key={product._id}
                                            className="flex flex-col md:flex-row justify-between items-center gap-6 text-black bg-white px-4 py-6"
                                        >
                                            <div className="flex flex-col md:flex-row justify-start items-center gap-6 w-full lg:w-4/6">
                                                <img src={product.image} alt="" className="w-20 h-20 rounded-full border-4 border-gray-300" />
                                                <h3 className="font-medium text-xl">{product.title}</h3>
                                            </div>
                                            <div className="text-center w-full lg:w-2/6">
                                                <p className="text-xl font-semibold text-[#00a63e]">${product.price.toFixed(2)}</p>
                                                {product.originalPrice > product.price && <p className="text-base line-through leading-7">${(product.originalPrice).toFixed(2)}</p>}
                                                {product.discount > 0 && <p className="text-base">-{Math.ceil(product.discount)}%</p>}
                                            </div>
                                            <div className="text-center w-full lg:w-2/6">
                                                <p><span className="text-gray-400">Qty:</span> {product.quantity}</p>
                                            </div>
                                        </li>)
                                    }
                                </ul>
                                :
                                <div className="p-16 lg:p-32 font-inter bg-white text-center">
                                    <IoBagHandle className="text-gray-500 text-7xl font-semibold mx-auto" />
                                    <p className="text-gray-500 text-xl font-semibold leading-14">Your cart is empty!</p>
                                </div>
                            }
                        </div>
                        <div className="w-full lg:w-2/5 bg-white text-[#151515] p-6 sticky top-36">
                            <h1 className="text-xl font-semibold leading-8">Order Summery</h1>
                            <div className="divider before:bg-black after:bg-black my-2"></div>
                            <div className="">
                                <div className="flex justify-between items-center gap-2">
                                    <p className="font-medium text-sm text-gray-600 leading-8">SubTotal <span>({cart?.cart?.length} Items)</span></p>
                                    <p className="font-medium text-sm">${cart?.cartTotalPrice?.toFixed(2) || "00.00"}</p>
                                </div>
                                <div className="flex justify-between items-center gap-2">
                                    <p className="font-medium text-sm text-gray-600 leading-8">Shipping Fee</p>
                                    <p className="font-medium text-sm">${shippingCost.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between items-center gap-2">
                                    <p className="font-medium text-sm text-gray-600 leading-8">Discount</p>
                                    <p className="font-medium text-sm">${cart?.cartDiscount.toFixed(2)}</p>
                                </div>
                            </div>
                            {cart?.cartDiscount && cart?.appliedCoupon ?
                                <div className="bg-green-100 py-3 px-6 mt-5 mb-1.5 font-inter flex justify-between items-center">
                                    <h2 className="text-sm text-green-600 font-bold">Coupon Applied</h2>
                                    <span className="text-sm text-red-500 font-bold uppercase">{cart?.appliedCoupon}</span>
                                </div>
                                :
                                <form onSubmit={handleSubmit(applyCoupon)} className="grid grid-cols-4 mt-5 mb-1.5">
                                    <input {...register("couponCode", { required: true })} type="text" className="px-4 py-2 font-semibold text-base border border-e-0 border-gray-300 focus:border-cyan-500 duration-500 rounded-s-sm outline-0 col-span-3" />
                                    <button type="submit" className="uppercase font-semibold text-base text-white bg-[#25a5d8] hover:bg-cyan-700 duration-500 rounded-e-sm cursor-pointer col-span-1">Apply</button>
                                </form>
                            }
                            <div className="flex justify-between items-center gap-2">
                                <p className="font-bold text-xl text-[#151515] leading-12">Total</p>
                                <p className="font-bold text-xl text-red-600">${((cart?.cartTotalPrice + shippingCost) - cart?.cartDiscount).toFixed(2) || "00.00"}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* <Link to="/" className="w-full inline-flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 duration-300 text-white px-5 py-2.5 rounded font-semibold text-base mt-8 text-center">CONTINUE SHOPPING <RiShoppingBasketLine /></Link> */}
                                <Link
                                    to="/user/payment"
                                    className="w-full inline-flex items-center justify-center gap-1.5 bg-orange-400 hover:bg-orange-500 duration-300 text-white px-5 py-2.5 rounded font-semibold text-base mt-8 text-center">
                                    PROCEED TO PAY <MdOutlinePayments className="text-xl" />
                                </Link>
                            </div>
                        </div>
                    </div>
                }
            </section>
        </section>
    );
};

export default Checkout;