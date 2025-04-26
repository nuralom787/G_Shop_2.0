import { useContext } from "react";
import useCart from "../../../Hooks/useCart";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { ScaleLoader } from "react-spinners";

const Cart = () => {
    const { user } = useContext(AuthContext);
    const [cart, refetch, isPending, isError] = useCart();
    const axiosSecure = useAxiosSecure();

    // Handle Product Quantity.
    const handleQuantity = (e, id) => {
        const email = user?.email;
        const data = { email, id };

        if (e === "-1") {
            axiosSecure.patch('/carts/quantity?quantity=-1', data)
                .then(res => {
                    console.log(res.data);
                    refetch()
                })
                .catch(err => {
                    console.log(err.message);
                })
        }
        else {
            axiosSecure.patch('/carts/quantity?quantity=+1', data)
                .then(res => {
                    console.log(res.data);
                    refetch()
                })
                .catch(err => {
                    console.log(err.message);
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
                    <div>
                        <ul>
                            {
                                cart?.cart?.map(product => <li
                                    key={product._id}
                                    className="flex justify-start items-center gap-6 text-black"
                                >
                                    <img src={product.image} alt="" className="w-14 h-14 rounded-full" />
                                    <div>
                                        <h3>{product.title}</h3>
                                        <p>Item Price : ${product.price.toFixed(2)}</p>
                                        <p>${(product.price * product.quantity).toFixed(2)}</p>
                                    </div>
                                    <div className='border-2 border-gray-300 rounded-md flex justify-between items-center'>
                                        <button disabled={product.quantity === 1 && true} className={`px-4 py-4 border-r-2 border-gray-300 ${product.quantity === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => handleQuantity("-1", product._id)}>
                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                        </button>
                                        <p className="text-base font-semibold">{product.quantity}</p>
                                        <button className="px-4 py-4 border-l-2 border-gray-300 cursor-pointer" onClick={() => handleQuantity("+1", product._id)}>
                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                        </button>
                                    </div>
                                </li>)
                            }
                        </ul>
                    </div>
                }
            </section>
        </section>
    );
};

export default Cart;