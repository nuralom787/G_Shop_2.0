import { FiShoppingCart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import logo from '../../../Images/logo.jpg';
import { NavLink } from "react-router";


const Header = () => {
    return (
        <section className='sticky top-0 z-20'>
            {/* Header */}
            <div className="bg-[#00a63e]">
                <div className="max-w-screen-2xl mx-auto px-6 text-[#151515] py-4 flex justify-between items-center gap-10">
                    <img className="w-16" src={logo} alt="" />
                    <form className="w-full bg-white rounded-md inline-flex justify-between items-center">
                        <label htmlFor="search" className="grow">
                            <input
                                className="w-full grow px-6 py-4 rounded-md outline-0 bg-white text-[#151515] font-semibold"
                                type="search"
                                name="search"
                                id="search"
                                placeholder="Search for any products..."
                            />
                        </label>
                        <button
                            aria-label="Search"
                            type="submit"
                            className="px-6 py-4 cursor-pointer">
                            <svg stroke="currentColor" fill="#151515" strokeWidth="0" viewBox="0 0 512 512" height="1.5rem" width="1.5rem" xmlns="http://www.w3.org/2000/svg">
                                <path fill="none" strokeMiterlimit="10" strokeWidth="32" d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"></path>
                                <path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M338.29 338.29L448 448"></path>
                            </svg>
                        </button>
                    </form>
                    <ul className="flex items-center gap-10 text-white text-3xl">
                        <li className="relative cursor-pointer">
                            <FiShoppingCart />
                            <p className="absolute -top-2 -right-2 inline-flex items-center justify-center bg-red-600 text-white text-sm p-3 h-5 w-5 rounded-full">
                                16
                            </p>
                        </li>
                        <li className="cursor-pointer">
                            <FaRegUser />
                        </li>
                    </ul>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="max-w-screen-2xl mx-auto px-6 bg-white text-[#151515] py-4 flex justify-between items-center">
                <div className="space-x-6 font-semibold font-poppins text-sm">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="hover:text-[#00a63e] cursor-pointer inline-flex items-center gap-2">
                            Category
                            <IoIosArrowDown />
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-1 w-full p-2 shadow-sm">
                            <li><a>Item 1</a></li>
                            <li><a>Item 2</a></li>
                        </ul>
                    </div>
                    <NavLink className="hover:text-[#00a63e] duration-300" to="/">About Us</NavLink>
                    <NavLink className="hover:text-[#00a63e] duration-300" to="/">Contact Us</NavLink>
                    <NavLink className="hover:text-[#00a63e] duration-300" to="/">Trams & Conditions</NavLink>
                </div>
                <div className="space-x-6 font-semibold font-poppins text-sm">
                    <NavLink className="hover:text-[#00a63e] duration-300" to="/">Privacy Policy</NavLink>
                    <NavLink className="hover:text-[#00a63e] duration-300" to="/">Refound Policy</NavLink>
                </div>
            </div>
        </section>
    );
};

export default Header;