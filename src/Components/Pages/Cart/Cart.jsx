import { useContext, useState } from "react";
import useCart from "../../../Hooks/useCart";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { ScaleLoader } from "react-spinners";
import { Link } from "react-router";
import { RiShoppingBasketLine } from "react-icons/ri";
import { IoWalletOutline } from "react-icons/io5";


const Cart = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const [cart, refetch, isPending, isError] = useCart();
    const axiosSecure = useAxiosSecure();

    // Handle Product Quantity.
    const handleQuantity = (e, id) => {
        const email = user?.email;
        const data = { email, id };

        if (e === "-1") {
            setLoading(true);
            axiosSecure.patch('/carts/quantity?quantity=-1', data)
                .then(res => {
                    console.log(res.data);
                    refetch()
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err.message);
                    setLoading(false);
                })
        }
        else {
            setLoading(true);
            axiosSecure.patch('/carts/quantity?quantity=+1', data)
                .then(res => {
                    console.log(res.data);
                    refetch()
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err.message);
                    setLoading(false);
                })
        }
    };


    return (
        <section className="bg-gray-300 py-10">
            <section className="max-w-screen-2xl mx-auto px-6 font-poppins">
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
                    <div className="flex justify-between items-start gap-2">
                        {loading &&
                            <div className="fixed inset-0 z-50 bg-black opacity-40 flex items-center justify-center">
                                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        }
                        <ul className="w-3/5 space-y-2">
                            <li className="text-black text-sm font-medium inline-flex items-center gap-2 w-full bg-white px-4 py-3">
                                <input type="checkbox" name="all" id="all" className="appearance-none w-4 h-4 bg-white checked:bg-green-500 border-2 border-gray-300 rounded cursor-pointer" />
                                Select All ({cart.cartTotalItem || 0} Item's)
                            </li>
                            {
                                cart?.cart?.map(product => <li
                                    key={product._id}
                                    className="flex justify-between items-center gap-6 text-black bg-white px-4 py-6"
                                >
                                    <div className="flex justify-start items-center gap-6 w-4/5">
                                        <input
                                            type="checkbox"
                                            name={product.title} id={product._id}
                                            className="appearance-none w-4 h-4 bg-white checked:bg-green-500 border-2 border-gray-300 rounded cursor-pointer" />
                                        <img src={product.image} alt="" className="w-14 h-14 rounded-full" />
                                        <div>
                                            <h3 className="font-medium text-xl">{product.title}</h3>
                                            <p className="text-sm font-semibold leading-8">Item Price: ${product.price.toFixed(2)}</p>
                                            <p className="font-bold text-lg">${(product.price * product.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className='border-2 border-gray-300 rounded-md flex justify-between items-center w-1/5'>
                                        <button disabled={product.quantity === 1 && true} className={`px-4 py-4 border-r-2 border-gray-300 ${product.quantity === 1 ? 'cursor-not-allowed' : 'cursor-pointer'} hover:text-red-700`} onClick={() => handleQuantity("-1", product._id)}>
                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                        </button>
                                        <p className="text-base font-semibold">{product.quantity}</p>
                                        <button className="px-4 py-4 border-l-2 border-gray-300 hover:text-green-700 cursor-pointer" onClick={() => handleQuantity("+1", product._id)}>
                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                        </button>
                                    </div>
                                </li>)
                            }
                        </ul>
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
                                <Link to="/" className="w-full inline-flex items-center justify-center gap-1.5 bg-orange-400 hover:bg-orange-500 duration-300 text-white px-5 py-2.5 rounded font-semibold text-base mt-8 text-center">PROCEED TO CHECKOUT <IoWalletOutline /></Link>
                            </div>
                        </div>
                    </div>
                }
            </section>
        </section>
    );
};

export default Cart;