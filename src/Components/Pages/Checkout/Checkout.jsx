import { Helmet } from "react-helmet-async";
import useMyAccount from "../../../Hooks/useMyAccount";
import { ScaleLoader } from "react-spinners";
import useCart from "../../../Hooks/useCart";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { RiShoppingBasketLine } from "react-icons/ri";
import { IoWalletOutline } from "react-icons/io5";

const Checkout = () => {
    const [account, , isPending, isError] = useMyAccount();
    const [cart] = useCart();
    const [selectedProductIds, setSelectedProductIds] = useState([]);
    // const [loading, setLoading] = useState(false);

    const selectedProducts = cart?.cart?.filter(item => selectedProductIds.includes(item._id));

    // Load and Store Selected Product From LS.
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("selectedProducts"));
        if (stored.length) {
            setSelectedProductIds(stored);
        } else {
            setSelectedProductIds([]);
        }
    }, []);

    return (
        <section className="bg-gray-300 py-10">
            <Helmet>
                <title>G-Shop | Checkout</title>
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
                        {/* {loading &&
                            <div className="fixed inset-0 z-50 bg-black opacity-40 flex items-center justify-center">
                                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        } */}
                        <div className="w-3/5 space-y-4 text-black">
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
                            <ul className="bg-white p-4">
                                {
                                    selectedProducts?.map(product => <li
                                        key={product._id}
                                        className="flex justify-between items-center gap-6 "
                                    >
                                        <div className="flex justify-start items-center gap-6 w-3/6">
                                            <img src={product.image} alt="" className="w-16 h-16 rounded-full" />
                                            <div>
                                                <h3 className="font-medium text-xl">{product.title}</h3>
                                                <p className="text-sm font-semibold leading-8">Item Price: ${product.price.toFixed(2)}</p>
                                            </div>
                                            <p className="font-bold text-lg">${(product.price * product.quantity).toFixed(2)}</p>
                                        </div>
                                    </li>)
                                }
                            </ul>
                        </div>
                        <div className="w-2/5 bg-white text-[#151515] p-6 sticky top-36">
                            <h1 className="text-xl font-semibold leading-8">Order Summery</h1>
                            <div className="divider before:bg-black after:bg-black my-2"></div>
                            <div className="">
                                <div className="flex justify-between items-center gap-2">
                                    <p className="font-medium text-sm text-gray-600 leading-8">SubTotal</p>
                                    <p className="font-medium text-sm">${cart?.cartTotalPrice?.toFixed(2) || "00.00"}</p>
                                </div>
                                <div className="flex justify-between items-center gap-2">
                                    <p className="font-medium text-sm text-gray-600 leading-8">Shipping Fee</p>
                                    <p className="font-medium text-sm">$00.00</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 my-5">
                                <input type="text" className="px-4 py-2 font-semibold text-base border border-e-0 border-gray-300 rounded-s-sm outline-0 col-span-3" />
                                <button className="uppercase font-semibold text-base text-white bg-[#25a5d8] rounded-e-sm cursor-pointer col-span-1">Apply</button>
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <p className="font-bold text-xl text-[#151515] leading-12">Total</p>
                                <p className="font-bold text-xl text-red-600">${cart?.cartTotalPrice?.toFixed(2) || "00.00"}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link to="/" className="w-full inline-flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 duration-300 text-white px-5 py-2.5 rounded font-semibold text-base mt-8 text-center">CONTINUE SHOPPING <RiShoppingBasketLine /></Link>
                                <Link to="/user/checkout" className="w-full inline-flex items-center justify-center gap-1.5 bg-orange-400 hover:bg-orange-500 duration-300 text-white px-5 py-2.5 rounded font-semibold text-base mt-8 text-center">PROCEED TO CHECKOUT <IoWalletOutline /></Link>
                            </div>
                        </div>
                    </div>
                }
            </section>
        </section>
    );
};

export default Checkout;