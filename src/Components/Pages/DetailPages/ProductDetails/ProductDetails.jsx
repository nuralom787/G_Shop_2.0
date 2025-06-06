import { Link, useParams } from "react-router";
import useProduct from "../../../../Hooks/useProduct";
import { ScaleLoader } from "react-spinners";
import { useEffect, useState } from "react";
import useProducts from "../../../../Hooks/useProducts";
import { FiTruck } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { PiCurrencyDollarDuotone } from "react-icons/pi";
import { IoRepeat } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { Helmet } from "react-helmet-async";
import useAddToCart from "../../../../Hooks/useAddToCart";


const ProductDetails = () => {
    const { id } = useParams();
    const [product, , isPending, isError] = useProduct(id);
    const [products] = useProducts();
    const relatedProduct = products?.products?.filter(pt => pt?.parent === product?.parent);
    const [newQuantity, setNewQuantity] = useState(1);
    const { addToCart } = useAddToCart(product, newQuantity);

    useEffect(() => {
        window.scrollTo(0, 0);
        setNewQuantity(1);
    }, [id]);


    // Handle Cart Quantity Plus.
    const handleMinusQuantity = () => {
        if (newQuantity !== 1) {
            const updateQuantity = newQuantity - 1;
            setNewQuantity(updateQuantity);
        };
    };


    // Handle Cart Quantity Minus.
    const handlePlusQuantity = () => {
        const updateQuantity = newQuantity + 1;
        setNewQuantity(updateQuantity);
    };


    return (
        <section className="bg-gray-300 py-10">
            <Helmet>
                <title>G-Shop | {isPending || isError ? " " : product?.title}</title>
            </Helmet>
            <section className="max-w-screen-2xl mx-auto px-2 lg:px-6">
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
                    <div>
                        <div className="bg-white rounded-xl p-4 lg:p-10">
                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 font-poppins text-[#151515]">
                                <div>
                                    <img className="mx-auto" src={product.image} alt="" />
                                </div>
                                <div className="space-y-6">
                                    <h1 className="font-bold text-3xl">{product.title}</h1>
                                    <p className="text-base text-gray-500 font-medium">SKU : {product.sku}</p>
                                    {product.quantity > 0 ?
                                        <p className="font-semibold text-sm bg-green-100 text-green-600 px-4 py-1 rounded-full w-fit">
                                            Stock : <span className="text-red-600">{product.quantity}</span>
                                        </p>
                                        :
                                        <p className="font-semibold text-sm bg-red-100 text-red-600 px-4 py-1 rounded-full w-fit">Stock Out</p>
                                    }
                                    <h1 className="font-bold text-3xl">${product.price.toFixed(2)}</h1>
                                    <p className="font-normal text-base text-gray-500">{product.description}</p>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div className='border-2 border-gray-300 rounded-md flex justify-between items-center'>
                                            <button className="px-4 py-4 border-r-2 border-gray-300 cursor-pointer" onClick={handleMinusQuantity}>
                                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                            </button>
                                            <p className="text-base font-semibold">{newQuantity}</p>
                                            <button className="px-4 py-4 border-l-2 border-gray-300 cursor-pointer" onClick={handlePlusQuantity}>
                                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                            </button>
                                        </div>
                                        <button
                                            className='px-4 py-4 bg-gray-800 hover:bg-gray-900 duration-500 cursor-pointer rounded-md text-sm font-extrabold text-white'
                                            onClick={addToCart}
                                        >
                                            Add To Cart
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        <p className="font-medium text-sm">
                                            Category: <Link to={`/search?category=${encodeURIComponent(product.parent)}&_id=${product._id}`} className="text-[#151515] hover:text-[#63e075] underline cursor-pointer"> {product.parent}</Link>
                                        </p>
                                        <ul className="flex items-center gap-3">
                                            {
                                                product.tag.map(tg => <li key={tg}>
                                                    <p className="bg-green-200 text-green-600 px-3 py-1 rounded-full text-xs">{tg}</p>
                                                </li>)
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="bg-gray-300 rounded-lg px-6 py-10">
                                    <ul>
                                        <li className="flex items-center gap-4 font-poppins py-4">
                                            <FiTruck className="text-gray-400 text-2xl" />
                                            <p className="text-sm font-light text-gray-600 text-start">Free shipping applies to all orders over shipping €100</p>
                                        </li>
                                        <li className="flex items-center gap-4 font-poppins py-4">
                                            <IoHomeOutline className="text-gray-400 text-2xl" />
                                            <p className="text-sm font-light text-gray-600 text-start">Home Delivery within 1 Hour</p>
                                        </li>
                                        <li className="flex items-center gap-4 font-poppins py-4">
                                            <PiCurrencyDollarDuotone className="text-gray-400 text-2xl" />
                                            <p className="text-sm font-light text-gray-600 text-start">Cash on Delivery Available</p>
                                        </li>
                                        <li className="flex items-center gap-4 font-poppins py-4">
                                            <IoRepeat className="text-gray-400 text-2xl" />
                                            <p className="text-sm font-light text-gray-600 text-start">7 Days returns money back guarantee</p>
                                        </li>
                                        <li className="flex items-center gap-4 font-poppins py-4">
                                            <MdOutlineWbSunny className="text-gray-400 text-2xl" />
                                            <p className="text-sm font-light text-gray-600 text-start">Guaranteed 100% organic from natural products.</p>
                                        </li>
                                        <li className="flex items-center gap-4 font-poppins py-4">
                                            <CiLocationOn className="text-gray-400 text-2xl" />
                                            <p className="text-sm font-light text-gray-600 text-start">Delivery from our pick point.</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="mt-14">
                            <h1 className="text-lg font-poppins text-[#151515] my-4 font-semibold">Related Products</h1>
                            {!relatedProduct?.length ?
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
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                                    {
                                        relatedProduct.slice(0, 18).map(product => <div className="bg-white rounded-md relative" key={product._id}>
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
                                                        ${product.price.toFixed(2)} {product.discount > 0 && <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>}
                                                    </h1>
                                                </div>
                                            </Link>
                                        </div>)
                                    }
                                </div>
                            }
                        </div>
                    </div>
                }
            </section>
        </section>
    );
};

export default ProductDetails;