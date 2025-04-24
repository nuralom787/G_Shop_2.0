import { useEffect, useState } from "react";
import './Search.css';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from "react-router";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useCategories from "../../../Hooks/useCategories";
import { useLocation } from "react-router";
import useProducts from "../../../Hooks/useProducts";
import { ScaleLoader } from "react-spinners";
import { Helmet } from "react-helmet-async";
import noFound from '../../Images/notFound.svg';

const Search = () => {
    // Get Search Queries.
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);

    const searchText = decodeURIComponent(queryParams.get('search'));
    const category = decodeURIComponent(queryParams.get('category'));
    const _id = queryParams.get('_id');
    const item = queryParams.get('item');

    // ---------------------------------
    const [matchProduct, setMatchProduct] = useState([]);
    const [visibleCount, setVisibleCount] = useState(18);
    const [categories, , isPending, isError] = useCategories();
    const [products, , pPending] = useProducts();


    // Load Match Products.
    useEffect(() => {
        if (searchText) {
            const matchProducts = products?.products?.filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()))
            setMatchProduct(matchProducts);
        }
        if (category && _id) {
            const matchProducts = products?.products?.filter(product => product.parent === category);
            setMatchProduct(matchProducts);
        }
        if (category && item) {
            const matchProducts = products?.products?.filter(product => product.children === item);
            setMatchProduct(matchProducts);
        }
        window.scrollTo(0, 0);
        setVisibleCount(18);
    }, [searchText, products, category, _id, item]);


    // Sort Products.
    const sortData = (value) => {
        // console.log(value)
        if (value === "asc") {
            const sortProducts = [...matchProduct].sort((a, b) => a.price - b.price);
            setMatchProduct(sortProducts);
        } else {
            const sortProducts = [...matchProduct].sort((a, b) => b.price - a.price);
            setMatchProduct(sortProducts);
        }
    };


    // Load More Function.
    const loadMore = () => {
        setVisibleCount((prev) => prev + 18);
    };


    return (
        <section className="bg-gray-300 py-10">
            <Helmet>
                <title>G-Shop | {_id ? category : item || searchText}</title>
            </Helmet>
            <section className="max-w-screen-2xl mx-auto px-6 font-poppins">
                {/* Search Banner */}
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 font-poppins text-center">
                    <div className="search1 bg-cover bg-center p-16 rounded-lg">
                        <h3 className="text-lg font-semibold">Taste of</h3>
                        <h1 className="text-2xl font-bold leading-8">Fresh & Natural</h1>
                        <p className="text-xs font-medium">Weekend discount offer</p>
                        <button className="text-xs font-semibold bg-[#00a63e] px-4 py-1.5 my-1.5 rounded-full cursor-pointer">Shop Now</button>
                    </div>
                    <div className="search2 bg-cover bg-center p-16 rounded-lg">
                        <h3 className="text-lg font-semibold">Taste of</h3>
                        <h1 className="text-2xl font-bold leading-8">Fish & Meat</h1>
                        <p className="text-xs font-medium">Weekend discount offer</p>
                        <button className="text-xs font-semibold bg-[#00a63e] px-4 py-1.5 my-1.5 rounded-full cursor-pointer">Shop Now</button>
                    </div>
                    <div className="search3 bg-cover bg-center p-16 rounded-lg">
                        <h3 className="text-lg font-semibold">Taste of</h3>
                        <h1 className="text-2xl font-bold leading-8">Bread & Bakery</h1>
                        <p className="text-xs font-medium">Weekend discount offer</p>
                        <button className="text-xs font-semibold bg-[#00a63e] px-4 py-1.5 my-1.5 rounded-full cursor-pointer">Shop Now</button>
                    </div>
                </div>

                {/* Search Category Slider */}
                <div className="my-8">
                    {isPending || isError ?
                        <div>

                        </div>
                        :
                        <Swiper
                            slidesPerView={8}
                            spaceBetween={10}
                            autoplay={{
                                delay: 3000,
                            }}
                            loop={true}
                            navigation={true}
                            modules={[Autoplay, Navigation]}
                        >
                            {
                                categories.categories.map(category => <SwiperSlide
                                    key={category._id}
                                    className="cursor-pointer p-4 bg-white rounded-lg font-poppins text-[#151515]"
                                >
                                    <Link
                                        to={`/search?category=${encodeURIComponent(category.parent)}&_id=${category._id}`}
                                        className="text-center hover:underline hover:text-[#00a63e] duration-300"
                                    >
                                        <img className="mx-auto w-6 h-6" src={category.icon} alt="" />
                                        <p className="text-xs font-normal leading-8">{category.parent}</p>
                                    </Link>
                                </SwiperSlide>)
                            }
                        </Swiper>
                    }

                </div>

                {/* Search Products */}
                <div className="my-10">
                    <div className="bg-orange-100 py-3 px-5 rounded-md font-poppins flex justify-between items-center gap-2 text-[#151515] text-sm">
                        <h2>Total <span>{matchProduct?.length || 0}</span> Item Found</h2>
                        <select onChange={(e) => sortData(e.target.value)} className="outline-0">
                            <option value="" hidden>Sort By Price</option>
                            <option value="asc">Low to High</option>
                            <option value="desc">High to Low</option>
                        </select>
                    </div>
                    <div className="mt-4">
                        {pPending ?
                            <div className="flex justify-center items-center my-32">
                                <ScaleLoader
                                    color={"#63e075"}
                                    loading={true}
                                    size={500}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            </div>
                            :
                            <div>
                                {!matchProduct?.length ?
                                    <div className="text-center font-poppins my-14">
                                        <img src={noFound} alt="" className="w-80 h-80 mx-auto" />
                                        <h1 className="text-[#151515] text-xl font-medium">Sorry, we can not find any product 😞</h1>
                                    </div>
                                    :
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                                        {
                                            matchProduct?.slice(0, visibleCount).map(product => <div className="bg-white rounded-md relative" key={product._id}>
                                                <Link className="group" to={`/product/${product._id}`}>
                                                    <p className="absolute top-2 left-2 bg-gray-200 px-3 py-1 rounded-full text-[#63e075] text-xs z-10">
                                                        Stock: <span className="text-red-700">{product.quantity}</span>
                                                    </p>
                                                    {product.discount > 0 && <p className="absolute top-2 right-2 bg-orange-500 px-3 py-1 rounded-full text-white text-xs z-10">
                                                        {product.discount.toFixed(2)}% Off
                                                    </p>}
                                                    <div className="bg-white rounded-md p-2 flex">
                                                        <img className="w-40 h-44 mx-auto grow scale-90 group-hover:scale-100 duration-300" src={product.image} alt="" />
                                                    </div>
                                                    <div className="font-poppins text-[#151515] px-4 pb-4">
                                                        <h3 className="font-light text-sm group-hover:underline">{product.title}</h3>
                                                        <h1 className="font-semibold text-xl leading-10">
                                                            ${product.price.toFixed(2)} <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                                                        </h1>
                                                    </div>
                                                </Link>
                                            </div>)
                                        }
                                    </div>
                                }
                                {visibleCount < matchProduct?.length &&
                                    <div className="text-center font-poppins my-10">
                                        <button className="px-6 py-3 rounded-md bg-[#63e075] hover:bg-[#00a63e] duration-300 font-medium text-base cursor-pointer" onClick={loadMore}>Load More</button>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Search;