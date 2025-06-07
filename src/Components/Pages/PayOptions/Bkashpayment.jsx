import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useMyAccount from "../../../Hooks/useMyAccount";

const BkashPayment = () => {
    const axiosSecure = useAxiosSecure();
    const [account] = useMyAccount();

    const payWithBkash = () => {
        axiosSecure.get("/create_payment")
            .then(data => {
                // console.log(data.data);
                if (data.data.bkashURL) {
                    window.location.href = data.data.bkashURL;
                };
            })
            .catch(error => {
                console.error(error.message)
            })
    };


    return (
        <section className='bg-white py-5 px-10 font-inter text-sm'>
            <div className="p-4">
                <h4 className="pb-3.5 font-semibold">-- Please Note.</h4>
                <ol className="list-decimal space-y-3.5 font-bold text-red-600">
                    <li>You have an activated bKash account </li>
                    <li>Ensure you have sufficient balance in your bKash account to cover the total cost of the order</li>
                    <li>Ensure you are able to receive your OTP (one-time-password) on your mobile and have bKash PIN</li>
                </ol>
            </div>
            <button onClick={payWithBkash} className="my-4 w-full lg:w-fit bg-orange-400 hover:bg-orange-500 duration-500 text-white py-2.5 px-6 rounded cursor-pointer text-sm">
                Pay Now
            </button>
        </section>
    );
};

export default BkashPayment;