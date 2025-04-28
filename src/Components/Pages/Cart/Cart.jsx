import { useContext, useState } from "react";
import useCart from "../../../Hooks/useCart";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { ScaleLoader } from "react-spinners";
import { Link } from "react-router";
import { RiShoppingBasketLine } from "react-icons/ri";
import { IoWalletOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";



const Cart = () => {
    const [fab, setFab] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const [cart, refetch, isPending, isError] = useCart();
    const axiosSecure = useAxiosSecure();


    // Check if all products are selected
    const isAllSelected = selectedProducts.length === cart?.cart?.length;

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

    // handle Fab.
    const handleFab = () => {
        setFab(!fab);
    };

    // Handle select all checkbox
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedProducts(cart?.cart?.map(product => product._id));
        } else {
            setSelectedProducts([]);
        }
    };

    // Handle single product checkbox
    const handleSelectProduct = (e, productId) => {
        if (e.target.checked) {
            setSelectedProducts(prev => [...prev, productId]);
        } else {
            setSelectedProducts(prev => prev.filter(id => id !== productId));
        }
    };

    // Handle Product Delete.
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Item(s) will be removed from cart",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove"
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                const email = user.email;

                // Fetch Delete Api.
                axiosSecure.delete(`/carts?email=${email}&id=${id}`)
                    .then(res => {
                        toast.success("Product Remove From Cart", { position: "top-center", autoClose: 2500 });
                        refetch();
                        setLoading(false);
                        // Swal.fire({
                        //     title: "Deleted!",
                        //     text: "Your file has been deleted.",
                        //     icon: "success"
                        // });
                    })
                    .catch(err => {
                        toast.error(err.message, { position: "top-center", autoClose: 2500 });
                        setLoading(false);
                    })
            }
        });
    };


    return (
        <section className="bg-gray-300 py-10">
            <Helmet>
                <title>G-Shop | Cart</title>
            </Helmet>
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
                                <input
                                    type="checkbox"
                                    checked={isAllSelected}
                                    onChange={handleSelectAll}
                                    name="all" id="all"
                                    className="appearance-none w-4 h-4 bg-white checked:bg-green-500 border-2 border-gray-300 rounded cursor-pointer"
                                />
                                Select All ({cart.cartTotalItem || 0} Item's)
                            </li>
                            {
                                cart?.cart?.map(product => <li
                                    key={product._id}
                                    className="flex justify-between items-center gap-6 text-black bg-white px-4 py-6"
                                >
                                    <div className="flex justify-start items-center gap-6 w-3/6">
                                        <input
                                            type="checkbox"
                                            checked={selectedProducts.includes(product._id)}
                                            onChange={(e) => handleSelectProduct(e, product._id)}
                                            name={product.title} id={product._id}
                                            className="appearance-none w-4 h-4 bg-white checked:bg-green-500 border-2 border-gray-300 rounded cursor-pointer" />
                                        <img src={product.image} alt="" className="w-14 h-14 rounded-full" />
                                        <div>
                                            <h3 className="font-medium text-xl">{product.title}</h3>
                                            <p className="text-sm font-semibold leading-8">Item Price: ${product.price.toFixed(2)}</p>
                                            <p className="font-bold text-lg">${(product.price * product.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-start items-center gap-6 w-3/6">
                                        <div className='border-2 border-gray-300 rounded-md flex justify-between items-center w-3/6'>
                                            <button disabled={product.quantity === 1 && true} className={`px-4 py-4 border-r-2 border-gray-300 ${product.quantity === 1 ? 'cursor-not-allowed' : 'cursor-pointer'} hover:text-red-700`} onClick={() => handleQuantity("-1", product._id)}>
                                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                            </button>
                                            <p className="text-base font-semibold">{product.quantity}</p>
                                            <button className="px-4 py-4 border-l-2 border-gray-300 hover:text-green-700 cursor-pointer" onClick={() => handleQuantity("+1", product._id)}>
                                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                            </button>
                                        </div>
                                        <div className="inline-flex justify-end items-center gap-4 text-2xl w-3/6">
                                            {fab ?
                                                <button onClick={handleFab} className="outline-0 cursor-pointer text-red-500"><FaHeart /></button>
                                                :
                                                <button onClick={handleFab} className="outline-0 cursor-pointer text-gray-500 hover:text-red-500 duration-300"><FaRegHeart /></button>
                                            }
                                            <button onClick={() => handleDelete(product._id)} className="outline-0 cursor-pointer text-gray-500 hover:text-red-500 duration-300"><RiDeleteBin5Line /></button>
                                        </div>
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