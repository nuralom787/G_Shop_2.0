import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://gshop-server-20.vercel.app"
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;