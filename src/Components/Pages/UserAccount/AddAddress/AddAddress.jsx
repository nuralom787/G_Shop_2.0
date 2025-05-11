import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";

const AddAddress = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(false);
    const [regions, setRegions] = useState([]);
    const [region, setRegion] = useState("");
    const [cites, setCites] = useState([]);
    const [city, setCity] = useState("");
    const [zones, setZones] = useState([]);
    const [zone, setZone] = useState("");



    useEffect(() => {
        axiosPublic.get("/api/v1/region")
            .then(res => {
                console.log(res.data);
                setRegions(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const handleCityAddress = (e) => {
        setLoading(true);
        setCites([]);
        setZones([]);
        setRegion(e.target.options[e.target.selectedIndex].text);
        axiosPublic.get(`/api/v1/city?addressId=${e.target.value}`)
            .then(res => {
                console.log(res.data);
                setCites(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })
    };

    const handleZoneAddress = (e) => {
        setLoading(true);
        setZones([]);
        setCity(e.target.options[e.target.selectedIndex].text);
        axiosPublic.get(`/api/v1/zone?addressId=${e.target.value}`)
            .then(res => {
                console.log(res.data);
                setZones(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })
    };


    const onSubmit = (data) => {
        data.region = region
        data.city = city
        console.log(data)
    };



    return (
        <section className="bg-white p-4 rounded font-inter">
            <Helmet>
                <title>G-Shop | Add Address</title>
            </Helmet>
            <h3 className="font-semibold text-[#151515] text-lg">Add New Address</h3>
            <div className='divider before:bg-black after:bg-black my-1.5'></div>
            <div>
                {loading &&
                    <div className="fixed inset-0 z-50 bg-black opacity-40 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                }
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="px-12 pb-12 pt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <label>
                            <p className="text-xs font-medium text-gray-600 my-1.5">Full Name</p>
                            <input
                                {...register("fullName", { required: true })}
                                className={`px-6 py-2 outline-0 border border-gray-400 w-full text-sm ${errors.fullName && "border-red-500"}`}
                                placeholder="Enter your Full-name"
                                type="text"
                            />
                            {errors.fullName && <span className="text-red-500 text-xs font-medium px-2 py-1">You can't leave this empty.</span>}
                        </label>
                        <label>
                            <p className="text-xs font-medium text-gray-600 my-1.5">Phone Number</p>
                            <input
                                {...register("phoneNumber", { required: true })}
                                className={`px-6 py-2 outline-0 border border-gray-400 w-full text-sm ${errors.fullName && "border-red-500"}`}
                                placeholder="Please enter your phone number"
                                type="number"
                            />
                            {errors.phoneNumber && <span className="text-red-500 text-xs font-medium px-2 py-1">You can't leave this empty.</span>}
                        </label>
                        <label>
                            <p className="text-xs font-medium text-gray-600 my-1.5">Province / Region</p>
                            <select
                                {...register("region", { required: true })}
                                onChange={(e) => handleCityAddress(e)}
                                className={`px-6 py-2 outline-0 border border-gray-400 w-full text-sm ${errors.fullName && "border-red-500"}`}
                            >
                                <option hidden>Please Choose your Province/Region</option>
                                {
                                    regions.map(region => <option
                                        key={region.id}
                                        value={region.id}
                                    >
                                        {region.name}
                                    </option>)
                                }
                            </select>
                            {errors.region && <span className="text-red-500 text-xs font-medium px-2 py-1">You can't leave this empty.</span>}
                        </label>
                        <label>
                            <p className="text-xs font-medium text-gray-600 my-1.5">City</p>
                            <select
                                {...register("city", { required: true })}
                                onChange={(e) => handleZoneAddress(e)}
                                className={`px-6 py-2 outline-0 border border-gray-400 w-full text-sm ${errors.fullName && "border-red-500"}`}
                            >
                                <option hidden>Please Choose your city</option>
                                {
                                    cites.map(city => <option
                                        key={city.id}
                                        value={city.id}
                                    >
                                        {city.name}
                                    </option>)
                                }
                            </select>
                            {errors.city && <span className="text-red-500 text-xs font-medium px-2 py-1">You can't leave this empty.</span>}
                        </label>
                        <label>
                            <p className="text-xs font-medium text-gray-600 my-1.5">Zone</p>
                            <select
                                {...register("zone", { required: true })}
                                onChange={(e) => setZone(e.target.value)}
                                className={`px-6 py-2 outline-0 border border-gray-400 w-full text-sm ${errors.fullName && "border-red-500"}`}
                            >
                                <option hidden>Please Choose your zone</option>
                                {
                                    zones.map(zone => <option
                                        key={zone.id}
                                        value={zone.name}
                                    >
                                        {zone.name}
                                    </option>)
                                }
                            </select>
                            {errors.zone && <span className="text-red-500 text-xs font-medium px-2 py-1">You can't leave this empty.</span>}
                        </label>
                    </div>
                    <div className="text-end px-12 py-8 space-x-4 font-inter">
                        <button className="px-8 py-3 bg-gray-300 rounded border border-gray-400 text-gray-600 cursor-pointer text-sm font-semibold">Cancel</button>
                        <button className="px-8 py-3 bg-orange-400 rounded border border-orange-400 text-white cursor-pointer text-sm font-semibold" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddAddress;