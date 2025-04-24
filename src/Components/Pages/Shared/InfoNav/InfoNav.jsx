import { useContext } from "react";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { LuLock } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { Link } from "react-router";
import { toast } from "react-toastify";

const InfoNav = () => {
    const { user, LogoutUser } = useContext(AuthContext);


    // Handle Logout.
    const handleLogout = () => {
        LogoutUser()
            .then(res => {
                toast.success("User Logout Successfully!", {
                    position: "top-center",
                    autoClose: 2500
                })
            })
            .catch(err => {
                toast.error(err.message, {
                    position: "top-center",
                    autoClose: 2500
                })
            })
    };

    return (
        <section>
            <div className="max-w-screen-2xl mx-auto px-6 text-[#151515] py-2 flex justify-between items-center">
                <span className="inline-flex items-center gap-1 text-xs">
                    <MdOutlinePhoneInTalk /> We are available 24/7, Need help? <a href="tel:+880123456789" className="text-[#28A745] font-semibold hover:underline">+880 12345-6789</a>
                </span>
                <ul className="flex items-center gap-2 text-xs">
                    <li className="hover:text-[#28A745] font-poppins cursor-pointer duration-300">About Us</li>
                    <span>|</span>
                    <li className="hover:text-[#28A745] font-poppins cursor-pointer duration-300">Contact Us</li>
                    <span>|</span>
                    <li className="hover:text-[#28A745] font-poppins cursor-pointer duration-300">My Account</li>
                    <span>|</span>
                    {user?.email ?
                        <button onClick={handleLogout} className="hover:text-[#28A745] font-poppins cursor-pointer duration-300 inline-flex items-center gap-1">
                            <LuLock /> Logout
                        </button>
                        :
                        <Link to="/user/login" className="hover:text-[#28A745] font-poppins cursor-pointer duration-300 inline-flex items-center gap-1">
                            <FiUser /> Login
                        </Link>
                    }
                </ul>
            </div>
        </section>
    );
};

export default InfoNav;