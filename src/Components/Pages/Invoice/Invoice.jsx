import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { ScaleLoader } from "react-spinners";
import useMyAccount from "../../../Hooks/useMyAccount";
import logo from '../../Images/brandLogo2.png';
import { FaFileDownload } from "react-icons/fa";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import './Invoice.css';

const Invoice = () => {
    const { id } = useParams();
    const [account, , isPending, isError] = useMyAccount();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState({});


    // Load Order Data For Invoice.
    useEffect(() => {
        axiosSecure.get(`/order/invoice?email=${account?.email}&id=${id}`)
            .then(res => {
                // console.log(res.data);
                setOrder(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                // setLoading(false);
            })
    }, [id, account?.email]);


    return (
        <section className="bg-white py-16 print:py-0">
            <Helmet>
                <title>G-Shop | Invoice</title>
            </Helmet>
            <section className="max-w-screen-2xl mx-auto px-6 print:px-0 font-inter text-[#151515]">
                {loading ?
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
                    <div className="space-y-8">
                        <div className="invoice-head bg-emerald-100 px-8 py-6 rounded-md">
                            <p className="font-semibold">
                                Thank you <span className="font-bold text-emerald-600">{order?.customerInfo?.customer_name}.</span> Your order have been received.
                            </p>
                        </div>
                        <section className="invoice">
                            <div className="bg-indigo-50 print:bg-transparent p-8 rounded-t-xl">
                                <div className="flex flex-col md:flex-row print:flex-row justify-between items-start md:items-center gap-2 md:gap-6 border-b border-gray-50 pb-2 md:pb-4">
                                    <div>
                                        <h1 className="uppercase text-2xl font-bold">Invoice</h1>
                                        {order.status === "Pending" && <p className="leading-9 text-gray-800">Status: <span className="text-orange-500 uppercase text-sm font-semibold">{order.status}</span></p>}
                                        {order.status === "Processing" && <p className="leading-9 text-gray-800">Status: <span className="text-indigo-500 uppercase text-sm font-semibold">{order.status}</span></p>}
                                        {order.status === "on-the-way" && <p className="leading-9 text-gray-800">Status: <span className="text-purple-500 uppercase text-sm font-semibold">{order.status}</span></p>}
                                        {order.status === "Delivered" && <p className="leading-9 text-gray-800">Status: <span className="text-emerald-500 uppercase text-sm font-semibold">{order.status}</span></p>}
                                        {order.status === "Cancel" && <p className="leading-9 text-gray-800">Status: <span className="text-red-500 uppercase text-sm font-semibold">{order.status}</span></p>}
                                    </div>
                                    <div>
                                        <img className="w-14 md:w-26 h-6 md:h-10" src={logo} alt="" />
                                        <p className="leading-9 text-sm text-gray-700">{order.sbAddress.city}, {order.sbAddress.region}, Bangladesh.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between items-start gap-2 md:gap-6 pt-2 md:pt-4">
                                    <div className="text-sm text-gray-500">
                                        <h4 className="uppercase text-gray-600 text-sm font-bold leading-7">Date</h4>
                                        <p>{new Date(order.createdAt).toLocaleString("en-BD", {
                                            month: "long",
                                            day: "2-digit",
                                            year: "numeric"
                                        })}</p>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        <h4 className="uppercase text-gray-600 text-sm font-bold leading-7">Invoice No</h4>
                                        <p>{order.invoice}</p>
                                    </div>
                                    <div className="text-start md:text-end text-sm text-gray-500">
                                        <h4 className="uppercase text-gray-600 text-sm font-bold leading-7">Invoice To</h4>
                                        <p>{order.sbAddress.fullName}</p>
                                        <p>{order.customerInfo.customer_email}, {order.sbAddress.phoneNumber}</p>
                                        <p>{order.sbAddress.address}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="px-8 my-10">
                                <div className="-my-2 overflow-x-auto">
                                    <table className="table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr className="text-xs bg-gray-100">
                                                <th scope="col" className="font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-left">Sr.</th>
                                                <th scope="col" className="font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-left">Product Name</th>
                                                <th scope="col" className="font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center">Quantity</th>
                                                <th scope="col" className="font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center">Item Price</th>
                                                <th scope="col" className="font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-right">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-100 text-sm">
                                            {order.cart.map((item, id) => <tr key={id}>
                                                <th className="px-6 py-1 whitespace-nowrap font-normal text-gray-500 text-left">{id + 1}</th>
                                                <td className="px-6 py-1 whitespace-nowrap font-normal text-gray-500">{item.title}</td>
                                                <td className="px-6 py-1 whitespace-nowrap font-bold text-center">{item.quantity}</td>
                                                <td className="px-6 py-1 whitespace-nowrap font-bold text-center font-DejaVu">${item.price.toFixed(2)}</td>
                                                <td className="px-6 py-1 whitespace-nowrap text-right font-bold font-DejaVu k-grid text-red-500">${(item.price * item.quantity).toFixed(2)}</td>
                                            </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="border-t border-b border-gray-100 p-10 bg-emerald-50 print:bg-transparent print:border-0">
                                <div className="flex lg:flex-row md:flex-row flex-col justify-between print:grid print:grid-cols-2 pt-4">
                                    <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col sm:flex-wrap">
                                        <span className="mb-1 font-bold text-sm uppercase text-gray-600 block">Payment Method</span>
                                        <span className="text-sm text-gray-500 font-semibold block">{order.paymentMethod}</span>
                                    </div>
                                    <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col sm:flex-wrap">
                                        <span className="mb-1 font-bold text-sm uppercase text-gray-600 block">Shipping Cost</span>
                                        <span className="text-sm text-gray-500 font-semibold block">${order.shippingCost.toFixed(2)}</span>
                                    </div>
                                    <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col sm:flex-wrap">
                                        <span className="mb-1 font-bold text-sm uppercase text-gray-600 block">Discount</span>
                                        <span className="text-sm text-gray-500 font-semibold block">${order.discount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-wrap">
                                        <span className="mb-1 font-bold text-sm uppercase text-gray-600 block">Total Amount</span>
                                        <span className="text-2xl font-bold text-red-500 block">${order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="invoice-btn bg-white p-8 rounded-b-xl shadow-sm">
                            <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col justify-between invoice-btn">
                                {/* <a download="Invoice" href="blob:https://kachabazar-store-nine.vercel.app/93ec6c75-2e2b-4a30-8cd5-0aa267ed07c0"> */}
                                <button className="mb-3 sm:mb-0 md:mb-0 lg:mb-0 flex items-center justify-center bg-emerald-500 text-white transition-all font-semibold h-10 py-2 px-5 rounded-md">
                                    Download Invoice <FaFileDownload className="ms-3 text-lg" />
                                </button>
                                {/* </a> */}
                                <button onClick={() => window.print()} className="cursor-pointer mb-3 sm:mb-0 md:mb-0 lg:mb-0 flex items-center justify-center bg-emerald-500 text-white transition-all font-semibold h-10 py-2 px-5 rounded-md">
                                    Print Invoice <MdOutlineLocalPrintshop className="ms-3 text-lg" />
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </section>
        </section>
    );
};

export default Invoice;