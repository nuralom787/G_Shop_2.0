import { Helmet } from "react-helmet-async";
import useMyAccount from "../../../../../Hooks/useMyAccount";
import { useForm } from "react-hook-form";
import { BsCloudArrowUp } from "react-icons/bs";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { useNavigate } from "react-router";


const UpdateProfile = () => {
    const [account] = useMyAccount();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        data.dob = new Date(data.dob).toISOString();
        // console.log(data);

        Swal.fire({
            title: "Are you sure?",
            text: "You want to update your profile information?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Update"
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                axiosSecure.put(`/customer/update/profile?email=${account.email}`, data)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Updated!",
                                text: "Your profile has been updated Successfully.",
                                icon: "success"
                            });
                            navigate("/user/profile")
                            setLoading(false);
                        }
                    })
                    .catch(err => {
                        setLoading(false);
                        // console.log(err);
                    })
            }
        });
    };


    return (
        <section className="bg-white p-4 rounded font-inter">
            <Helmet>
                <title>G-Shop | Update Profile</title>
            </Helmet>
            <h3 className="mb-2 font-semibold text-[#151515] text-lg">Edit Profile</h3>
            <div className='divider before:bg-black after:bg-black my-2'></div>
            {loading &&
                <div className="fixed inset-0 z-50 bg-black opacity-40 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                    <div className='m-3 space-y-1.5'>
                        <p className='text-xs'>Full Name</p>
                        <input
                            {...register("displayName", { required: true })}
                            className="w-full border border-gray-600 px-5 py-1 outline-0 font-semibold text-sm leading-7"
                            defaultValue={account?.displayName}
                            placeholder="Please Enter Your Full-Name"
                            type="text"
                        />
                    </div>
                    <div className='m-3 space-y-1.5'>
                        <p className='text-xs'>Email Address</p>
                        <input
                            {...register("email", { required: true })}
                            className="w-full border border-gray-600 px-5 py-1 outline-0 font-semibold text-sm leading-7 cursor-not-allowed text-gray-500"
                            defaultValue={account?.email?.split('@')[0].slice(0, 2) + '*'.repeat(account?.email?.split('@')[0].length - 2) + '@' + account?.email?.split('@')[1]}
                            disabled
                            type="text"
                        />
                    </div>
                    <div className='m-3 space-y-1.5'>
                        <p className='text-xs'>Mobile</p>
                        <input
                            {...register("phoneNumber", { required: true })}
                            className="w-full border border-gray-600 px-5 py-1 outline-0 font-semibold text-sm leading-7"
                            defaultValue={account?.phoneNumber}
                            placeholder="Please Enter Your Phone Number"
                            type="number"
                        />
                    </div>
                    <div className='m-3 space-y-1.5'>
                        <p className='text-xs'>Birthday</p>
                        <input
                            {...register("dob", { required: true })}
                            className="w-full border border-gray-600 px-5 py-1 outline-0 font-semibold text-sm leading-7 cursor-pointer"
                            defaultValue={account?.dob && new Date(account?.dob).toISOString().split("T")[0]}
                            placeholder="Please Enter Your Date-of-birth"
                            type="date"
                        />
                    </div>
                    <div className='m-3 space-y-1.5'>
                        <p className='text-xs'>Gender</p>
                        <select
                            {...register("gender", { required: true })}
                            className="w-full border border-gray-600 px-5 py-2 outline-0 font-semibold text-sm cursor-pointer"
                        >
                            {account?.gender && <option value={account?.gender}>{account?.gender}</option>}
                            {account?.gender !== "male" && <option value="male">Male</option>}
                            {account?.gender !== "female" && <option value="female">Female</option>}
                            {account?.gender !== "others" && <option value="others">Others</option>}
                        </select>
                    </div>
                </div>
                <div className='py-6 mx-3'>
                    <button type="submit" className='inline-flex items-center gap-3 duration-300 uppercase bg-orange-400 text-white px-6 py-2.5 rounded font-semibold text-sm cursor-pointer'>
                        Update Profile <BsCloudArrowUp className="font-extrabold text-lg" />
                    </button>
                </div>
            </form>
        </section>
    );
};

export default UpdateProfile;