import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import useMyAccount from "../../../../Hooks/useMyAccount";
import { LuMapPin } from "react-icons/lu";


const MyAccount = () => {
    const [account] = useMyAccount();


    return (
        <section>
            <Helmet>
                <title>G-Shop | My Account</title>
            </Helmet>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-3 font-inter">
                <div className="col-span-1 md:col-span-1 bg-white p-4 rounded">
                    <h3 className="mb-4 font-semibold text-[#151515] text-lg">
                        Personal Profile
                        <span className="font-semibold text-sm text-cyan-600 ms-2 ps-2 border-s-2 border-s-gray-400"><Link to="/">EDIT</Link></span>
                    </h3>
                    <p>{account?.displayName}</p>
                    <p>{account?.email?.split('@')[0].slice(0, 2) + '*'.repeat(account?.email?.split('@')[0].length - 2) + '@' + account?.email?.split('@')[1]}</p>
                    <p>{account?.phoneNumber}</p>
                </div>
                <div className="col-span-1 md:col-span-2 bg-white p-4 rounded">
                    <h3 className="mb-4 font-semibold text-[#151515] text-lg">
                        Address Book
                        <span className="font-semibold text-sm text-cyan-600 ms-2 ps-2 border-s-2 border-s-gray-400"><Link to="/">ADD</Link></span>
                    </h3>
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
                </div>
            </section>
        </section>
    );
};

export default MyAccount;