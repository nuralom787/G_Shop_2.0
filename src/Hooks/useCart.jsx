import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

function useCart() {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: cart, refetch, isPending, isError } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user?.email}`);
            return res.data;
        }
    });

    return [cart, refetch, isPending, isError];
};

export default useCart;