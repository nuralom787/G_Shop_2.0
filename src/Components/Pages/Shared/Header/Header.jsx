import { FiShoppingCart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import logo from '../../../Images/logo.jpg';
import { Link, NavLink, useNavigate } from "react-router";
import useCategories from "../../../../Hooks/useCategories";
import useCart from "../../../../Hooks/useCart";
import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { useForm } from "react-hook-form";


const Header = () => {
    const { user } = useContext(AuthContext);
    const [categories] = useCategories();
    const [cart] = useCart();
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();


    const onSubmit = (data) => {
        if (data.search === "") {
            navigate('/');
        }
        else {
            navigate(`/search?search=${encodeURIComponent(data.search)}`);
        }
        reset();
    };


    // Set User Name First Letter as there image if image is null.
    const getInitial = () => {
        return user?.email ? user?.email.charAt(0).toUpperCase() : '?';
    };

    return (
        <section className='sticky top-0 z-20'>
            {/* Header */}
            <div className="bg-[#63e075]">
                <div className="max-w-screen-2xl mx-auto px-6 text-[#151515] py-4 grid grid-cols-10 gap-10">
                    <img className="w-16 col-span-2" src={logo} alt="" />
                    <form onSubmit={handleSubmit(onSubmit)} className="col-span-6 w-full bg-white rounded-md inline-flex justify-between items-center">
                        <label htmlFor="search" className="grow">
                            <input
                                {...register("search")}
                                className="w-full grow px-6 py-4 rounded-md outline-0 bg-white text-[#151515] font-semibold"
                                type="search"
                                placeholder="Search for any products..."
                            />
                        </label>
                        <button type="submit" className="px-6 py-4 cursor-pointer">
                            <svg stroke="currentColor" fill="#151515" strokeWidth="0" viewBox="0 0 512 512" height="1.5rem" width="1.5rem" xmlns="http://www.w3.org/2000/svg">
                                <path fill="none" strokeMiterlimit="10" strokeWidth="32" d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"></path>
                                <path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M338.29 338.29L448 448"></path>
                            </svg>
                        </button>
                    </form>
                    <ul className="col-span-2 flex justify-end items-center gap-10 text-white text-3xl">
                        <li>
                            <Link to="/user/cart" className="relative">
                                <FiShoppingCart className="text-4xl" />
                                <p className="absolute -top-2 -right-2 inline-flex items-center justify-center bg-red-600 text-white text-sm p-3 h-5 w-5 rounded-full">
                                    {cart?.cartTotalQuantity || 0}
                                </p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/user/my-account">
                                {user?.email ?
                                    <div>
                                        {user?.photoURL ?
                                            (<img
                                                src={user.photoURL}
                                                alt={user.displayName}
                                                className="w-11 h-11 rounded-full object-cover"
                                            />)
                                            :
                                            <div className="w-11 h-11 rounded-full bg-gray-300 flex items-center justify-center text-black text-xl font-bold">
                                                {getInitial(name)}
                                            </div>
                                        }
                                    </div>
                                    :
                                    <FaRegUser className="text-3xl" />
                                }
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="bg-white">
                <div className="max-w-screen-2xl mx-auto px-6 text-[#151515] py-4 flex justify-between items-center">
                    <div className="space-x-6 font-semibold font-poppins text-sm">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="hover:text-[#63e075] cursor-pointer inline-flex items-center gap-2">
                                Category
                                <IoIosArrowDown />
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu flex-nowrap bg-white rounded-box z-1 min-w-max max-h-screen overflow-y-auto p-2 pt-3 mt-2 shadow-sm">
                                {categories?.categories?.map(category => <li key={category._id}>
                                    <NavLink to={'/'} className="inline-flex justify-between items-center gap-4 my-1 hover:text-[#63e075]">
                                        <div className="inline-flex items-center gap-4 hover:text-[#63e075]">
                                            <img className="w-5 h-5 rounded-full" src={category.icon} alt="" />
                                            <span className="text-sm font-poppins font-medium">{category.parent}</span>
                                        </div>
                                        <IoIosArrowForward className="text-end" />
                                    </NavLink>
                                </li>)
                                }
                            </ul>
                        </div>
                        <NavLink className="hover:text-[#63e075] duration-300" to="/">About Us</NavLink>
                        <NavLink className="hover:text-[#63e075] duration-300" to="/">Contact Us</NavLink>
                        <NavLink className="hover:text-[#63e075] duration-300" to="/">Trams & Conditions</NavLink>
                        <NavLink className="text-red-600 bg-red-200 relative px-3 py-1 rounded" to="/">
                            Offers
                            <div className="absolute -top-1 -right-1 inline-grid *:[grid-area:1/1]">
                                <div className="status h-2.5 w-2.5 bg-red-600 animate-ping"></div>
                                <div className="status h-2.5 w-2.5 bg-red-600"></div>
                            </div>
                        </NavLink>
                    </div>
                    <div className="space-x-6 font-semibold font-poppins text-sm">
                        <NavLink className="hover:text-[#63e075] duration-300" to="/">Privacy Policy</NavLink>
                        <NavLink className="hover:text-[#63e075] duration-300" to="/">Refound Policy</NavLink>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Header;