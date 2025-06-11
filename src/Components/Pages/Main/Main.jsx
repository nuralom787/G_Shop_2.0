import { Outlet } from "react-router";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import InfoNav from "../Shared/InfoNav/InfoNav";
import Advertisement from "../HomePages/Advertisement/Advertisement";
import MobileTabletFooter from "../MobileTabletFooter/MobileTabletFooter";

const Main = () => {
    return (
        <section className="">
            <InfoNav />
            <Header />
            <Outlet />
            <Advertisement />
            <Footer />
            <MobileTabletFooter />
        </section>
    );
};

export default Main;