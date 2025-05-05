import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useOrders = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: orders, refetch, isPending, isError } = useQuery({
        queryKey: ["orders", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/order/user?email=${user.email}`);
            return res.data;
        }
    });

    return [orders, refetch, isPending, isError];
};

export default useOrders;