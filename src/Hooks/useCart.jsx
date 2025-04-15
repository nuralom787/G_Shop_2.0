import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

function useCart() {
    const axiosSecure = useAxiosSecure();

    const { data: carts, refetch, isPending, isError } = useQuery({
        queryKey: ['carts'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=alamn7150@gmail.com`);
            return res.data;
        }
    });

    return [carts, refetch, isPending, isError];
};

export default useCart;