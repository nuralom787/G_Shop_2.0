import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router";
import { AuthContext } from "../../../../Provider/AuthProvider";

const MyAccount = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <section>
            <Helmet>
                <title>G-Shop | My Account</title>
            </Helmet>
            <div>
                <h1>My Account</h1>
            </div>
        </section>
    );
};

export default MyAccount;