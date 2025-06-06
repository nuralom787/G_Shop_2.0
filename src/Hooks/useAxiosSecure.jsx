import axios from "axios";

const axiosSecure = axios.create({
    baseURL: "https://gshop-server-20.vercel.app"
});

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;