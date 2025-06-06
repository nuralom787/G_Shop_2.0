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
                            <h3 className="font-semibold text-[#151515] text-lg">
                                Personal Profile
                                <span className="font-semibold text-sm text-cyan-600 ms-2 ps-2 border-s-2 border-s-gray-400"><Link to="/user/profile">EDIT</Link></span>
                            </h3>
                            <div className="divider before:bg-black after:bg-black mt-1.5 mb-3.5 h-[2px]"></div>
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
                            <h3 className="font-semibold text-[#151515] text-lg">
                                Address Book
                                <span className="font-semibold text-sm text-cyan-600 ms-2 ps-2 border-s-2 border-s-gray-400">
                                    <Link to="/user/addresses">ADD</Link>
                                </span>
                            </h3>
                            <div className="divider before:bg-black after:bg-black mt-1.5 mb-3.5 h-[2px]"></div>
                            {account?.addresses?.length ?
                                <div>
                                    {
                                        account.addresses.slice(0, 1).map(address => <div key={address._id} className="flex flex-col md:flex-row gap-5 md:gap-0">
                                            <div className="grow space-y-1">
                                                <p className="text-sm text-gray-400">DEFAULT SHIPPING ADDRESS</p>
                                                <h3 className="font-semibold text-base">{address.fullName}</h3>
                                                <p className="text-sm">
                                                    {address.address}
                                                    <span className="text-sm block">{address.region}, {address.city}, {address.zone}.</span>
                                                </p>
                                                <span>(+88) {address.phoneNumber}</span>
                                            </div>
                                            <div className="md:ps-3 md:border-s border-s-gray-300 grow space-y-1">
                                                <p className="text-sm text-gray-400">DEFAULT BILLING ADDRESS</p>
                                                <h3 className="font-semibold text-base">{address.fullName}</h3>
                                                <p className="text-sm">
                                                    {address.address}
                                                    <span className="text-sm block">{address.region}, {address.city}, {address.zone}.</span>
                                                </p>
                                                <span>(+88) {address.phoneNumber}</span>
                                            </div>
                                        </div>)
                                    }
                                </div>
                                :
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
                            }
                        </div>
                    }
                </div>
            </section>
            <section className="bg-white p-4 lg:p-8 rounded mt-3">
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
                        {!orders?.orders?.length ?
                            <div className="flex justify-center items-center p-20">
                                <p className="font-medium text-sm text-gray-400">No Orders Found!!</p>
                            </div>
                            :
                            <div>
                                <div className="overflow-x-auto rounded-box border border-gray-200">
                                    <table className="table whitespace-nowrap text-xs dark:bg-white table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
                                        <thead className="dark:text-black bg-gray-200">
                                            <tr>
                                                <th className="uppercase text-center">Sl</th>
                                                <th className="uppercase text-center">Invoice</th>
                                                <th className="uppercase text-center">Order Time</th>
                                                <th className="uppercase text-center">Method</th>
                                                <th className="uppercase text-center">Status</th>
                                                <th className="uppercase text-center">Total</th>
                                                <th className="uppercase text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="font-inter divide-y divide-gray-100">
                                            {
                                                orders.orders.map((order, idx) => <tr key={order._id}>
                                                    <td className="font-bold text-center">{idx + 1}</td>
                                                    <td className="font-medium text-center">{order.invoice}</td>
                                                    <td className="font-medium text-center leading-7">
                                                        {new Date(order.createdAt).toLocaleString("en-BD", {
                                                            month: "long",
                                                            day: "2-digit",
                                                            year: "numeric"
                                                        })}  {new Date(order.createdAt).toLocaleString("en-BD", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            hour12: true
                                                        })}
                                                    </td>
                                                    <td className="text-center font-medium">{order.paymentMethod}</td>
                                                    <td className="text-center font-medium">
                                                        {order.status === "Pending" && <span className="text-orange-600 font-semibold">Pending</span>}
                                                        {order.status === "Processing" && <span className="text-indigo-600 font-semibold">Processing</span>}
                                                        {order.status === "Delivered" && <span className="text-emerald-600 font-semibold">Delivered</span>}
                                                        {order.status === "Cancel" && <span className="text-red-600 font-semibold">Cancel</span>}
                                                    </td>
                                                    <td className="text-center font-bold">${order.total.toFixed(2)}</td>
                                                    <td className="text-center">
                                                        <Link className="font-semibold text-xs bg-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-white duration-500 px-3.5 py-1.5 rounded-full" to={`/order/invoice/${order._id}`}>Details</Link>
                                                    </td>
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