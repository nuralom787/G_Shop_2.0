import { useEffect } from "react";
import './Search.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from "react-router";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useCategories from "../../../Hooks/useCategories";
// import { useLocation } from "react-router";

const Search = () => {
    const [categories, , isPending, isError] = useCategories();
    // const { search } = useLocation();
    // const queryParams = new URLSearchParams(search);

    // const category = decodeURIComponent(queryParams.get('category'));
    // const _id = decodeURIComponent(queryParams.get('_id'));
    // const item = decodeURIComponent(queryParams.get('item'));


    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);


    return (
        <section className="bg-gray-300 py-10">
            <section className="max-w-screen-2xl mx-auto px-6 font-poppins">
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 font-poppins text-center">
                    <div className="search1 bg-cover bg-center p-16 rounded-lg">
                        <h3 className="text-lg font-semibold">Taste of</h3>
                        <h1 className="text-2xl font-bold leading-8">Fresh & Natural</h1>
                        <p className="text-xs font-medium">Weekend discount offer</p>
                        <button className="text-xs font-semibold bg-[#00a63e] px-4 py-1.5 my-1.5 rounded-full">Shop Now</button>
                    </div>
                    <div className="search2 bg-cover bg-center p-16 rounded-lg">
                        <h3 className="text-lg font-semibold">Taste of</h3>
                        <h1 className="text-2xl font-bold leading-8">Fish & Meat</h1>
                        <p className="text-xs font-medium">Weekend discount offer</p>
                        <button className="text-xs font-semibold bg-[#00a63e] px-4 py-1.5 my-1.5 rounded-full">Shop Now</button>
                    </div>
                    <div className="search3 bg-cover bg-center p-16 rounded-lg">
                        <h3 className="text-lg font-semibold">Taste of</h3>
                        <h1 className="text-2xl font-bold leading-8">Bread & Bakery</h1>
                        <p className="text-xs font-medium">Weekend discount offer</p>
                        <button className="text-xs font-semibold bg-[#00a63e] px-4 py-1.5 my-1.5 rounded-full">Shop Now</button>
                    </div>
                </div>
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
                                    <Link to={"/"} className="text-center hover:underline hover:text-[#00a63e] duration-300">
                                        <img className="mx-auto w-6 h-6" src={category.icon} alt="" />
                                        <p className="text-xs font-normal leading-8">{category.parent}</p>
                                    </Link>
                                </SwiperSlide>)
                            }
                        </Swiper>
                    }
                </div>
            </section>
        </section>
    );
};

export default Search;