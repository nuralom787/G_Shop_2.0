import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

const AddAddress = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <section className="bg-white p-4 rounded font-inter">
            <Helmet>
                <title>G-Shop | Add Address</title>
            </Helmet>
            <h3 className="font-semibold text-[#151515] text-lg">Add New Address</h3>
            <div className='divider before:bg-black after:bg-black my-1.5'></div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="px-12 pb-12 pt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <label>
                            <p className="text-xs font-medium text-gray-600 my-1.5">Full Name</p>
                            <input
                                {...register("fullName", { required: true })}
                                className={`px-6 py-2 outline-0 border border-gray-400 w-full text-sm ${errors.fullName && "border-red-500"}`}
                                placeholder="Enter your full name"
                                type="text"
                            />
                            {errors.fullName && <span className="text-red-500 text-xs font-medium px-2 py-1">You can't leave this empty.</span>}
                        </label>
                        <label>
                            <p className="text-xs font-medium text-gray-600 my-1.5">Phone Number</p>
                            <input
                                {...register("phoneNumber", { required: true })}
                                className={`px-6 py-2 outline-0 border border-gray-400 w-full text-sm ${errors.fullName && "border-red-500"}`}
                                placeholder="Enter your phone name"
                                type="number"
                            />
                            {errors.fullName && <span className="text-red-500 text-xs font-medium px-2 py-1">You can't leave this empty.</span>}
                        </label>
                        <label>
                            <p className="text-xs font-medium text-gray-600 my-1.5">Province / Region</p>
                            <input
                                {...register("region", { required: true })}
                                className={`px-6 py-2 outline-0 border border-gray-400 w-full text-sm ${errors.fullName && "border-red-500"}`}
                                placeholder="Enter your Province/Region"
                                type="text"
                            />
                            {errors.fullName && <span className="text-red-500 text-xs font-medium px-2 py-1">You can't leave this empty.</span>}
                        </label>
                        <label>
                            <p className="text-xs font-medium text-gray-600 my-1.5">City</p>
                            <input
                                {...register("city", { required: true })}
                                className={`px-6 py-2 outline-0 border border-gray-400 w-full text-sm ${errors.fullName && "border-red-500"}`}
                                placeholder="Enter your city"
                                type="text"
                            />
                            {errors.fullName && <span className="text-red-500 text-xs font-medium px-2 py-1">You can't leave this empty.</span>}
                        </label>
                        <label>
                            <p className="text-xs font-medium text-gray-600 my-1.5">Zone</p>
                            <input
                                {...register("zone", { required: true })}
                                className={`px-6 py-2 outline-0 border border-gray-400 w-full text-sm ${errors.fullName && "border-red-500"}`}
                                placeholder="Enter your zone"
                                type="text"
                            />
                            {errors.fullName && <span className="text-red-500 text-xs font-medium px-2 py-1">You can't leave this empty.</span>}
                        </label>
                    </div>
                    <div className="text-end px-12 py-8 space-x-4 font-inter">
                        <button className="px-8 py-3 bg-gray-300 rounded border border-gray-400 text-gray-600 cursor-pointer text-sm font-semibold">Cancel</button>
                        <button className="px-8 py-3 bg-orange-400 rounded border border-orange-400 text-white cursor-pointer text-sm font-semibold" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddAddress;