import { MdOutlineMail } from "react-icons/md";
import { LuLock } from "react-icons/lu";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { toast } from "react-toastify";


const Login = () => {
    const [loading, setLoading] = useState(false);
    const { LoginUser, GoogleLogin } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    // Login User With Email/Pass.
    const onSubmit = (data) => {
        setLoading(true)
        const { email, password } = data;
        LoginUser(email, password)
            .then(result => {
                navigate(from, { replace: true });
                toast.success('User Login Successfully', {
                    position: 'top-center',
                    autoClose: 2500
                });
                setLoading(false);
            })
            .catch(err => {
                toast.error(err.message, {
                    position: 'top-center',
                    autoClose: 5000
                });
                setLoading(false);
            })
    };

    // Handle Login With Google Function.
    const handleGoogleLogin = () => {
        setLoading(true);
        GoogleLogin()
            .then(result => {
                navigate(from, { replace: true });
                toast.success(`user Login Successfully`, {
                    position: "top-center",
                    autoClose: 2500
                });
                setLoading(false);
            })
            .catch(err => {
                toast.error(err.message, {
                    position: "top-center",
                    autoClose: 2500
                });
                setLoading(false);
            })
    };

    return (
        <section className="bg-gray-300 py-10">
            <section className="max-w-screen-2xl mx-auto px-6 font-poppins">
                <div className='bg-white p-10 rounded-lg w-full max-w-lg mx-auto text-center'>
                    <div>
                        <h1 className='text-[#151515] text-3xl font-bold'>Login</h1>
                        <p className='text-gray-500 text-base font-light leading-10'>Login with your email and password</p>
                    </div>
                    <div className="card-body p-0 text-[#151515]">
                        <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                            <label className="label text-base font-normal mt-2.5">Email</label>
                            <input
                                {...register("email", { required: true })}
                                type="email"
                                className="px-5 py-3 rounded outline-0 focus:outline-1 outline-[#63e075] duration-150 bg-white border border-gray-300 text-base"
                                placeholder="Email" />
                            {errors.email && <span className="text-red-600 text-start text-sm">Email is required *</span>}
                            <label className="label text-base font-normal mt-2.5">Password</label>
                            <input
                                {...register("password", { required: true })}
                                type="password"
                                className="px-5 py-3 rounded outline-0 focus:outline-1 outline-[#63e075] duration-150 bg-white border border-gray-300 text-base"
                                placeholder="Password" />
                            {errors.password && <span className="text-red-600 text-start text-sm">Password is required *</span>}
                            <div className='text-end'>
                                <Link to={"/"} className="hover:underline text-sm">Forgot password?</Link>
                            </div>
                            {loading ?
                                <button
                                    disabled
                                    className="mt-4 bg-[#63e075] px-6 py-3 rounded outline-0 text-white text-base font-semibold inline-flex items-center gap-2 justify-center">
                                    <span className="loading loading-spinner loading-md"></span> Processing...
                                </button>
                                :
                                <button
                                    type="submit"
                                    className="mt-4 bg-[#63e075] hover:bg-[#00a63e] duration-300 px-6 py-3 rounded outline-0 text-white text-base font-semibold cursor-pointer">
                                    Login
                                </button>
                            }
                        </form>
                    </div>
                    <div className="divider my-5 text-black before:bg-black after:bg-black">OR</div>
                    {loading ?
                        <button disabled className="bg-blue-500 px-6 py-3 rounded inline-flex justify-center items-center gap-3 w-full">
                            <span className="loading loading-spinner loading-md"></span> Processing...
                        </button>
                        :
                        <button onClick={handleGoogleLogin} className="bg-blue-500 hover:bg-blue-700 duration-300 px-6 py-3 rounded inline-flex justify-center items-center gap-3 w-full cursor-pointer">
                            <FaGoogle /> Login With Google
                        </button>
                    }
                </div>
            </section>
        </section>
    );
};

export default Login;