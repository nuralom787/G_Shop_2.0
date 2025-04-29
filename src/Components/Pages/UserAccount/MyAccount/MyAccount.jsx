import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router";

const MyAccount = () => {
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