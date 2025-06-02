import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";

const Invoice = () => {
    const { id } = useParams();

    return (
        <section className="bg-white py-10">
            <Helmet>
                <title>G-Shop | Invoice</title>
            </Helmet>
            <section className="max-w-screen-2xl mx-auto px-6 font-inter">
                <h1>Your Invoice Id is: {id}</h1>
            </section>
        </section>
    );
};

export default Invoice;