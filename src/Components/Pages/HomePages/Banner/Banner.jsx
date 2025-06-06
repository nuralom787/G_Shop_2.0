import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slider1 from '../../../Images/Slider/slider-1.png';
import slider2 from '../../../Images/Slider/slider-2.png';
import slider3 from '../../../Images/Slider/slider-3.png';
import useCoupons from '../../../../Hooks/useCoupons';
import { ScaleLoader } from 'react-spinners';
import Countdown from 'react-countdown';
// import copy from 'copy-to-clipboard';
import './Banner.css';

const Banner = () => {
    const [coupons, , isPending, isError] = useCoupons();

    // Renderer callback with condition
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return (
                <p className='space-x-1.5'>
                    <span className='text-red-600 text-xs xl:text-sm font-semibold font-poppins bg-[#ffc7c7] py-0.5 xl:py-1 px-2 xl:px-3.5 rounded-sm'>0{days}</span>
                    <span>:</span>
                    <span className='text-red-600 text-xs xl:text-sm font-semibold font-poppins bg-[#ffc7c7] py-0.5 xl:py-1 px-2 xl:px-3.5 rounded-sm'>0{hours}</span>
                    <span>:</span>
                    <span className='text-red-600 text-xs xl:text-sm font-semibold font-poppins bg-[#ffc7c7] py-0.5 xl:py-1 px-2 xl:px-3.5 rounded-sm'>0{minutes}</span>
                    <span>:</span>
                    <span className='text-red-600 text-xs xl:text-sm font-semibold font-poppins bg-[#ffc7c7] py-0.5 xl:py-1 px-2 xl:px-3.5 rounded-sm'>0{seconds}</span>
                </p>
            );
        }
        else {
            return (
                <p className='space-x-1.5'>
                    <span className='text-green-600 text-xs xl:text-sm font-semibold font-poppins bg-[#c7f3c7] py-0.5 xl:py-1 px-2 xl:px-3.5 rounded-sm'>{days}</span>
                    <span>:</span>
                    <span className='text-green-600 text-xs xl:text-sm font-semibold font-poppins bg-[#c7f3c7] py-0.5 xl:py-1 px-2 xl:px-3.5 rounded-sm'>{hours}</span>
                    <span>:</span>
                    <span className='text-green-600 text-xs xl:text-sm font-semibold font-poppins bg-[#c7f3c7] py-0.5 xl:py-1 px-2 xl:px-3.5 rounded-sm'>{minutes}</span>
                    <span>:</span>
                    <span className='text-green-600 text-xs xl:text-sm font-semibold font-poppins bg-[#c7f3c7] py-0.5 xl:py-1 px-2 xl:px-3.5 rounded-sm'>{seconds}</span>
                </p>
            );
        }
    };

    const handleCopy = () => {
        // console.log(e.target.text);
        // const isCopied = copy(text);
        // if (isCopied) {
        //     alert('Text copied to clipboard!');
        // } else {
        //     console.error('Failed to copy text.');
        // }
    }

    return (
        <section className="max-w-screen-2xl mx-auto px-2 lg:px-6">
            <div className="flex flex-col xl:flex-row justify-between items-start gap-6 text-[#151515] py-2">
                <div className='w-full xl:w-3/5'>
                    <Carousel
                        autoPlay={true}
                        showArrows={false}
                        transitionTime={1000}
                        interval={2500}
                        infiniteLoop={true}
                        showStatus={false}
                        emulateTouch={true}
                        showThumbs={false}
                    >
                        <div className='relative'>
                            <div className='font-poppins w-3/6 absolute top-1/4 left-5 lg:left-14 text-start space-y-0.5 md:space-y-2 lg:space-y-4'>
                                <h1 className='font-extrabold text-base lg:text-3xl text-[#151515] line-clamp-1 lg:line-clamp-none'>The Best Quality Products Guaranteed!</h1>
                                <p className='text-gray-700 text-xs md:text-sm line-clamp-1 md:line-clamp-2 lg:line-clamp-3'>Intrinsicly fashion performance based products rather than accurate benefits...</p>
                                <button className='font-semibold text-sm text-white px-3.5 lg:px-6 py-1.5 lg:py-3 rounded-full lg:rounded-md bg-[#63e075] cursor-pointer mt-3 lg:mt-0'>Shop Now</button>
                            </div>
                            <img src={slider1} alt="" />
                        </div>
                        <div className='relative'>
                            <div className='font-poppins w-3/6 absolute top-1/4 left-5 lg:left-14 text-start space-y-0.5 md:space-y-2 lg:space-y-4'>
                                <h1 className='font-extrabold text-base lg:text-3xl text-[#151515] line-clamp-1 lg:line-clamp-none'>Best Different Type of Grocery Store</h1>
                                <p className='text-gray-700 text-xs md:text-sm line-clamp-1 md:line-clamp-2 lg:line-clamp-3'>Intrinsicly fashion performance based products rather than accurate benefits...</p>
                                <button className='font-semibold text-sm text-white px-3.5 lg:px-6 py-1.5 lg:py-3 rounded-full lg:rounded-md bg-[#63e075] cursor-pointer mt-3 lg:mt-0'>Shop Now</button>
                            </div>
                            <img src={slider2} alt="" />
                        </div>
                        <div className='relative'>
                            <div className='font-poppins w-3/6 absolute top-1/4 left-5 lg:left-14 text-start space-y-0.5 md:space-y-2 lg:space-y-4'>
                                <h1 className='font-extrabold text-base lg:text-3xl text-[#151515] line-clamp-1 lg:line-clamp-none'>Best Different Type of Grocery Store</h1>
                                <p className='text-gray-700 text-xs md:text-sm line-clamp-1 md:line-clamp-2 lg:line-clamp-3'>Intrinsicly fashion performance based products rather than accurate benefits...</p>
                                <button className='font-semibold text-sm text-white px-3.5 lg:px-6 py-1.5 lg:py-3 rounded-full lg:rounded-md bg-[#63e075] cursor-pointer mt-3 lg:mt-0'>Shop Now</button>
                            </div>
                            <img src={slider3} alt="" />
                        </div>
                    </Carousel>
                </div>
                <div className='hidden lg:block w-full xl:w-2/5 border-2 border-[#8B4513] hover:border-green-700 rounded-lg'>
                    <h1 className='font-poppins font-semibold text-xl bg-orange-200 p-4 text-center rounded-ss-lg rounded-se-lg'>
                        Latest Offer Discount Codes.
                    </h1>
                    <div>
                        {isPending || isError ?
                            <div className="flex justify-center items-center my-32">
                                <ScaleLoader
                                    color={"#63e075"}
                                    loading={true}
                                    size={500}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            </div>
                            :
                            <div className='grid grid-cols-2 xl:grid-cols-1'>
                                {coupons?.coupons?.slice(0, 2).map(coupon => <div
                                    key={coupon._id}
                                    className='flex justify-between items-center my-4 mx-2 bg-white rounded-lg'
                                >
                                    <div className='relative border-r-2 border-dashed border-gray-600 w-full flex items-center gap-4 p-4 font-poppins'>
                                        <img className='w-16 xl:w-24' src={coupon.logo} alt="" />
                                        <div className='space-y-2'>
                                            <div className='inline-flex items-center'>
                                                <p><span className='text-red-700 text-xl font-bold'>{coupon.discountPercentage}%</span> Off</p>
                                                {Date.now() >= new Date(coupon.endTime) ?
                                                    <p className='text-red-600 text-xs bg-[#fee2e2] py-1.5 px-3.5 ml-3.5 rounded-full'> Inactive</p>
                                                    :
                                                    <p className='text-green-600 text-xs bg-[#d1fae5] py-1.5 px-3.5 ml-3.5 rounded-full'> Active</p>
                                                }
                                            </div>
                                            <p className='text-base xl:text-xl font-semibold'>{coupon.title}</p>
                                            <div className=''>
                                                {Date.now() >= new Date(coupon.endTime) ?
                                                    <Countdown renderer={renderer} date={Date.now() + (new Date(coupon.endTime) - Date.now())} />
                                                    :
                                                    <Countdown renderer={renderer} date={Date.now() + (new Date(coupon.endTime) - Date.now())} />
                                                }
                                            </div>
                                        </div>
                                        <div className='bg-gray-100 w-7 h-7 rounded-full absolute -top-3.5 -right-3.5 z-10'></div>
                                        <div className='bg-gray-100 w-7 h-7 rounded-full absolute -bottom-3.5 -right-3.5 z-10'></div>
                                    </div>
                                    <div className='text-center space-y-2'>
                                        <button
                                            className='bg-[#d1fae5] text-[#059669] font-poppins font-medium text-xs xl:text-sm border border-dashed border-green-700 py-1.5 px-4 rounded-lg'
                                            onClick={handleCopy}>
                                            {coupon.couponCode}
                                        </button>
                                        <p className='text-xs'>* This coupon apply when shopping more then ${coupon.minimumAmount}</p>
                                    </div>
                                </div>)
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className='bg-[#ffedd5] my-6 p-8 rounded-lg font-poppins flex flex-col md:flex-row justify-between items-start lg:items-center gap-4'>
                <div className='w-4/6'>
                    <h1 className='text-xl font-bold text-green-600'>100% Natural Quality Organic Product</h1>
                    <p className='font-medium text-sm text-gray-500'>See Our latest discounted products from here and get a special discount product</p>
                </div>
                <button className='font-semibold text-sm text-white bg-[#63e075] px-5 py-2 rounded-full cursor-pointer'>
                    Shop Now
                </button>
            </div>
        </section>
    );
};

export default Banner;