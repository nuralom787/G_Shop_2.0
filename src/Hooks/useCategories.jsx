import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCategories = () => {
    const axiosPublic = useAxiosPublic();

    const { data: categories, refetch, isPending, isError } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axiosPublic.get("/categories");
            return res.data;
        },
        placeholderData: keepPreviousData
    })
    return [categories, refetch, isPending, isError];
};

export default useCategories;