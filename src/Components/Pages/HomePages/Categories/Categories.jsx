import { ScaleLoader } from "react-spinners";
import useCategories from "../../../../Hooks/useCategories";
import { NavLink } from "react-router";
import { IoIosArrowForward } from "react-icons/io";

const Categories = () => {
    const [categories, , isPending, isError] = useCategories();


    return (
        <section className="max-w-screen-2xl mx-auto px-4 lg:px-6">
            <div className="text-center font-poppins">
                <h1 className="text-xl text-[#151515] font-semibold">Featured Categories</h1>
                <p className="text-sm text-gray-500 font-medium leading-6 lg:leading-10">Choose your necessary products from this feature categories.</p>
            </div>
            <div className="py-8 lg:py-14">
                {isPending || isError ?
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
                    <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0.5">
                        {
                            categories?.categories?.map(category => <NavLink
                                key={category._id}
                                to={`/search?category=${encodeURIComponent(category.parent)}&_id=${category._id}`}
                                className="bg-white p-4 group"
                            >
                                <li className="flex items-center gap-3">
                                    <img className="w-9" src={category.icon} alt="" />
                                    <div className="font-poppins">
                                        <h3 className="text-sm text-[#151515] group-hover:text-[#8B4513]">{category.parent}</h3>
                                        <ul className="">
                                            {
                                                category.children.slice(0, 3).map(item => <li key={item} className="text-gray-500 text-xs hover:text-[#8B4513] hover:ms-2 duration-300">
                                                    <NavLink to={`/search?category=${encodeURIComponent(category.parent)}&item=${encodeURIComponent(item)}`} className="flex items-center gap-0.5 py-0.5">
                                                        <IoIosArrowForward /> {item}
                                                    </NavLink>
                                                </li>)
                                            }
                                        </ul>
                                    </div>
                                </li>
                            </NavLink>)
                        }
                    </ul>
                }
            </div>
        </section>
    );
};

export default Categories;