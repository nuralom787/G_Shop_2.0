import { ScaleLoader } from "react-spinners";
import useProducts from "../../../../Hooks/useProducts";
import { NavLink } from "react-router";
import delivery from '../../../Images/delivery.svg';

const PopularProducts = () => {
    const [products, , isPending, isError] = useProducts();


    return (
        <section className="max-w-screen-2xl mx-auto px-6">
            <div className="font-poppins text-center">
                <h2 className="text-2xl text-[#151515] font-semibold leading-10">Popular Products for Daily Shopping</h2>
                <p className="text-base text-gray-500 font-medium">
                    See all our popular products in this week. You can choose your daily needs <br /> products from this list and get some special offer with free shipping
                </p>
            </div>
            <div className="py-14">
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
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                        {
                            products.products.slice(0, 18).map(product => <div className="bg-white rounded-md relative" key={product._id}>
                                <NavLink className="group" to={`/product/${product._id}`}>
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
                                            ${product.price.toFixed(2)} {product.discount > 0 && <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>}
                                        </h1>
                                    </div>
                                </NavLink>
                            </div>)
                        }
                    </div>
                }
            </div>
            <div className="bg-[#63e075] p-14 rounded-lg">
                <div className="bg-white p-14 rounded-lg flex justify-between items-center gap-14">
                    <div className="font-poppins text-[#151515] space-y-2">
                        <h3 className="text-lg">Organic Products and Food</h3>
                        <h1 className="text-2xl font-bold">Quick Delivery to Your Home</h1>
                        <p className="text-sm">
                            There are many products you will find in our shop, Choose your daily necessary product from our G-shop
                            and get some special offers. See Our latest discounted products from here and get a special discount.
                        </p>
                        <button className="bg-[#63e075] text-white font-semibold text-xs px-6 py-2 mt-6 rounded-full cursor-pointer">Download App</button>
                    </div>
                    <img className="w-lg" src={delivery} alt="" />
                </div>
            </div>
        </section>
    );
};

export default PopularProducts;