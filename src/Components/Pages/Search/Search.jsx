import { useLocation } from "react-router";

const Search = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);

    const category = decodeURIComponent(queryParams.get('category'));
    const _id = decodeURIComponent(queryParams.get('_id'));
    const item = decodeURIComponent(queryParams.get('item'));


    return (
        <section className="bg-gray-300 py-10">
            <section className="max-w-screen-2xl mx-auto px-6 font-poppins">
                <h1 className="text-black">{category}</h1>
                <p className="text-black">{_id}</p>
                <p className="text-black">{item}</p>
            </section>
        </section>
    );
};

export default Search;