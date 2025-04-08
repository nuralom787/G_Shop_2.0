import { NavLink, useParams } from "react-router";
import useProduct from "../../../../Hooks/useProduct";
import { ScaleLoader } from "react-spinners";
import { useEffect, useState } from "react";
import useCart from "../../../../Hooks/useCart";
import useProducts from "../../../../Hooks/useProducts";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, , isPending, isError] = useProduct(id);
    const [products] = useProducts();
    const relatedProduct = products?.products?.filter(pt => pt.parent === product.parent);
    console.log(relatedProduct)
    const { addToCart } = useCart();
    const [newQuantity, setNewQuantity] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);


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
            <section className="max-w-screen-2xl mx-auto px-6">
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
                        <div className="bg-white rounded-xl p-10">
                            <div className="grid grid-cols-3 gap-6 font-poppins text-[#151515]">
                                <div>
                                    <img src={product.image} alt="" />
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
                                            onClick={() => addToCart(product._id, newQuantity)}>
                                            Add To Cart
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        <p className="font-medium text-sm">
                                            Category: <NavLink to={"/"} className="text-[#151515] hover:text-[#63e075] underline cursor-pointer"> {product.parent}</NavLink>
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
                                <div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, quam ab? Sed dolore a ducimus iste ipsum. Modi possimus veniam voluptas, nobis ab consequatur unde exercitationem quae itaque, quos, temporibus fugit voluptatem quo velit impedit ipsa ullam praesentium quam earum rem distinctio illo. Accusamus natus illum, impedit atque commodi fugiat.</p>
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
                                <div>

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