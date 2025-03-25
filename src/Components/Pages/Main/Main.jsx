import { Outlet } from "react-router";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";

const Main = () => {
    return (
        <section className="">
            <Header />
            <Outlet />
            <Footer />
        </section>
    );
};

export default Main;