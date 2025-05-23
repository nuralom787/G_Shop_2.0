import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useCart from "./useCart";

const useAddToCart = (product, quantity) => {
    const [, refetch] = useCart();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const addToCart = () => {
        // console.log(product, quantity)
        if (!user) {
            navigate('/user/login');
        }
        else {
            const email = user.email;
            const item = {
                _id: product._id,
                image: product.image,
                title: product.title,
                price: product.price,
                originalPrice: product.originalPrice,
                discount: product.discount,
                quantity: quantity
            };
            const data = { email, item };
            axiosSecure.patch("/carts", data)
                .then(res => {
                    // console.log(res.data);
                    toast.success("Item Added Successfully!", { position: "top-center" });
                    refetch();
                })
                .catch(err => {
                    // console.log(err.message);
                })
        }
    };

    return {
        addToCart
    }
};

export default useAddToCart;