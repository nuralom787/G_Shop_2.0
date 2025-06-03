import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProducts = () => {
    const axiosPublic = useAxiosPublic();

    const { data: products, refetch, isPending, isError } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axiosPublic.get("/products");
            return res.data;
        },
        placeholderData: keepPreviousData
    });

    return [products, refetch, isPending, isError];
};

export default useProducts;