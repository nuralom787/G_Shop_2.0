import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import useMyAccount from "../../../../Hooks/useMyAccount";
import { LuMapPin } from "react-icons/lu";
import useOrders from "../../../../Hooks/useOrders";
import { ScaleLoader } from "react-spinners";


const MyAccount = () => {
    const [account, , acIsPending, acIsError] = useMyAccount();
    const [orders, , odIsPending, odIsError] = useOrders();


    return (
        <section>
            <Helmet>
                <title>G-Shop | My Account</title>
            </Helmet>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-3 font-inter">
                <div className="col-span-1 md:col-span-1 bg-white p-4 rounded">
                    {acIsPending || acIsError ?
                        <div className="flex justify-center items-center my-16">
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
                            <h3 className="mb-4 font-semibold text-[#151515] text-lg">
                                Personal Profile
                                <span className="font-semibold text-sm text-cyan-600 ms-2 ps-2 border-s-2 border-s-gray-400"><Link to="/user/profile">EDIT</Link></span>
                            </h3>
                            <p>{account?.displayName}</p>
                            <p>{account?.email?.split('@')[0].slice(0, 2) + '*'.repeat(account?.email?.split('@')[0].length - 2) + '@' + account?.email?.split('@')[1]}</p>
                            <p>{account?.phoneNumber}</p>
                        </div>
                    }
                </div>
                <div className="col-span-1 md:col-span-2 bg-white p-4 rounded">
                    {acIsPending || acIsError ?
                        <div className="flex justify-center items-center my-16">
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
                            <h3 className="mb-4 font-semibold text-[#151515] text-lg">
                                Address Book
                                <span className="font-semibold text-sm text-cyan-600 ms-2 ps-2 border-s-2 border-s-gray-400"><Link to="/user/addresses">ADD</Link></span>
                            </h3>
                            <div className="flex flex-col md:flex-row">
                                <div className="grow">
                                    <p className="text-sm font-light text-gray-400">Save your shipping address here.</p>
                                    <div className="my-4">
                                        <LuMapPin className="text-4xl text-gray-400" />
                                    </div>
                                </div>
                                <div className="ps-3 border-s border-s-gray-300 grow">
                                    <p className="text-sm font-light text-gray-400">Save your billing address here.</p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </section>
            <section className="bg-white p-4 rounded mt-3">
                <h3 className="mb-4 font-semibold text-[#151515] text-lg">Recent Orders</h3>
                {odIsPending || odIsError ?
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
                        {!orders.orders.length ?
                            <div className="flex justify-center items-center p-20">
                                <p className="font-medium text-sm text-gray-400">No Orders Found!!</p>
                            </div>
                            :
                            <div>
                                <div className="overflow-x-auto">
                                    <table className="table dark:bg-white">
                                        <thead className="dark:text-black bg-gray-200">
                                            <tr>
                                                <th>Sl</th>
                                                <th>Order#</th>
                                                <th>Placed od</th>
                                                <th className="text-center">Status</th>
                                                <th className="text-end">Total Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="">
                                            {
                                                orders.orders.slice(0, 3).map((order, idx) => <tr key={order._id}>
                                                    <td>{idx + 1}</td>
                                                    <td>{order._id.slice(0, 11).toUpperCase()}</td>
                                                    <td>{new Date(order.orderTime).toLocaleDateString()}</td>
                                                    <td className="text-center">{order.status}</td>
                                                    <td className="text-end">${order.grandTotal.toFixed(2)}/-</td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }
                    </div>
                }
            </section>
        </section>
    );
};

export default MyAccount;