import { Outlet } from "react-router";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import InfoNav from "../Shared/InfoNav/InfoNav";

const Main = () => {
    return (
        <section className="">
            <InfoNav />
            <Header />
            <Outlet />
            <Footer />
        </section>
    );
};

export default Main;