import React from 'react';
import { Helmet } from 'react-helmet-async';
import useMyAccount from '../../../../Hooks/useMyAccount';
import { FiMapPin } from "react-icons/fi";
import { Link } from 'react-router';


const Addresses = () => {
    const [account] = useMyAccount();


    return (
        <section className="bg-white p-4 rounded font-inter">
            <Helmet>
                <title>G-Shop | Address Book</title>
            </Helmet>
            <h3 className="font-semibold text-[#151515] text-lg">Address Book</h3>
            <div className='divider before:bg-black after:bg-black my-1.5'></div>
            <div>
                {!account?.addresses?.length ?
                    <div className='font-inter'>
                        <h3 className='p-6 text-xl text-gray-500'>Save your shipping & billing address here.</h3>
                        <FiMapPin className='m-6 text-3xl text-gray-400' />
                        <div className='py-4 mx-4'>
                            <Link to="/user/addresses/add-address" className='block w-fit duration-300 uppercase bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5 rounded font-semibold text-sm'>+ Add New Address</Link>
                        </div>
                    </div>
                    :
                    <div className="overflow-x-auto">
                        <table className="table dark:bg-white">
                            <thead className="dark:text-black bg-gray-200">
                                <tr>
                                    <th>Full Name</th>
                                    <th>Address</th>
                                    <th>Post Code</th>
                                    <th>Phone Number</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {
                                    account.addresses.map((address, idx) => <tr key={idx}>
                                        <td>{address.fullName}</td>
                                        <td>{address.address}</td>
                                        <td>{address.region}, {address.city}, {address.zone}</td>
                                        <td>{address.phoneNumber}</td>
                                        <td><Link to="/" className='text-cyan-500 font-semibold'>EDIT</Link></td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                        <div className='py-6 mx-4 mt-2'>
                            <Link to="/user/addresses/add-address" className='block w-fit duration-300 uppercase bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5 rounded font-semibold text-sm'>+ Add New Address</Link>
                        </div>
                    </div>
                }
            </div>
        </section>
    );
};

export default Addresses;