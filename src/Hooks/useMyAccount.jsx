import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useMyAccount = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: account, refetch, isPending, isError } = useQuery({
        queryKey: ["account", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/customer?email=${user.email}`);
            return res.data;
        }
    })
    return [account, refetch, isPending, isError];
};

export default useMyAccount;