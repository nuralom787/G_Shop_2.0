import { useContext, useState } from 'react';
import Drawer from 'react-modern-drawer'
import { Link } from 'react-router';
import { AuthContext } from '../../../Provider/AuthProvider';
import useMyAccount from '../../../Hooks/useMyAccount';
import useCart from '../../../Hooks/useCart';
import brandLogo from '../../Images/brandLogo1.png';
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from 'react-icons/fi';
import useCategories from '../../../Hooks/useCategories';
import { ScaleLoader } from 'react-spinners';


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
        <section className='block lg:hidden w-full fixed bottom-0 text-white bg-[#63e075] z-50'>
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
                className='bla bla bla'
            >
                <div className="bg-[#63e075] flex justify-between items-center gap-4 p-3.5">
                    <img className='w-16 h-6' src={brandLogo} alt="" />
                    <button onClick={handleMenu} className="bg-red-600 text-white p-1.5 rounded-full">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
                        </svg>
                    </button>
                </div>
                <div>
                    {/* <h2 className='cat-title'>All Catagories</h2> */}
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
                        <div className="list-offCanvas-categories">
                            {
                                // categories?.categories?.map((category, id) => <div key={id} className="join join-vertical bg-base-100">
                                //     <div className="collapse collapse-arrow join-item border-base-300 border">
                                //         <input type="radio" name="my-accordion-4" />
                                //         <div className="collapse-title font-semibold">{category.parent}</div>
                                //         {
                                //             category.children.map((item, id) => <div key={id} className="collapse-content text-sm">
                                //                 {item}
                                //             </div>)
                                //         }
                                //     </div>
                                // </div>)
                            }
                        </div>
                    }
                    {/* <div className='list-canvas-more'>
                        <h2>More Facilities</h2>
                        <div className='list-canvas-body'>
                            <NavLink to="/offers">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="flex-shrink-0 h-4 w-4" aria-hidden="true" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M320 264l-89.6 112-38.4-44.88"></path><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M80 176a16 16 0 00-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 00-16-16zm80 0v-32a96 96 0 0196-96h0a96 96 0 0196 96v32"></path>
                                </svg>
                                <p>OFFER</p>
                            </NavLink>
                            <NavLink to="/">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 h-4 w-4" aria-hidden="true" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>
                                </svg>
                                <p>FAQ</p>
                            </NavLink>
                            <NavLink to="/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                                </svg>
                                <p>NOTIFICATIONS</p>
                            </NavLink>
                            <NavLink to="/">
                                <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" className="flex-shrink-0 h-4 w-4" aria-hidden="true" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                                <p>ABOUT</p>
                            </NavLink>
                            <div style={{ textAlign: "center", padding: "1rem 0" }}>
                                <small>Copyright 2022 <span style={{ color: "#63e075" }}>@Nur Dev</span>, All rights reserved.</small>
                            </div>
                        </div>
                    </div> */}
                </div>
            </Drawer>
        </section>
    );
};

export default MobileTabletFooter;