import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCoupons = () => {
    const axiosPublic = useAxiosPublic();

    const { data: coupons, refetch, isPending, isError } = useQuery({
        queryKey: ["coupons"],
        queryFn: async () => {
            const res = await axiosPublic.get("/coupons")
            return res.data;
        }
    });


    return [coupons, refetch, isPending, isError];
};

export default useCoupons;