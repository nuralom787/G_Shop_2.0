import { useContext, useState } from 'react';
import Drawer from 'react-modern-drawer'
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../../Provider/AuthProvider';
import useMyAccount from '../../../Hooks/useMyAccount';
import useCart from '../../../Hooks/useCart';
import brandLogo from '../../Images/brandLogo1.png';
import { ScaleLoader } from 'react-spinners';
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FaHome, FaRegUser } from "react-icons/fa";
import { FiGift, FiShoppingCart } from 'react-icons/fi';
import useCategories from '../../../Hooks/useCategories';
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaQuestion, FaExclamation } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";


const MobileTabletFooter = () => {
    const { user } = useContext(AuthContext);
    const [account] = useMyAccount();
    const [cart] = useCart();
    const [categories, , isPending, isError] = useCategories();
    const [menuOpen, setMenuOpen] = useState(false);


    // Set User Name First Letter as there image if image is null.
    const getInitial = () => {
        return user?.displayName ? user?.displayName.charAt(0).toUpperCase() : '?';
    };

    const handleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <section className='block lg:hidden w-full fixed bottom-0 text-white bg-[#63e075] z-50 font-inter'>
            <ul className='flex justify-between items-center gap-3 px-6 py-3.5 font-semibold text-center'>
                <li>
                    <button className="" onClick={handleMenu}>
                        <HiOutlineMenuAlt2 className=' text-3xl' />
                    </button>
                </li>
                <li>
                    <Link to="/">
                        <FaHome className="w-fit mx-auto text-3xl" />
                    </Link>
                </li>
                <li>
                    <Link to="/user/cart" className="w-fit relative">
                        <FiShoppingCart className="w-fit mx-auto text-3xl" />
                        <p className="absolute -top-2 -right-2 inline-flex items-center justify-center bg-red-600 text-white text-xs p-3 h-3 w-3 rounded-full">
                            {cart?.cartTotalQuantity || 0}
                        </p>
                    </Link>
                </li>
                <li>
                    {!user?.email ?
                        <Link to="/user/login">
                            <FaRegUser className="w-fit mx-auto text-3xl" />
                        </Link>
                        :
                        <Link to="/user/my-account">
                            {account?.photoURL ?
                                <img className='w-9 h-9 rounded-full' src={account?.photoURL} alt="" />
                                :
                                <div className="w-11 h-11 rounded-full bg-gray-300 flex items-center justify-center text-black text-xl font-bold">
                                    {getInitial(name)}
                                </div>
                            }
                        </Link>
                    }
                </li>
            </ul>

            {/* Menu Drawer */}
            <Drawer
                open={menuOpen}
                onClose={handleMenu}
                direction='left'
                size={"100%"}
                // className='bla bla bla'
                lockBackgroundScroll={true}
            >
                {/* Drawer Header */}
                <div className="bg-[#63e075] flex justify-between items-center gap-4 px-4 py-3.5">
                    <img className='w-28 h-9' src={brandLogo} alt="" />
                    <button onClick={handleMenu} className="bg-red-600 text-white p-1.5 rounded-full">
                        {/* <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
                        </svg> */}
                        <IoCloseSharp />
                    </button>
                </div>

                {/* Drawer Menu/Body */}
                <div className='overflow-y-auto max-h-screen'>
                    <div className='text-[#151515] bg-white shadow-sm p-4'>
                        <h1 className='text-xl font-bold'>All Categories</h1>
                    </div>
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
                        <div className="grid grid-cols-1 px-3.5 py-4 mb-4">
                            {
                                categories?.categories?.map((category, id) => <div key={id} className="join join-vertical bg-transparent">
                                    <div className="collapse collapse-plus join-item border-base-300 border-0 text-[#151515]">
                                        <input type="checkbox" name="my-accordion" />
                                        <div className="collapse-title font-semibold inline-flex items-center gap-3">
                                            <img className='h-5 w-5 rounded-full' src={category.icon} alt="" />
                                            <p>{category.parent}</p>
                                        </div>
                                        <div className="collapse-content text-sm">
                                            {
                                                category.children.map((item, id) => <Link
                                                    onClick={handleMenu}
                                                    to={`/search?category=${encodeURIComponent(category.parent)}&item=${encodeURIComponent(item)}`}
                                                    key={id}
                                                    className='block ms-6 py-1.5 font-medium text-sm'
                                                >
                                                    - {item}
                                                </Link>)
                                            }
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>
                    }
                    <div className='text-[#151515] mb-12'>
                        <div className='text-[#151515] bg-white shadow-sm p-4'>
                            <h1 className='text-xl font-bold'>Others Pages.</h1>
                        </div>
                        <div className='grid grid-cols-1 gap-3.5 px-8 py-4'>
                            <NavLink to="/" className="inline-flex items-center gap-2">
                                <FiGift className='text-xl' />
                                <p className='font-semibold text-lg'>OFFER</p>
                            </NavLink>
                            <NavLink to="/" className="inline-flex items-center gap-2">
                                <FaQuestion className='text-xl' />
                                <p className='font-semibold text-lg'>FAQ</p>
                            </NavLink>
                            <NavLink to="/" className="inline-flex items-center gap-2">
                                <IoMdNotificationsOutline className='text-xl' />
                                <p className='font-semibold text-lg'>NOTIFICATIONS</p>
                            </NavLink>
                            <NavLink to="/" className="inline-flex items-center gap-2">
                                <FaExclamation className='text-xl' />
                                <p className='font-semibold text-lg'>ABOUT</p>
                            </NavLink>
                            <div className='text-center py-4 text-sm font-semibold'>
                                <small>Copyright 2022 <span className='text-[#63e075]'>@Nur Dev</span>, All rights reserved.</small>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
        </section>
    );
};

export default MobileTabletFooter;