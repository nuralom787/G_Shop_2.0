import { Outlet } from "react-router";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import InfoNav from "../Shared/InfoNav/InfoNav";
import Advertisement from "../HomePages/Advertisement/Advertisement";

const Main = () => {
    return (
        <section className="">
            <InfoNav />
            <Header />
            <Outlet />
            <Advertisement />
            <Footer />
        </section>
    );
};

export default Main;