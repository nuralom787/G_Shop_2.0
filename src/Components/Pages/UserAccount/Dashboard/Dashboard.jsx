import { NavLink, Outlet } from "react-router";
import './Dashboard.css';
import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";

const Dashboard = () => {
    const { LogoutUser } = useContext(AuthContext);


    return (
        <section className="bg-gray-300 py-10">
            <section className="max-w-screen-2xl mx-auto px-6 font-poppins">
                <div className="flex items-start gap-8 text-[#151515]">
                    {/* Navigation Panel. */}
                    <div className="bg-white w-1/4 p-6 rounded-md sticky top-36 navigation font-inter">
                        <NavLink to="/user/my-account" className="font-semibold text-lg">My Account</NavLink>
                        <ul className="ms-5 my-2">
                            <li className="text-sm text-gray-500 leading-7 hover:text-green-600 w-fit">
                                <NavLink to="/user/my-account/profile">My Profile</NavLink>
                            </li>
                            <li className="text-sm text-gray-500 leading-7 hover:text-green-600 w-fit">
                                <NavLink to="/user/my-account/addresses">Address Book</NavLink>
                            </li>
                        </ul>
                        <NavLink to="/user/orders" className="font-semibold text-lg">My Orders</NavLink>
                        <NavLink to="/user/change-password" className="font-semibold text-lg block w-fit my-1.5">Change Password</NavLink>
                        <button onClick={LogoutUser} className="font-semibold text-lg cursor-pointer">Logout</button>
                    </div>

                    {/* Outlet */}
                    <div className="bg-white w-3/4 p-6 rounded-md">
                        <Outlet />
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Dashboard;