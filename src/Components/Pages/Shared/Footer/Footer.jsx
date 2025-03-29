import logo from '../../../Images/brandLogo2.png';
import { FiTruck } from "react-icons/fi";
import { MdPhoneInTalk } from "react-icons/md";
import { FiCreditCard } from "react-icons/fi";
import { GoGift } from "react-icons/go";
import { NavLink } from 'react-router';


const Footer = () => {
    return (
        <section className='bg-white'>
            <div className='max-w-screen-2xl mx-auto px-6'>
                <div className='p-6'>
                    <ul className='flex justify-between items-center font-poppins text-[#151515] text-base font-semibold'>
                        <li className="inline-flex items-center gap-4">
                            <FiTruck className='text-[#63e075] text-xl' /> Free Shipping From €500.00
                        </li>
                        <li className="inline-flex items-center gap-4">
                            <MdPhoneInTalk className='text-[#63e075] text-xl' /> Support 24/7 At Anytime
                        </li>
                        <li className="inline-flex items-center gap-4">
                            <FiCreditCard className='text-[#63e075] text-xl' /> Secure Payment Totally Safe
                        </li>
                        <li className="inline-flex items-center gap-4">
                            <GoGift className='text-[#63e075] text-xl' /> Latest Offer Upto 20% Off
                        </li>
                    </ul>
                </div>
            </div>
            <div className="py-10 border-t-2 border-gray-300">
                <div className="max-w-screen-2xl mx-auto px-6">
                    <div className="font-poppins text-[#151515] grid grid-cols-2 md:grid-cols-4 gap-2">
                        <div>
                            <h2 className='text-base font-semibold mb-6'>Company</h2>
                            <ul>
                                <li>About Us</li>
                                <li>Contact Us</li>
                                <li>Career</li>
                                <li>Latest News</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className='text-base font-semibold mb-6'>Latest News</h2>
                            <ul>
                                <li>About Us</li>
                                <li>Contact Us</li>
                                <li>Career</li>
                                <li>Latest News</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className='text-base font-semibold mb-6'>My Account</h2>
                            <ul>
                                <li>About Us</li>
                                <li>Contact Us</li>
                                <li>Career</li>
                                <li>Latest News</li>
                            </ul>
                        </div>
                        <div>
                            <NavLink className="mb-3 block" to="/">
                                <img className='w-24' src={logo} alt="" />
                            </NavLink>
                            <p className='leading-7 text-sm font-light'>
                                987 Andre Plain Suite High Street 838, Lake Hestertown, USA.
                                <br />
                                <span>Tel: +880123456789</span>
                                <br />
                                <span>Email: support@gshop.com</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;