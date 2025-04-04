import { useParams } from "react-router";
import useProduct from "../../../../Hooks/useProduct";
import { ScaleLoader } from "react-spinners";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, , isPending, isError] = useProduct(id);



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
                    <div className="bg-white rounded-xl p-10">
                        <div className="flex justify-between items-center gap-6 font-poppins text-[#151515]">
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
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                }
            </section>
        </section>
    );
};

export default ProductDetails;